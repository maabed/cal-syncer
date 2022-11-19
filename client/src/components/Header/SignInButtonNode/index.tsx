import { Box, Button } from '@chakra-ui/react';
import type { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import type { FC } from 'react';

export const SignInButtonNode: FC<{ session: Session | null }> = ({ session }) => {
  if (session) {
    return null;
  }

  return (
    <Box>
      <Button
        onClick={(e) => {
          e.preventDefault();
          signIn('google');
        }}
      >
        Sign In
      </Button>
    </Box>
  );
};
