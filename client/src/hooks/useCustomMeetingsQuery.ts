import { useEffect, useState } from 'react';

import { getAllMeetings } from '@/api-helper';
import type { IMeetingApiResponse } from '@/types/ApiResponse';

const initialData: IMeetingApiResponse = {
  users: [],
  totalCount: 0,
  count: 0,
};

export const useCustomMeetingsQuery = () => {
  const [data, setData] = useState<IMeetingApiResponse>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const getMeetings = async () => {
      setIsLoading(true);
      try {
        const result = await getAllMeetings();
        if (mounted) {
          setData(result);
          setIsLoading(false);
        }
      } catch (err) {
        setData(initialData);
        setIsLoading(false);
      }
    };
    getMeetings();
    return () => {
      mounted = false;
    };
  }, []);

  return { data, isLoading };
};
