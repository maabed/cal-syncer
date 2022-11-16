import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import meeting from './meeting';
import user from './user';

const apiPlugin: FastifyPluginCallback = function (app, _, done) {
  app.register(meeting, { prefix: '/api/v1' });
  app.register(user, { prefix: '/api/v1' });
  done();
};

export const apis = fp(apiPlugin);
