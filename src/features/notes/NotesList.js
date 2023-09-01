import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';
import useNotes from './useNotes';
import NoteTableRow from './NoteTableRow';
import BackButton from '../../components/BackButton';
import FullScreenLoader from '../../components/FullScreenLoader';
import NoteTableOperations from './NoteTableOperations';
import TablePagination from '../../components/TablePagination';

export default function NotesList() {
  useTitle('Notes list');

  const {
    data: { notes, totalCount },
    isLoading,
    isSuccess,
    isError,
    error,
  } = useNotes();

  const { username, isManager, isAdmin } = useAuth();
  const filteredNotes =
    isAdmin || isManager
      ? notes
      : notes?.filter((note) => note.username === username);

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <BackButton to="/dash" />

      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1>Notes List</h1>
        <Link to="new" className="btn btn-outline btn-xs text heading-6">
          Add new note
        </Link>
      </div>

      {isError && error?.data?.message}

      <NoteTableOperations />

      <table className="w-100 w-lg-75 p-4 mx-auto rounded-4 text-start">
        <thead>
          <tr className="row p-2 bg-light rounded-top shadow-md">
            <th className="col-2 col-md">Status</th>
            <th className="col d-none d-md-inline">Created</th>
            <th className="col d-none d-md-inline">Updated</th>
            <th className="col col-md-3 col-lg-5">Title</th>
            <th className="col d-none d-md-inline">Owner</th>
            <th className="col-2 col-md-1 text-center">Edit</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            notes?.length > 0 &&
            filteredNotes?.map((note) => (
              <NoteTableRow key={note._id} note={note} />
            ))}
        </tbody>
      </table>

      <TablePagination count={totalCount} />
    </>
  );
}
