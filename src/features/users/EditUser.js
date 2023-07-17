import { useParams } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

import useTitle from '../../hooks/useTitle';
import { useGetUsersQuery } from './usersApiSlice';
import EditUserForm from './EditUserForm';
import BackButton from '../../components/BackButton';

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
      <BackButton url="/dash/users" />
      {user ? <EditUserForm user={user} /> : <PulseLoader />}
    </>
  );
}
