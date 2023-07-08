import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import { selectUserById } from './usersApiSlice';

export default function User({ userId }) {
  const navigate = useNavigate();
  const user = useSelector((state) => selectUserById(state, userId));

  const userRoles = user?.roles.join(', ');
  return (
    <tr
      className={`row p-2 border-top ${
        user.active ? 'bg-light' : 'bg-danger opacity-50'
      } rounded`}
    >
      {user && (
        <>
          <td className="col-4">{user.username}</td>
          <td className="col-5">{userRoles}</td>
          <td className="col-3">
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
}
