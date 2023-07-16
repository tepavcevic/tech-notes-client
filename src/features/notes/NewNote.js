import PulseLoader from 'react-spinners/PulseLoader';

import { useGetUsersQuery } from '../users/usersApiSlice';
import NewNoteForm from './NewNoteForm';

export default function NewNote() {
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids
        .map((id) => data?.entities[id])
        .filter((user) => user?.active),
    }),
  });
  return (
    <>{users.length === 0 ? <PulseLoader /> : <NewNoteForm users={users} />}</>
  );
}
