import type { NextApiRequest, NextApiResponse } from 'next';

import { getAllMeetings } from '@/api-helper';
import { checkDatabaseHandler, getDatabaseHandler, nextConnectHandler } from '@/lib/next-connect';

const handler = nextConnectHandler();

handler.use(getDatabaseHandler());
handler.use(checkDatabaseHandler());

handler.get(async (_req: NextApiRequest, res: NextApiResponse) => {
  const meetings = await getAllMeetings();
  res.status(200).json(meetings);
});

export default handler;
