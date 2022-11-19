import type { FC } from 'react';
import React from 'react';
import { Provider } from 'react-redux';

import { store as defaultStore } from '@/redux/store';

interface IAppStoreProviderProps {
  children: React.ReactNode;
  store?: typeof defaultStore;
}
export const AppStoreProvider: FC<IAppStoreProviderProps> = ({ children, store }) => {
  const currentStore = store || defaultStore;
  return <Provider store={currentStore}>{children}</Provider>;
};
