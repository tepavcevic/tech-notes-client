import { useParams } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

import useTitle from '../../hooks/useTitle';
import { useGetUsersQuery } from './usersApiSlice';
import EditUserForm from './EditUserForm';

export default function EditUser() {
  useTitle('Edit user');
  const { id } = useParams();

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  return <>{user ? <EditUserForm user={user} /> : <PulseLoader />}</>;
}
