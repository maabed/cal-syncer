import { useEffect, useState } from 'react';

import { getAllUsers } from '@/api-helper';
import type { IUserApiResponse } from '@/types/ApiResponse';

const initialData: IUserApiResponse = {
  users: [],
  totalCount: 0,
  count: 0,
};

export const useCustomUsersQuery = () => {
  const [data, setData] = useState<IUserApiResponse>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const result = await getAllUsers();
        if (mounted) {
          setData(result);
          setIsLoading(false);
        }
      } catch (err) {
        setData(initialData);
        setIsLoading(false);
      }
    };
    getUsers();
    return () => {
      mounted = false;
    };
  }, []);

  return { data, isLoading };
};
