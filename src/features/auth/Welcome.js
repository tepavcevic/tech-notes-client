import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

export default function Welcome() {
  const { username, isManager, isAdmin } = useAuth();
  useTitle(`${username}'s dashboard`);

  const date = new Date();
  const today = new Intl.DateTimeFormat('en-UK', {
    dateStyle: 'full',
  }).format(date);

  return (
    <>
      <p className="text-center heading-4 pt-4 m-0">{today}</p>

      <div className="d-flex flex-column align-items-start">
        <h1 className="py-5 m-0">Welcome {username}</h1>

        <Link className="d-block heading-5 btn-link pb-3 mb-2" to="/dash/notes">
          <ArrowLongRightIcon height={20} width={20} /> View tech notes
        </Link>
        <Link
          className="d-block heading-5 btn-link pb-3 mb-2"
          to="/dash/notes/new"
        >
          <ArrowLongRightIcon height={20} width={20} /> Add new tech note
        </Link>
        {(isAdmin || isManager) && (
          <Link
            className="d-block heading-5 btn-link pb-3 mb-2"
            to="/dash/users"
          >
            <ArrowLongRightIcon height={20} width={20} /> View user settings
          </Link>
        )}
        {(isAdmin || isManager) && (
          <Link
            className="d-block heading-5 btn-link pb-3 mb-2"
            to="/dash/users/new"
          >
            <ArrowLongRightIcon height={20} width={20} /> Add new user
          </Link>
        )}
        {(isAdmin || isManager) && (
          <Link
            className="d-block heading-5 btn-link pb-3 mb-2"
            to="/dash/clients"
          >
            <ArrowLongRightIcon height={20} width={20} /> View clients
          </Link>
        )}
        {(isAdmin || isManager) && (
          <Link
            className="d-block heading-5 btn-link pb-3 mb-2"
            to="/dash/clients/new"
          >
            <ArrowLongRightIcon height={20} width={20} /> Add new client
          </Link>
        )}
      </div>
    </>
  );
}
