import { useGetUsersQuery } from '../users/usersApiSlice';
import { useGetClientsQuery } from '../clients/clientsApiSlice';
import NewNoteForm from './NewNoteForm';
import BackButton from '../../components/BackButton';
import FullScreenLoader from '../../components/FullScreenLoader';

export default function NewNote() {
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids
        .map((id) => data?.entities[id])
        .filter((user) => user?.active),
    }),
  });
  const { clients } = useGetClientsQuery('clientsList', {
    selectFromResult: ({ data }) => ({
      clients: data?.ids
        .map((id) => data?.entities[id])
        .filter((client) => client?.active),
    }),
  });
  return (
    <>
      <BackButton />
      {users?.length === 0 ? (
        <FullScreenLoader />
      ) : (
        <NewNoteForm users={users} clients={clients} />
      )}
    </>
  );
}
