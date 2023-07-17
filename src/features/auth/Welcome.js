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
    <section className="mb-5">
      <p className="text-center heading-4 my-5">{today}</p>
      <div className="d-flex flex-column align-items-start gap-4 pb-5">
        <h1 className="my-5">Welcome {username}</h1>
        <Link className="d-block heading-5 btn-link" to="/dash/notes">
          <ArrowLongRightIcon height={20} width={20} /> View tech notes
        </Link>
        <Link className="d-block heading-5 btn-link" to="/dash/notes/new">
          <ArrowLongRightIcon height={20} width={20} /> Add new tech note
        </Link>
        {(isAdmin || isManager) && (
          <Link className="d-block heading-5 btn-link" to="/dash/users">
            <ArrowLongRightIcon height={20} width={20} /> View user settings
          </Link>
        )}
        {(isAdmin || isManager) && (
          <Link className="d-block heading-5 btn-link" to="/dash/users/new">
            <ArrowLongRightIcon height={20} width={20} /> Add new user
          </Link>
        )}
      </div>
    </section>
  );
}
