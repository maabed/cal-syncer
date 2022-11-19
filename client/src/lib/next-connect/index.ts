import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextHandler, Options } from 'next-connect';
import nextConnect from 'next-connect';

import type { ICustomError } from '@/types/error';

import { getDatabaseInstance, getDatabaseStatus } from '../mongodb';

const nextConnectOpts = {
  onError(err: ICustomError, _req: NextApiRequest, res: NextApiResponse) {
    res.statusCode = err.status && err.status >= 100 && err.status < 600 ? err.status : 500;
    res.json({ error: err.message });
  },
};

export const getDatabaseHandler = (databaseName?: string) => {
  return async (req: NextApiRequest, _res: NextApiResponse, next: NextHandler) => {
    try {
      req.db = await getDatabaseInstance(databaseName);
      next();
    } catch (err) {
      next(err);
    }
  };
};

export const checkDatabaseHandler = () => {
  return async (req: NextApiRequest, _res: NextApiResponse, next: NextHandler) => {
    const dbHealth = await getDatabaseStatus(req.db);
    if (!dbHealth) {
      return next(new Error('Unable to connect to the mongoDB server.'));
    }
    return next();
  };
};

export const nextConnectHandler = (options?: Options<NextApiRequest, NextApiResponse<any>>) =>
  nextConnect({ ...nextConnectOpts, ...options });
