/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FastifyServerOptions } from 'fastify';
import envSchema from 'env-schema';
import S from 'fluent-json-schema';
import helmet from '@fastify/helmet';
import { FastifyCorsOptions } from '@fastify/cors';
import {VerifierOptions} from 'fast-jwt';
import {CookieSerializeOptions} from '@fastify/cookie'

import logger from './log';

export const whitelist: any = [
  /(http(s)?:\/\/)?(.+\.)?mabed\.io(\/)?(:\d{1,5})?$/,
];

type corsCallback = (err: Error | null, options: FastifyCorsOptions) => void;

type FastifyHelmetOptions = Parameters<typeof helmet>[0];

export function getConfig() {
  const env = envSchema({
    dotenv: true,
    schema: S.object()
      .prop('NODE_ENV', S.string().default('development'))
      .prop('LOG_LEVEL', S.string().default('info'))
      .prop('PORT', S.number().default(9000))
      .prop('BASE_URL', S.string().default('http://localhost:9000'))
      .prop('DOMAIN', S.string().default('localhost'))
      .prop('MONGODB_URI', S.string())
      .prop('JWT_SECRET', S.string())
      .prop('AUTH_COOKIES_SECRET', S.string())
      .prop('GOOGLE_CLIENT_ID', S.string())
      .prop('GOOGLE_CLIENT_SECRET', S.string())
      .prop('CALLBACK_URL', S.string()),
  });


  const isSSL = url => {
    const {protocol} = new URL(url.toLowerCase())
    return protocol === 'https:'
  }


  const isProd: boolean = env.NODE_ENV !== 'development';

  if (env.NODE_ENV === 'development') {
    whitelist.push('localhost');
  }

  const config = {
    isProd: isProd as boolean,
    env: env.NODE_ENV as string,
    port: +env.PORT as number,
    baseUrl: env.BASE_URL as string,
    logLevel: env.LOG_LEVEL as string,
    mongoUrl: env.MONGODB_URI as string,
    serverInit: {
      ignoreTrailingSlash: true,
      disableRequestLogging: isProd,
      trustProxy: isProd,
      logger: logger,
      http2: false,
      keepAliveTimeout: 650 * 1000,
    } as Partial<FastifyServerOptions>,
    auth: {
      tokenExp: (8.64e7 * 14) as number, // 14 day
      jwtSecret: env.JWT_SECRET as string,
      cookies: {
        secret: env.AUTH_COOKIES_SECRET as string,
        tokenName: 'SID',
        authOpts: {
          domain: env.DOMAIN,
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 14, // 14 days
          path: '/',
          sameSite: 'lax',
          secure: isProd && isSSL(env.BASE_URL),
          signed: true
        } as Partial<CookieSerializeOptions>,
        clearOpts: {
          domain: env.DOMAIN,
          expires: new Date(0),
          path: '/'
        } as Partial<CookieSerializeOptions>,
        subdomainOpts: (host, opts): Partial<CookieSerializeOptions> => {
          const parts = host.split('.')
          while (parts.length > 2) {
            parts.shift()
          }
          const domain = parts.join('.')
          return {...opts, domain}
        }
      },
      verifierOpts: {
        key: env.JWT_SECRET as string,
        algorithms: ['HS256'],
        cache: true,
        cacheTTL: 30 * 60 * 1000 // 30 mins
      } as Partial<VerifierOptions>,
    },
    googleClient: {
      id: env.GOOGLE_CLIENT_ID as string,
      secret: env.GOOGLE_CLIENT_SECRET as string,
      cbURL: env.CALLBACK_URL as string,
    },
    cors: {
      origin: (origin: string, cb: corsCallback): void => {
        if (!origin || whitelist.some((domain) => origin.match(domain))) {
          //  Request from localhost will pass
          cb(null, { origin: true });
          return;
        }
        cb(new Error('Not Allowed By Cors'), { origin: false });
      },
      preflight: true,
      preflightContinue: true,
      credentials: true,
      methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
    } as Partial<FastifyCorsOptions>,
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          fontSrc: ["'self'"],
          frameAncestors: ["'none'"],
          imgSrc: ["'self'", 'data:', 'blob:', 'http:', 'https:'],
          objectSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          scriptSrcAttr: ["'self'"],
          styleSrc: ["'self'"],
          formAction: ["'self'"],
        },
      },
      hsts: {
        maxAge: 60 * 60 * 24 * 365, // 1 year to get preload approval
        preload: true,
        includeSubDomains: true,
      },
      frameguard: {
        action: 'sameorigin',
      },
      referrerPolicy: {
        policy: 'no-referrer',
      },
    } as Partial<FastifyHelmetOptions>,
  };

  return config;
}

const configs = getConfig()
export default configs

export interface Config {
  isProd: boolean;
  env: string;
  port: number;
  baseUrl: string;
  mongoUrl: string;
  logLevel: string;
  serverInit: FastifyServerOptions;
  auth: {
    jwtSecret: string;
    cookies: {
      secret: string;
      tokenName: string;
      authOpts: CookieSerializeOptions;
      clearOpts: CookieSerializeOptions;
      setSubdomain: CookieSerializeOptions;
    };
    tokenExp: number;
    verifierOpts: VerifierOptions;
  };
  googleClient: {
    id: string;
    secret: string;
    cdURL: string;
  };
  cors: FastifyCorsOptions;
  helmet: Partial<FastifyHelmetOptions>;
}
