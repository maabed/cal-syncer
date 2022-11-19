import { Mongoose, Document, Model, Schema, Types } from 'mongoose';

export default function registerMeetingModel(mongoose: Mongoose): Model<Meeting> {
  const MeetingSchema = new mongoose.Schema<Meeting>(
    {
      gId: {
        type: String,
        unique: true,
      },
      summary: String,
      description: String,
      start: {
        type: Schema.Types.Mixed,
      },
      end: {
        type: Schema.Types.Mixed,
      },
      htmlLink: String,
      status: String,
      attendees: {
        type: Schema.Types.Mixed,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

  MeetingSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, obj) =>{
      delete obj.__v;
      return obj;
    },
  });

  MeetingSchema.post('save', (error, doc, next) => {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      console.log('There was a duplicate key');
      next();
      // next(new Error('There was a duplicate key error'));
    } else {
      next();
    }
  });

  MeetingSchema.index({ gId: 1 }, { unique: true })
  return mongoose.model<Meeting>('Meeting', MeetingSchema);
}


export interface Meeting extends Document {
  gId: string;
  summary: string;
  description: string;
  userId: Types.ObjectId;
  htmlLink: string;
  start: {
    [key: string]: any;
  };
  end: {
    [key: string]: any;
  };
  status: string;
  attendees:  {
    [key: string]: any;
  };
}
