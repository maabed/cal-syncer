import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import registerModels, { MongooseModels } from '../../models';

async function decorateWithModels(fastify: FastifyInstance): Promise<void> {
  const models = registerModels(fastify.mongoose);
  fastify.decorate('models', models);
}

export default fp(decorateWithModels);

declare module 'fastify' {
  interface FastifyInstance {
    models: MongooseModels;
  }
}
