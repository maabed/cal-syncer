import fp from 'fastify-plugin';
import { FastifyPluginCallback } from 'fastify';
import { MeetingService } from './meeting';
import { UserService } from './user';
import { GCalService } from './gcal';

const _services = Object.freeze({
  meeting: new MeetingService(),
  user: new UserService(),
  gcal: new GCalService()
});

const servicesPlugin: FastifyPluginCallback = (app, _, done) => (app.registerServices('services', _services), done());

export const services = fp(servicesPlugin);

declare module 'fastify' {
  interface FastifyInstance {
    services: typeof _services;
  }
}
