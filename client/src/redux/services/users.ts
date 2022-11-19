import { cacher } from '@/lib/rtkQueryCacheUtils';
import type { IUserApiResponse } from '@/types/ApiResponse';

import { baseApi } from './base';

const apiWithTags = baseApi.enhanceEndpoints({
  addTagTypes: [...cacher.defaultTags, 'Users'],
});

export const usersApi = apiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUserApiResponse, void>({
      query: () => '/api/users',
      providesTags: cacher.providesNestedList('Users', 'users'),
    }),
  }),
  overrideExisting: true,
});

export const { useGetUsersQuery } = usersApi;
