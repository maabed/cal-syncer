import { Badge, Box, Heading, Stack, useColorModeValue } from '@chakra-ui/react';

import { useColumnDrop, useColumnTasks } from '@/hooks';
import type { ColumnType } from '@/utils/enums';

import Task from './Task';

const ColumnColorScheme: Record<ColumnType, string> = {
  Accepted: 'green',
  Tentative: 'gray',
  NeedsAction: 'yellow',
  Declined: 'red',
};

function Column({ column }: { column: ColumnType }) {
  const { tasks, dropTaskFrom, swapTasks, updateTask } = useColumnTasks(column);

  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);

  const ColumnTasks = tasks.map((task, index) => (
    <Task key={task.id} task={task} index={index} onDropHover={swapTasks} onUpdate={updateTask} />
  ));

  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge px={2} py={1} rounded="lg" colorScheme={ColumnColorScheme[column]}>
          {column}
        </Badge>
      </Heading>
      <Stack
        ref={dropRef}
        direction={{ base: 'row', md: 'column' }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue('gray.50', 'gray.900')}
        rounded="lg"
        boxShadow="md"
        overflow="auto"
        opacity={isOver ? 0.85 : 1}
      >
        {ColumnTasks}
      </Stack>
    </Box>
  );
}

export default Column;
