import { useSelector } from 'react-redux';

import { selectAllUsers } from '../users/usersApiSlice';
import NewNoteForm from './NewNoteForm';

export default function NewNote() {
  const users = useSelector(selectAllUsers);
  return (
    <>
      {users.length === 0 && <div>Currently unavailable</div>}
      {users.length > 0 && <NewNoteForm users={users} />}
    </>
  );
}
