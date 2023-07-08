import { useSelector } from 'react-redux';

import { selectAllUsers } from '../users/usersApiSlice';
import NewNoteForm from './NewNoteForm';

export default function NewNote() {
  const users = useSelector(selectAllUsers);
  return <>{users ? <NewNoteForm users={users} /> : <div>Loading...</div>}</>;
}
