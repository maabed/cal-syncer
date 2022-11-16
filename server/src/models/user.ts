import { Mongoose, Document, Model } from 'mongoose';
import isEmpty from 'lodash/isEmpty';

export default function (mongoose: Mongoose): Model<User> {
  const UserSchema = new mongoose.Schema<User>(
    {
      name: {
        type: String,
      },
      googleId: {
        type: String,
      },
      email: {
        type: String,
        lowercase: true,
        required: true,
        match: /\S+@\S+\.\S+/,
        validate: {
          msg: 'Email must be unique.',
          async validator(this: User, value: string): Promise<boolean> {
            const existing = await mongoose.model('User').findOne({ email: value }).exec();

            const unique = isEmpty(existing) ? true : existing.equals(this);

            return unique;
          },
        },
      },
      refreshToken: {
        type: String,
      },
      lastSync: Date,
    },
    {
      timestamps: true,
    },
  );

  UserSchema.set('toJSON', {
    virtuals: true,
  });

  return mongoose.model<User>('User', UserSchema);
}

export interface User extends Document {
  name: string;
  googleId: string;
  email: string;
  refreshToken: string;
  lastSync?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserResponseObject {
  email: string;
  lastSync: Date;
}
