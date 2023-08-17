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
      <BackButton />
      <h1 className="mb-5">Clients List</h1>
      {isError && error?.data?.message}

      <table className="w-100 w-lg-75 p-4 mx-auto rounded-4 text-start">
        <thead>
          <tr className="row p-2 bg-light rounded-top shadow-md">
            <th className="col">Clientname</th>
            <th className="col">Roles</th>
            <th className="col-2">Edit</th>
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
