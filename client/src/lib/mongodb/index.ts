// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import type { Db } from 'mongodb';
import { MongoClient } from 'mongodb';

import appConfig from '@/utils/appConfig';

declare global {
  /* eslint-disable vars-on-top */
  // eslint-disable-next-line no-var
  var mongoClientPromise: Promise<MongoClient>;
}

const { mongodbUri } = appConfig;

// eslint-disable-next-line import/no-mutable-exports
let mongoClientPromise: Promise<MongoClient>;

if (!mongodbUri) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global.mongoClientPromise) {
    const client = new MongoClient(mongodbUri);
    global.mongoClientPromise = client.connect();
  }
  mongoClientPromise = global.mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  const client = new MongoClient(mongodbUri);
  mongoClientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export { mongoClientPromise };

export const getDatabaseInstance = async (databaseName?: string) => {
  const client = await mongoClientPromise;
  const db = client.db(databaseName);
  return db;
};

export const getDatabaseStatus = async (db: Db) => {
  try {
    const status = await db.command({ ping: 1 });
    return status.ok === 1;
  } catch (err) {
    return false;
  }
};
