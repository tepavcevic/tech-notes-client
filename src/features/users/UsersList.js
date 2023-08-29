import { Link } from 'react-router-dom';

import useTitle from '../../hooks/useTitle';
import { useGetUsersQuery } from './usersApiSlice';
import User from './User';
import BackButton from '../../components/BackButton';
import FullScreenLoader from '../../components/FullScreenLoader';

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

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <BackButton to="/dash" />

      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1>Users List</h1>
        <Link to="new" className="btn-link text-decoration-underline heading-6">
          Add new user
        </Link>
      </div>

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
            users?.ids?.length > 0 &&
            users.ids?.map((userId) => <User key={userId} userId={userId} />)}
        </tbody>
      </table>
    </>
  );
}
