import fastify, { FastifyInstance } from 'fastify';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import cors from '@fastify/cors';
// import helmet from '@fastify/helmet';
import compress from '@fastify/compress';
import rateLimit from '@fastify/rate-limit';
import sensible from '@fastify/sensible';
import {
  fastifyUtils,
  health,
  exitHandler,
  errors,
  mongo,
  jwt,
  authCookies
} from './plugins';
import { apis } from './api';
import { services } from './services';


export default async function build(config): Promise<FastifyInstance> {
  const server = fastify(config.serverInit);
  const ajv = new Ajv({
    allErrors: true,
    coerceTypes: true,
    useDefaults: true,
  });

  addFormats(ajv, { mode: 'fast' }).addKeyword('kind').addKeyword('modifier');

  // @ts-ignore
  server.setValidatorCompiler(({ schema }) => {
    return ajv.compile(schema);
  });

  server
    .register(exitHandler)
    .register(fastifyUtils, config)
    .register(rateLimit, {
      max: 100,
      timeWindow: '1m',
    })
    .register(sensible)
    .register(errors)
    .register(compress)
    .register(mongo, {mongoUrl: config.mongoUrl})
    // .register(helmet) // TODO: prevents loading altair UI, debug!
    .register(authCookies, config.auth.cookies)
    .register(jwt)
    .register(cors, config.cors)
    .register(services)
    .register(health)
    .register(apis);

  await server.ready();

  // @ts-ignore
  return server;
}
