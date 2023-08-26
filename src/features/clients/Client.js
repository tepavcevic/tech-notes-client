import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import { useGetClientsQuery } from './clientsApiSlice';

const MemoClient = memo(function Client({ clientId }) {
  const navigate = useNavigate();
  const { client } = useGetClientsQuery('clientsList', {
    selectFromResult: ({ data }) => ({
      client: data?.entities[clientId],
    }),
  });

  return (
    <tr
      className={`row p-2 border-top ${
        client.active ? 'bg-light' : 'inactive text-secondary'
      } rounded`}
    >
      {client && (
        <>
          <td className="col">{client.firstName}</td>
          <td className="col">{client.lastName}</td>
          <td className="col-4 d-none d-md-inline">
            {client.street}, {client.city}
          </td>
          <td className="col d-none d-md-inline">{client.phone}</td>
          <td className="col-2 col-md-1">
            <PencilSquareIcon
              role="button"
              height={20}
              width={20}
              onClick={() => navigate(`/dash/clients/${clientId}`)}
            />
          </td>
        </>
      )}
    </tr>
  );
});

export default MemoClient;
