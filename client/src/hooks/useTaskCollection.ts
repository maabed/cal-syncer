import { useLocalStorage } from 'usehooks-ts';

import { useGetMeetingsQuery } from '@/redux/services/meetings';
import { capitalize, groupByKey } from '@/utils/common';
import type { ColumnType } from '@/utils/enums';
import { pickChakraRandomColor } from '@/utils/helpers';
import type { TaskModel } from '@/utils/models';

function useTaskCollection() {
  const { data, isLoading } = useGetMeetingsQuery();
  const meetings = isLoading !== true ? data?.meetings : [];
  let serialized = meetings.map(({ id, summary, ...rest }) => ({
    id,
    summary,
    column: capitalize(rest.status),
    color: pickChakraRandomColor('.300'),
  }));
  serialized = groupByKey(serialized, 'column');

  return useLocalStorage<{
    [key in ColumnType]: TaskModel[];
  }>('tasks', {
    Accepted: serialized.Accepted || [],
    Tentative: serialized.Tentative || [],
    NeedsAction: serialized.NeedsAction || [],
    Declined: serialized.Declined || [],
  });
}

export default useTaskCollection;
