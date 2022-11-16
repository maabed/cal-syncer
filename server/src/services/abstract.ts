import { FastifyInstance } from 'fastify';
import { FastifyService } from '../plugins/fastifyUtil';

export abstract class AbstractService implements FastifyService {
  protected config!: FastifyInstance['config'];
  protected errors!: FastifyInstance['errors'];
  protected log!: FastifyInstance['log'];
  protected services!: FastifyInstance['services'];
  protected redis!: FastifyInstance['redis'];
  protected mongo!: FastifyInstance['mongo'];
  protected models!: FastifyInstance['models'];

  inject({ config, log, services, errors, redis, mongo, models }: FastifyInstance) {
    this.config = config;
    this.mongo = mongo;
    this.models = models;
    this.services = services;
    this.errors = errors;
    this.redis = redis;
    this.log = log.child({ service: this.constructor.name });
  }
}
