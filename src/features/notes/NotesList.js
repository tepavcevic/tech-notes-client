import PulseLoader from 'react-spinners/PulseLoader';

import { useGetNotesQuery } from './notesApiSlice';
import Note from './Note';
import useAuth from '../../hooks/useAuth';

export default function NotesList() {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery('notesList', {
    pollingInterval: 150000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const { username, isManager, isAdmin } = useAuth();
  const filteredIds =
    isAdmin || isManager
      ? notes?.ids
      : notes?.ids?.filter(
          (noteId) => notes?.entities[noteId].username === username
        );

  return (
    <>
      <h1 className="my-5">Notes List</h1>
      {isLoading && <PulseLoader />}
      {isError && error?.data?.message}

      <table className="w-100 w-lg-75 p-4 mx-auto rounded-4 text-start">
        <thead>
          <tr className="row py-2 bg-light rounded-top shadow-md">
            <th className="col">Username</th>
            <th className="col d-none d-md-inline">Created</th>
            <th className="col d-none d-md-inline">Updated</th>
            <th className="col">Title</th>
            <th className="col d-none d-md-inline">Owner</th>
            <th className="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            notes?.ids.length > 0 &&
            filteredIds?.map((noteId) => <Note key={noteId} noteId={noteId} />)}
        </tbody>
      </table>
    </>
  );
}
