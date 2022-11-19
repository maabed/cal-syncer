import { Container, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Column from '@/components/Kanban/Column';
import { useGetMeetingsQuery } from '@/redux/services/meetings';
import appConfig from '@/utils/appConfig';
import { ColumnType } from '@/utils/enums';

interface IHomeComponentProps {}

export const HomeComponent: FC<IHomeComponentProps> = () => {
  const { data } = useGetMeetingsQuery();

  return (
    <Stack my={6}>
      <Heading
        as={'h1'}
        textAlign="center"
        fontWeight={600}
        fontSize={{ base: 'xl', sm: '2xl', md: '4xl' }}
        lineHeight={'110%'}
        mb={6}
      >
        Welcome to{' '}
        <Text as={'span'} color={'primary'}>
          {appConfig.siteName}
        </Text>
      </Heading>
      {data && data?.meetings.length > 0 && (
        <Flex justifyContent="center" alignItems="center">
          <DndProvider backend={HTML5Backend}>
            <Container maxWidth="container.lg" px={4} py={10}>
              <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 16, md: 4 }}>
                <Column column={ColumnType.ACCEPTED} />
                <Column column={ColumnType.TENTATIVE} />
                <Column column={ColumnType.NEEDSACTION} />
                <Column column={ColumnType.DECLINED} />
              </SimpleGrid>
            </Container>
          </DndProvider>
        </Flex>
      )}
    </Stack>
  );
};
