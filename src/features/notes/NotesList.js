import { useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';
import { useGetNotesQuery } from './notesApiSlice';
import Note from './Note';
import BackButton from '../../components/BackButton';
import ViewNoteModal from '../../components/ViewNoteModal';
import FullScreenLoader from '../../components/FullScreenLoader';

export default function NotesList() {
  useTitle('Notes list');

  const [note, setNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <BackButton />

      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1>Notes List</h1>
        <Link to="new" className="btn-link text-decoration-underline heading-6">
          Add new note
        </Link>
      </div>

      {isError && error?.data?.message}

      <ViewNoteModal
        note={note}
        show={showModal}
        handleClose={handleCloseModal}
      />

      <table className="w-100 w-lg-75 p-4 mx-auto rounded-4 text-start">
        <thead>
          <tr className="row p-2 bg-light rounded-top shadow-md">
            <th className="col-2 col-md">Status</th>
            <th className="col d-none d-md-inline">Created</th>
            <th className="col d-none d-md-inline">Updated</th>
            <th className="col col-md-3 col-lg-5">Title</th>
            <th className="col d-none d-md-inline">Owner</th>
            <th className="col-2 col-md-1">Edit</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            notes?.ids?.length > 0 &&
            filteredIds?.map((noteId) => (
              <Note
                key={noteId}
                setNote={setNote}
                noteId={noteId}
                showModal={handleShowModal}
              />
            ))}
        </tbody>
      </table>
    </>
  );
}
