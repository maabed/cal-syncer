import type { Session } from 'next-auth';
import type { FC, ReactNode } from 'react';

import { AppChakraProvider } from '@/providers/AppChakraProvider';
import { AppSessionProvider } from '@/providers/AppSessionProvider';
import { AppStoreProvider } from '@/providers/AppStoreProvider';
import type { store } from '@/redux/store';

interface IMainLayoutProps {
  children: ReactNode;
  session?: Session;
  cookies?: string;
  store?: typeof store;
}

export const MainLayout: FC<IMainLayoutProps> = ({ children, session, cookies, store }) => {
  return (
    <AppChakraProvider cookies={cookies}>
      <AppSessionProvider session={session}>
        <AppStoreProvider store={store}>{children}</AppStoreProvider>
      </AppSessionProvider>
    </AppChakraProvider>
  );
};
