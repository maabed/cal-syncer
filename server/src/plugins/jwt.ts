import {FastifyPluginCallback, FastifyRequest, FastifyReply} from 'fastify'
import fp from 'fastify-plugin'
import {createVerifier, createDecoder, VerifierOptions} from 'fast-jwt'

const jwtPlugin: FastifyPluginCallback = function (app, _, done) {
  const {
    config: {
      auth: {
        verifierOpts,
        cookies: {tokenName}
      }
    }
  } = app

  const verifier = createVerifier({...verifierOpts} as Partial<VerifierOptions>)
  const decode = createDecoder()

  const jwt: FastifyJWT = Object.freeze({
    verify(token: string) {
      const decoded = verifier(token)
      if (!decoded || ['id'].some(key => !(key in decoded))) {
        throw app.errors.unauthorized('invalid token payload')
      }
      return decoded as unknown as DecodedJwt
    },
    decode: (token: string) => decode(token),
    extractToken: req => {
      let token = req.headers['authorization']
      if (token && typeof token === 'string') {
        const parts = req.headers['authorization']?.split(' ')
        if (parts.length === 2) {
          token = parts[1]
          if (!/^Bearer$/i.test(parts[0])) {
            return done(new Error('Invalid authorization header'))
          }
        } else {
          return done(new Error('Invalid authorization header'))
        }
      } else {
        token = req.cookies[`${tokenName}`]
        if (token && typeof token === 'string') {
          const unsign = req.unsignCookie(token)
          token = unsign?.valid === true ? unsign.value : undefined
        }
      }

      if (!token || typeof token !== 'string') {
        return done(new Error('No Authorization was found'))
      }
      return token
    }
  })

  const authorize = async (request: FastifyRequest, reply: FastifyReply) => {
    let sess, payload
    const token = jwt.extractToken(request) as string
    if (!token || typeof token !== 'string' || typeof token === 'undefined') {
      // because /me is annoying
      // if (req.raw.url.startsWith('/api/v3/user/me') && req.raw.method.toUpperCase() === 'GET') {
      //   throw app.errors.unauthorized('No Authorization was found')
      // }
      return reply.code(401).send('No token was found')
    }
    try {
      payload = (await jwt.verify(token)) as UserPayload
      if (!payload) return reply.code(401).send('Invalid session')
      const {id} = payload // as UserPayload
      sess = await app.models.User.findById(id)
      if (!sess) return reply.code(401).send('Invalid session')
      request.user = {id}
      done()
    } catch (err) {
      if (err.code === 'FAST_JWT_EXPIRED') {
        try {
          // const {sub, session, role} = jwt.decode(token)
          if (sess === false) {
            delete request.cookies[`${tokenName}`]
            reply.clearAuthCookies()
            return reply.code(401).send('Token and Session expired')
          }
          request.log.info({message: 'Token expired, going to refresh..'})
          done()
        } catch (error) {
          return reply.code(401).send(error.message)
        }
      } else {
        request.log.info({message: `Token error ==> ${err.message}`})
        return reply.code(401).send(`${err.message} -`)
      }
    }
  }

  app
    .decorate('jwt', jwt)
    .decorateRequest('user', null)
    .decorate('authorize', (request, reply) => authorize(request, reply))

  app.addHook('preHandler', (_, reply, done) => {
    reply.headers({'content-type': 'application/json; charset=utf-8'})
    done()
  })

  app.addHook('onSend', function (_, reply, payload, done) {
    reply.headers({
      'X-XSS-Protection': '1; mode=block',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Strict-Transport-Security': 'max-age=31536000',
      'Cache-Control': 'private, no-cache, no-store, must-revalidate, max-age=0',
      Connection: 'close'
    })
    done()
  })
  done()
}

export const jwt = fp(jwtPlugin)

export interface UserPayload {
  id: string
  email?: string
  session?: string
}

interface DecodedJwt extends UserPayload {
  nonce: string
  aud: string
  iss: string
  iat?: number
  exp: number
}

declare module 'fastify' {
  interface FastifyRequest {
    user: UserPayload | null
  }

  interface FastifyInstance {
    jwt: Readonly<FastifyJWT>
    authorize: () => void
  }
}

interface FastifyJWT {
  readonly decode: (token: string) => DecodedJwt
  readonly verify: (token: string) => DecodedJwt
  readonly extractToken: (req: FastifyRequest) => string | void
}
