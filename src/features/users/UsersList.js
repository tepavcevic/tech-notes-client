import { useGetUsersQuery } from './usersApiSlice';
import User from './User';

export default function UsersList() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(null, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  return (
    <>
      <h1 className="my-5">Users List</h1>
      {isLoading && <div>Loading...</div>}
      {isError && error?.data?.message}

      <table className="w-100 w-lg-75 p-4 mx-auto rounded-4 text-start">
        <thead>
          <tr className="row py-2 bg-light rounded-top shadow-md">
            <th className="col-4">Username</th>
            <th className="col-5">Roles</th>
            <th className="col-3">Edit</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            !!users?.ids.length &&
            users.ids.map((userId) => <User key={userId} userId={userId} />)}
        </tbody>
      </table>
    </>
  );
}
