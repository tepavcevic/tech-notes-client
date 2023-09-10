import { useParams } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import BackButton from '../components/BackButton';
import FullScreenLoader from '../components/FullScreenLoader';
import NoteDetails from '../features/notes/NoteDetails';
import useNote from '../features/notes/useNote';

export default function Note() {
  const { username, isManager, isAdmin } = useAuth();
  const { id } = useParams();
  const { data } = useNote(id);

  if (!isManager && !isAdmin) {
    if (data.username !== username) {
      return (
        <div className="heading-2 text-danger text-center my-5">No access</div>
      );
    }
  }

  return (
    <>
      <BackButton to="/dash/notes" />
      {data ? <NoteDetails note={data} /> : <FullScreenLoader />}
    </>
  );
}
