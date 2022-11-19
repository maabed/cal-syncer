import { useDrop } from 'react-dnd';

import type { ColumnType } from '@/utils/enums';
import { ItemType } from '@/utils/enums';
import type { DragItem, TaskModel } from '@/utils/models';

export const useColumnDrop = (
  column: ColumnType,
  handleDrop: (fromColumn: ColumnType, taskId: TaskModel['id']) => void,
) => {
  const [{ isOver }, dropRef] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: ItemType.TASK,
    drop: (dragItem) => {
      if (!dragItem || dragItem.from === column) {
        return;
      }

      handleDrop(dragItem.from, dragItem.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return {
    isOver,
    dropRef,
  };
};
