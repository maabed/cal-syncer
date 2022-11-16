import { FastifyInstance } from 'fastify';
import build from './server';
import configs from './config';

async function main() {
  const app: FastifyInstance = await build(configs);
  try {
    await app.listen({ port: configs.port || 9000, host: '0.0.0.0' });

    // run every 6 hours
    setInterval(async () => {
      await app.services.meeting.syncUsersMeetingWorker()
    }, 6 * 60 * 60 * 1000);

    // app.log.info(app.printRoutes());

  } catch (error) {
    app.log.error('Server failed to start %j', error);
    app.exit(1, error);
  }
}

main();
