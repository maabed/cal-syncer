import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import type { NonNullableField } from '@/types/general';

export const useCurrentUser = () => {
  const { data: session } = useSession();
  return useMemo(() => (session?.user || {}) as NonNullableField<NonNullable<Session['user']>>, [session]);
};
