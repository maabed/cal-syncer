import { Stack } from '@chakra-ui/react';
import type { FC } from 'react';

import { UsersGridComponent, UsersResultComponent } from '@/components/UsersComponent';
import { useCustomMeetingsQuery } from '@/hooks';

interface IMeetingsComponentProps {}

export const MeetingsComponent: FC<IMeetingsComponentProps> = () => {
  const { data, isLoading } = useCustomMeetingsQuery();

  return (
    <Stack my={6}>
      <UsersGridComponent totalCount={data.totalCount} isLoading={isLoading}>
        <UsersResultComponent isLoading={isLoading} meetings={data.meetings} />
      </UsersGridComponent>
    </Stack>
  );
};
