import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';

import appConfig from '@/utils/appConfig';

interface IErrorPageComponentProps {
  statusCode: number;
  title?: string;
  message?: string;
}

export const ErrorPageComponent: FC<IErrorPageComponentProps> = ({ statusCode, message, title }) => {
  const headerHeight: string = '64px';
  const footerHeight: string = '64px';

  return (
    <Stack>
      <Flex minH={`calc(100vh - (${headerHeight} + ${footerHeight}))`} justifyContent="center" alignItems="center">
        <Stack spacing={4} maxW="xl" mx="auto">
          <Box display="flex" justifyContent="center">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bg={'red.500'}
              rounded={'50px'}
              w={'55px'}
              h={'55px'}
              textAlign="center"
            >
              <CloseIcon boxSize={'20px'} color={'white'} />
            </Flex>
          </Box>
          <Heading textAlign="center">{title || appConfig.siteName}</Heading>
          <Text fontSize="xl" lineHeight="tall" textAlign="center">
            {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
          </Text>
          {!!message && (
            <Text color={'gray.500'} fontSize="md" pb="5" pt="1">
              {message}
            </Text>
          )}
          <Box>
            <Stack isInline align="center" justifyContent="center">
              <Box>
                <Link href="/" passHref>
                  <Button>Return to the home page</Button>
                </Link>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default ErrorPageComponent;
