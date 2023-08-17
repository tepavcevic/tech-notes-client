import { useParams } from 'react-router-dom';

import useTitle from '../../hooks/useTitle';
import { useGetClientsQuery } from './clientsApiSlice';
import EditClientForm from './EditClientForm';
import BackButton from '../../components/BackButton';
import FullScreenLoader from '../../components/FullScreenLoader';

export default function EditClient() {
  useTitle('Edit client');
  const { id } = useParams();

  const { client } = useGetClientsQuery('clientsList', {
    selectFromResult: ({ data }) => ({
      client: data?.entities[id],
    }),
  });

  return (
    <>
      <BackButton />
      {client ? <EditClientForm client={client} /> : <FullScreenLoader />}
    </>
  );
}
