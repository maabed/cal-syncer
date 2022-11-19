import { cacher } from '@/lib/rtkQueryCacheUtils';
import type { IMeetingApiResponse } from '@/types/ApiResponse';

import { baseApi } from './base';

const apiWithDetails = baseApi.enhanceEndpoints({
  addTagTypes: [...cacher.defaultTags, 'Meetings'],
});

export const meetingsApi = apiWithDetails.injectEndpoints({
  endpoints: (builder) => ({
    getMeetings: builder.query<IMeetingApiResponse, void>({
      query: () => '/base-api/meetings',
      providesTags: cacher.providesNestedList('Meetings', 'meetings'),
    }),
  }),
  overrideExisting: true,
});

export const { useGetMeetingsQuery } = meetingsApi;
