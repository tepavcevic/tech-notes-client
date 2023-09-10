import { useGetNoteByIdQuery } from './notesApiSlice';

export default function useNote(id) {
  const {
    data: note,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNoteByIdQuery(id, {
    pollingInterval: 150000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  return {
    data: note || {},
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
