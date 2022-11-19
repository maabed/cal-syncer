import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import type { FC } from 'react';

import type { IMeetingApiResponse } from '@/types/ApiResponse';

import { UserCardBox, UserCardBoxSkeleton } from './UserCardBox';

interface IUsersResultComponentProps {
  isLoading: boolean;
  users?: IMeetingApiResponse['users'];
}

const SkeletonLoaderContainer = () => {
  return (
    <SimpleGrid minChildWidth="280px" spacing={8}>
      {Array.from({ length: 6 }, (_, i) => (
        <UserCardBoxSkeleton key={i} />
      ))}
    </SimpleGrid>
  );
};

const NoDataFound = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading size="xl">No data found.</Heading>
    </Box>
  );
};

export const UsersResultComponent: FC<IUsersResultComponentProps> = ({ meetings, isLoading }) => {
  if (isLoading) return <SkeletonLoaderContainer />;
  if (!meetings?.length) return <NoDataFound />;

  return (
    <SimpleGrid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" spacing={8}>
      {meetings.map((meet) => (
        <UserCardBox key={meet.id} {...meet} />
      ))}
    </SimpleGrid>
  );
};
