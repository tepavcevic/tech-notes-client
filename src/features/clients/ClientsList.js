import { Link } from 'react-router-dom';

import useTitle from '../../hooks/useTitle';
import { useGetClientsQuery } from './clientsApiSlice';
import Client from './Client';
import BackButton from '../../components/BackButton';
import FullScreenLoader from '../../components/FullScreenLoader';

export default function ClientsList() {
  useTitle('Clients list');
  const {
    data: clients,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetClientsQuery('clientsList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <BackButton to="/dash" />

      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1>Clients List</h1>
        <Link to="new" className="btn-link text-decoration-underline heading-6">
          Add new client
        </Link>
      </div>

      {isError && error?.data?.message}

      <table className="w-100 w-lg-75 p-4 mx-auto rounded-4 text-start">
        <thead>
          <tr className="row p-2 bg-light rounded-top shadow-md">
            <th className="col">First name</th>
            <th className="col">Last name</th>
            <th className="col-4 d-none d-md-inline">Address</th>
            <th className="col d-none d-md-inline">Phone</th>
            <th className="col-2 col-md-1">Edit</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            clients?.ids?.length > 0 &&
            clients.ids?.map((clientId) => (
              <Client key={clientId} clientId={clientId} />
            ))}
        </tbody>
      </table>
    </>
  );
}
