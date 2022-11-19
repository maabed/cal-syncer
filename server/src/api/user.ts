import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { UserSchema } from '../schemas';

const userControllers: FastifyPluginCallback = function (app, _, done) {
  app.post(
    '/user/sync',
    {
      schema: UserSchema.syncUser,
    },
    async (req: FastifyRequest<{ Body: { id: string, email: string, name: string, accessToken: string, refreshToken: string, idToken?: string }}>, reply) => {
      const { id, email, name, accessToken, refreshToken, idToken } = req.body;
      console.log('↓↓↓↓↓ req.body ↓↓↓↓↓');
      console.log(req.body);
      const results = await app.services.user.sync({ id, email, name, accessToken, refreshToken, idToken });
      console.log('↓↓↓↓↓ results on contraller ↓↓↓↓↓')
      console.log(results)
      return reply.status(200).send(true);
    },
  );
  done();
};

export default userControllers;
