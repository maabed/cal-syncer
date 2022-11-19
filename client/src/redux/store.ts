import type { ConfigureStoreOptions } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { authSlice } from './features/auth';
import { meetingsSlice } from './features/meetings';
import { usersSlice } from './features/users';
import { baseApi } from './services/base';

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) => {
  return configureStore({
    reducer: combineReducers({
      [baseApi.reducerPath]: baseApi.reducer,
      [meetingsSlice.name]: meetingsSlice.reducer,
      [usersSlice.name]: usersSlice.reducer,
      [authSlice.name]: authSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([baseApi.middleware]),
    devTools: process.env.NODE_ENV !== 'production',
    ...options,
  });
};

export const store = createStore();
// optional but required for refetchOnFocus and refetchOnReconnect behaviors.
// for more details see: https://redux-toolkit.js.org/rtk-query/api/setupListeners
setupListeners(store.dispatch);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
