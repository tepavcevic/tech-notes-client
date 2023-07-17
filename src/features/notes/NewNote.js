import PulseLoader from 'react-spinners/PulseLoader';

import { useGetUsersQuery } from '../users/usersApiSlice';
import NewNoteForm from './NewNoteForm';
import BackButton from '../../components/BackButton';

export default function NewNote() {
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids
        .map((id) => data?.entities[id])
        .filter((user) => user?.active),
    }),
  });
  return (
    <>
      <BackButton url="/dash/notes" />
      {users.length === 0 ? <PulseLoader /> : <NewNoteForm users={users} />}
    </>
  );
}
