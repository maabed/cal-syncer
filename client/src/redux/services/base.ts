import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import appConfig from '@/utils/appConfig';

import type { AppState } from '../store';

const getBaseQuery = fetchBaseQuery({
  baseUrl: appConfig.siteUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const { token } = (getState() as AppState).auth;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: getBaseQuery,
  endpoints: () => ({}),
});
