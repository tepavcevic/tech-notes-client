import PulseLoader from 'react-spinners/PulseLoader';

import useTitle from '../../hooks/useTitle';
import { useGetUsersQuery } from './usersApiSlice';
import User from './User';
import BackButton from '../../components/BackButton';

export default function UsersList() {
  useTitle('Users list');
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery('usersList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  return (
    <>
      <BackButton url="/dash" />
      <h1 className="mb-5">Users List</h1>
      {isLoading && <PulseLoader />}
      {isError && error?.data?.message}

      <table className="w-100 w-lg-75 p-4 mx-auto rounded-4 text-start">
        <thead>
          <tr className="row p-2 bg-light rounded-top shadow-md">
            <th className="col">Username</th>
            <th className="col">Roles</th>
            <th className="col-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            users?.ids.length > 0 &&
            users.ids.map((userId) => <User key={userId} userId={userId} />)}
        </tbody>
      </table>
    </>
  );
}
