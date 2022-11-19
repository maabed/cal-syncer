import { Box, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import { memo } from 'react';

import { useTaskDragAndDrop } from '@/hooks';
import type { TaskModel } from '@/utils/models';

import { AutoResizeTextarea } from './AutoResizeTextArea';

type TaskProps = {
  index: number;
  task: TaskModel;
  onUpdate: (id: TaskModel['id'], updatedTask: TaskModel) => void;
  onDropHover: (i: number, j: number) => void;
};

function Task({ index, task, onUpdate: handleUpdate, onDropHover: handleDropHover }: TaskProps) {
  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>({ task, index }, handleDropHover);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSummary = e.target.value;
    handleUpdate(task.id, { ...task, summary: newSummary });
  };

  return (
    <ScaleFade in={true} unmountOnExit>
      <Box
        ref={ref}
        as="div"
        role="group"
        position="relative"
        rounded="lg"
        w={200}
        pl={3}
        pr={7}
        pt={3}
        pb={1}
        boxShadow="xl"
        cursor="grab"
        fontWeight="bold"
        userSelect="none"
        bgColor={task.color}
        opacity={isDragging ? 0.5 : 1}
      >
        <AutoResizeTextarea
          value={task.summary}
          fontWeight="semibold"
          cursor="inherit"
          border="none"
          p={0}
          resize="none"
          minH={70}
          maxH={200}
          focusBorderColor="none"
          color="gray.700"
          onChange={handleTitleChange}
        />
      </Box>
    </ScaleFade>
  );
}
export default memo(Task, (prev, next) => {
  if (
    _.isEqual(prev.task, next.task) &&
    _.isEqual(prev.index, next.index) &&
    prev.onDelete === next.onDelete &&
    prev.onDropHover === next.onDropHover &&
    prev.onUpdate === next.onUpdate
  ) {
    return true;
  }

  return false;
});
