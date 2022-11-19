import { Stack, Text } from '@chakra-ui/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Stack py={5} justify="center" align="center">
      <Text fontWeight={'500'} fontSize={'md'}>
        © {currentYear} Syncer. All rights reserved
      </Text>
    </Stack>
  );
}
