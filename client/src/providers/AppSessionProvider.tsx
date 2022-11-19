import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { FC } from 'react';
import React from 'react';

interface IAppSessionProviderProps {
  children: React.ReactNode;
  session?: Session;
}
export const AppSessionProvider: FC<IAppSessionProviderProps> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
