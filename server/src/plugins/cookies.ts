import {FastifyPluginCallback} from 'fastify'
import fp from 'fastify-plugin'
import cookie, {CookieSerializeOptions} from '@fastify/cookie'

const cookiePlugin: FastifyPluginCallback<CookieConfigs> = async function (
  app,
  {tokenName, authOpts, clearOpts, secret},
  done
) {
  app.register(cookie, {secret})

  app.decorateReply('setAuthCookies', function (token: string) {
    this.setCookie(tokenName, token, authOpts)
  })

  app.decorateReply('clearAuthCookies', function () {
    this.clearCookie(tokenName, clearOpts)
  })

  done()
}

export const authCookies = fp(cookiePlugin)

declare module 'fastify' {
  interface FastifyReply {
    setAuthCookies: (token: string) => FastifyReply
    clearAuthCookies: () => void
  }
}

type CookieConfigs = {
  secret: string
  tokenName: string
  authOpts: Partial<CookieSerializeOptions>
  clearOpts: Partial<CookieSerializeOptions>
}
