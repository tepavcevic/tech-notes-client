import { useParams } from 'react-router-dom';

import useTitle from '../../hooks/useTitle';
import { useGetUsersQuery } from './usersApiSlice';
import EditUserForm from './EditUserForm';
import BackButton from '../../components/BackButton';
import FullScreenLoader from '../../components/FullScreenLoader';

export default function EditUser() {
  useTitle('Edit user');
  const { id } = useParams();

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  return (
    <>
      <BackButton to="/dash/users" />
      {user ? <EditUserForm user={user} /> : <FullScreenLoader />}
    </>
  );
}
