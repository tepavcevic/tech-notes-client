import { useParams } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import {
  selectNotesResult,
  useGetNotesQuery,
} from '../features/notes/notesApiSlice';
import BackButton from '../components/BackButton';
import FullScreenLoader from '../components/FullScreenLoader';
import NoteDetails from '../features/notes/NoteDetails';
import { useSelector } from 'react-redux';

export default function Note() {
  const { username, isManager, isAdmin } = useAuth();
  const { id } = useParams();
  const v = useSelector(selectNotesResult);
  const { note } = useGetNotesQuery('Note', {
    selectFromResult: ({ data }) => ({
      note: data?.notes?.find((note) => note?._id === id),
    }),
  });

  console.log(v);

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return (
        <div className="heading-2 text-danger text-center my-5">No access</div>
      );
    }
  }
  return (
    <>
      <BackButton to="/dash/notes" />
      {note ? <NoteDetails note={note} /> : <FullScreenLoader />}
    </>
  );
}
