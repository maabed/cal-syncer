import fp from 'fastify-plugin';
import { FastifyPluginCallback } from 'fastify';
import { Mongoose, connect, disconnect, Model } from 'mongoose';
import modelMeeting, { Meeting } from '../models/meeting';
import modelSession, { Session } from '../models/session';
import modelAccount, { Account } from '../models/account';
import modelUser, { User } from '../models/user';

export interface MongooseModels {
  Meeting: Model<Meeting>;
  Session: Model<Session>;
  User: Model<User>;
  Account: Model<Account>;
}

function registerModels(mongoose: Mongoose): MongooseModels {
  return {
    Meeting: modelMeeting(mongoose),
    Session: modelSession(mongoose),
    User: modelUser(mongoose),
    Account: modelAccount(mongoose),
  };
}

export const mongo: FastifyPluginCallback<{ mongoUrl: string }> = fp(async function (app, { mongoUrl }, done) {
  const mongoose = await connect(mongoUrl);

  app.decorate('mongo', mongoose);
  app.addHook('onClose', function (f, done) {
    disconnect()
    done()
  })
  const models = registerModels(mongoose);
  app.decorate('models', models);
  done();
})

declare module 'fastify' {
  interface FastifyInstance {
    mongo: Promise<Mongoose>;
    models: MongooseModels;
  }
}
