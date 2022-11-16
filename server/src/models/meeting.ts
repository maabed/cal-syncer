import { Mongoose, Document, Model, Schema, Types } from 'mongoose';

export default function registerMeetingModel(mongoose: Mongoose): Model<Meeting> {
  const MeetingSchema = new mongoose.Schema<Meeting>(
    {
      summary: String,
      description: String,
      start: Date,
      end: Date,
      organizer: String,
      status: String,
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      additionalProperties: {
        type: Schema.Types.Mixed,
      },
    },
    {
      timestamps: true,
    },
  );

  MeetingSchema.set('toJSON', {
    virtuals: true,
  });

  return mongoose.model<Meeting>('Meeting', MeetingSchema);
}

enum Status {
  deleted = 'deleted',
  pending = 'pending',
  pendingDeletion = 'pending deletion',
  published = 'published',
  rejected = 'rejected',
}

export interface Meeting extends Document {
  summary: string;
  description: string;
  userId: Types.ObjectId;
  organizer: string;
  createdAt?: Date;
  updatedAt?: Date;
  start: Date;
  end: Date;
  status: Status;
  additionalProperties: {
    [key: string]: any;
  };
}
