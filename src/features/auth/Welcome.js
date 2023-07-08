import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function Welcome() {
  const date = new Date();
  const today = new Intl.DateTimeFormat('en-UK', {
    dateStyle: 'full',
  }).format(date);
  return (
    <section>
      <p className="text-center heading-4">{today}</p>
      <div className="d-flex flex-column align-items-start gap-4">
        <h1>Welcome</h1>
        <Link className="d-block heading-5 btn-link" to="/dash/notes">
          <ArrowLongRightIcon height={20} width={20} /> View tech notes
        </Link>
        <Link className="d-block heading-5 btn-link" to="/dash/notes/new">
          <ArrowLongRightIcon height={20} width={20} /> Add new tech note
        </Link>
        <Link className="d-block heading-5 btn-link" to="/dash/users">
          <ArrowLongRightIcon height={20} width={20} /> View user settings
        </Link>
        <Link className="d-block heading-5 btn-link" to="/dash/users/new">
          <ArrowLongRightIcon height={20} width={20} /> Add new user
        </Link>
      </div>
    </section>
  );
}
