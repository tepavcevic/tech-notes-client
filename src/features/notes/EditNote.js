import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectNoteById } from './notesApiSlice';
import { selectAllUsers } from '../users/usersApiSlice';
import EditNoteForm from './EditNoteForm';

export default function EditNote() {
  const params = useParams();
  const note = useSelector((state) => selectNoteById(state, params?.id));
  const users = useSelector(selectAllUsers);
  return (
    <>
      {note && users.length ? (
        <EditNoteForm note={note} users={users} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
