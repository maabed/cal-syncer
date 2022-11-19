import { Mongoose, Document, Model, Schema, Types } from 'mongoose';

export default function registerAccountModel(mongoose: Mongoose): Model<Account> {
  const AccountSchema = new mongoose.Schema<Account>(
    {
      providerAccountId: String,
      refresh_token: String,
      access_token: String,
      expires_at: Date,
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  );

  AccountSchema.set('toJSON', {
    virtuals: true,
  });

  return mongoose.model<Account>('Account', AccountSchema);
}


export interface Account extends Document {
  providerAccountId: string;
  refresh_token: string;
  access_token: string;
  expires_at: Date
  userId: Types.ObjectId;
}
