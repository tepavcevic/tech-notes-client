import { useState } from 'react';

import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';
import { useGetNotesQuery } from './notesApiSlice';
import Note from './Note';
import BackButton from '../../components/BackButton';
import ViewNoteModal from '../../components/ViewNoteModal';
import FullScreenLoader from '../../components/FullScreenLoader';

export default function NotesList() {
  const [note, setNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useTitle('Notes list');
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
      <h1 className="mb-5">Notes List</h1>
      {isError && error?.data?.message}

      <ViewNoteModal
        note={note}
        show={showModal}
        handleClose={handleCloseModal}
      />

      <table className="w-100 w-lg-75 content-max-width p-4 mx-auto rounded-4 text-start">
        <thead>
          <tr className="row g-2 p-2 bg-light rounded-top shadow-md">
            <th className="col-2">Status</th>
            <th className="col d-none d-md-inline">Created</th>
            <th className="col d-none d-md-inline">Updated</th>
            <th className="col">Title</th>
            <th className="col d-none d-md-inline">Owner</th>
            <th className="col-1">Edit</th>
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
