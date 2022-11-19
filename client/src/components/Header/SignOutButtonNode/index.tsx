import { Box, Button } from '@chakra-ui/react';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import type { FC } from 'react';

export const SignOutButtonNode: FC<{ session: Session | null }> = ({ session }) => {
  if (!session) {
    return null;
  }

  return (
    <Box>
      <Button
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
      >
        Sign Out
      </Button>
    </Box>
  );
};
