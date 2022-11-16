import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { MeetingSchema } from '../schemas';

// GET  /meetings
const meetingControllers: FastifyPluginCallback = function (app, _, done) {
  app.get(
    '/meetings',
    {
      schema: MeetingSchema.listMeetings,
      preValidation: [app.authorize],
    },
    async ( req: FastifyRequest<{ Querystring: { totalCount?: number; count?: number } }>, reply) => {
      const { id } = req.user
      const results = await app.services.meeting.getAll(id);
      return reply.status(200).send(results);
    },
  );
  done();
};

export default meetingControllers;
