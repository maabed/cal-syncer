import { Box, Heading } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import type { FC } from 'react';

import AccessDeniedIndicator from '@/components/AccessDeniedIndicator';
import { useAppDispatch } from '@/hooks';
import { setCurrentToken } from '@/redux/features/auth';

interface IAuthLayout {
  children: React.ReactNode;
  isLoginRedirect?: boolean;
}

const Authenticating = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl">
        Authenticating...
      </Heading>
    </Box>
  );
};

export const AuthLayout: FC<IAuthLayout> = ({ children, isLoginRedirect }) => {
  const dispatch = useAppDispatch();

  const isRedirect = isLoginRedirect || false;
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status, data: session } = useSession({ required: isRedirect });

  if (status === 'loading') {
    return <Authenticating />;
  }

  if (status === 'unauthenticated') {
    return <AccessDeniedIndicator />;
  }

  dispatch(setCurrentToken(session?.token));

  return <>{children}</>;
};
