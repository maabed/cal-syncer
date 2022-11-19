import { CustomError } from '@/error-handlers';
import type { IMeetingApiResponse } from '@/types/ApiResponse';
import appConfig from '@/utils/appConfig';

export const getAllMeetingsPerPage = async () => {
  const res = await fetch(`${appConfig.siteUrl}/base-api/meetings`);
  const result = await res.json();
  return result;
};

export const getAllMeetings = async (): Promise<IMeetingApiResponse> => {
  try {
    const result = await getAllMeetingsPerPage();
    const promises = Array.from({ length: result.total_pages - 1 }, (_, i) => getAllMeetingsPerPage(i + 2));
    const results = await Promise.all(promises);
    const meetings: IMeetingApiResponse['meetings'] = results.reduce((acc, cur) => [...acc, ...cur.data], result.data);
    return {
      meetings,
      count: meetings.length,
      totalCount: result.total,
    };
  } catch (err) {
    throw new CustomError('Unable to fetch meetings.');
  }
};
