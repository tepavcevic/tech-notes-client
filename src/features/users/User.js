import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import { useGetUsersQuery } from './usersApiSlice';

const MemoUser = memo(function User({ userId }) {
  const navigate = useNavigate();
  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const userRoles = user?.roles.join(', ');
  return (
    <tr
      className={`row p-2 border-top ${
        user.active ? 'bg-light' : 'bg-danger opacity-50'
      } rounded`}
    >
      {user && (
        <>
          <td className="col">{user.username}</td>
          <td className="col">{userRoles}</td>
          <td className="col-2">
            <PencilSquareIcon
              role="button"
              height={20}
              width={20}
              onClick={() => navigate(`/dash/users/${userId}`)}
            />
          </td>
        </>
      )}
    </tr>
  );
});

export default MemoUser;
