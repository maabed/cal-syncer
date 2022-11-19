import { WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import type { FC } from 'react';

interface IAccessDeniedIndicatorProps {
  title?: string;
  message?: string;
}

const AccessDeniedIndicator: FC<IAccessDeniedIndicatorProps> = ({
  title = 'Access Denied...',
  message = 'You need to Sign In to view this content!',
}) => {
  const iconNode = () => {
    return <WarningTwoIcon color="orange.300" boxSize="50px" />;
  };

  const signInButtonNode = () => {
    return (
      <Link href="/auth/signIn" passHref>
        <Button
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          {message}
        </Button>
      </Link>
    );
  };

  return (
    <Flex justifyContent="center" alignItems="center" h="100vh">
      <Stack spacing={4} align="center">
        <Box>{iconNode()}</Box>
        <Heading as="h2" size="xl" mt={6} pb={4}>
          {title}
        </Heading>
        <Box>{signInButtonNode()}</Box>
      </Stack>
    </Flex>
  );
};

export default AccessDeniedIndicator;
