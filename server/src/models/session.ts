import { Mongoose, Document, Model } from 'mongoose';

export default function registerSessionModel(mongoose: Mongoose): Model<Session> {
  const SessionSchema = new mongoose.Schema<Session>(
    {
      sessionToken: String,
      userId: String,
      expires: Date,
    },
    {
      timestamps: true,
    },
  );

  SessionSchema.set('toJSON', {
    virtuals: true,
  });

  return mongoose.model<Session>('Session', SessionSchema);
}

export interface SessionRaw {
  sessionToken: string;
  userId: string;
  expires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Session extends SessionRaw, Document {
  version: number;
}
