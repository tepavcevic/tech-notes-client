import { useSearchParams } from 'react-router-dom';

import { useGetNotesQuery } from './notesApiSlice';
import { LIMIT } from '../../config/noteOperations';

export default function useNotes() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status');
  const filter = !filterValue || filterValue === 'all' ? '' : filterValue;

  const sortByValueRaw = searchParams.get('sortBy') || 'completed';
  const [field, order] = sortByValueRaw.split('-');
  const sortBy = { field, order };

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const { data, isLoading, isSuccess, isError, error } = useGetNotesQuery(
    { page, limit: LIMIT, filter, field: sortBy.field, order: sortBy.order },
    {
      pollingInterval: 150000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  return {
    data: data || {},
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
