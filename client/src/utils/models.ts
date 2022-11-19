import type { ColumnType } from './enums';

export interface TaskModel {
  id: string;
  summary: string;
  column: ColumnType;
  color: string;
}

export interface DragItem {
  index: number;
  id: TaskModel['id'];
  from: ColumnType;
}
