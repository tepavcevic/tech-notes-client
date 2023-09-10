import { useParams } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { useGetUsersQuery } from '../users/usersApiSlice';
import { useGetClientsQuery } from '../clients/clientsApiSlice';
import EditNoteForm from './EditNoteForm';
import BackButton from '../../components/BackButton';
import FullScreenLoader from '../../components/FullScreenLoader';
import useNote from './useNote';

export default function EditNote() {
  const { username, isManager, isAdmin } = useAuth();
  const { id } = useParams();
  const { data } = useNote(id);
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

  if (!isManager && !isAdmin) {
    if (data.username !== username) {
      return (
        <div className="heading-2 text-danger text-center my-5">No access</div>
      );
    }
  }
  return (
    <>
      <BackButton to={-1} />
      {data && users?.length ? (
        <EditNoteForm
          note={data}
          users={users}
          clients={clients}
          hasDeleteCredentials={isManager || isAdmin}
        />
      ) : (
        <FullScreenLoader />
      )}
    </>
  );
}
