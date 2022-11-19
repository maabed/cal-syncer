import { SkeletonText, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import type { FC, ReactNode } from 'react';

interface IUsersGridComponentProps {
  children: ReactNode;
  totalCount: number;
  isLoading: boolean;
}

export const UsersGridComponent: FC<IUsersGridComponentProps> = ({ children, totalCount, isLoading }) => {
  return (
    <Stack spacing={4}>
      <SkeletonText isLoaded={!isLoading} noOfLines={1} spacing="4" w={isLoading ? '2xl' : 'full'}>
        <Text textAlign={{ base: 'center', md: 'left' }} color={useColorModeValue('gray.900', 'gray.300')}>
          Showing results with FirstName starting with <strong>“G”</strong> or LastName starting with{' '}
          <strong>“W”</strong> and total number of users count is <strong>{totalCount || 0}</strong>.
        </Text>
      </SkeletonText>
      {children}
    </Stack>
  );
};
