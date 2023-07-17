import { HomeIcon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import useAuth from '../hooks/useAuth';

export default function DashFooter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { username, status } = useAuth();

  return (
    <footer className="px-footer d-flex flex-column flex-sm-row align-items-center gap-3 gap-lg-5 py-5 px-4 bg-light">
      {pathname !== '/dash' ? (
        <Button
          className="btn btn-sm btn-outline d-flex align-items-center gap-2"
          onClick={() => navigate('/dash')}
        >
          Dash <HomeIcon width={18} height={18} />
        </Button>
      ) : (
        <div style={{ width: 102 }}></div>
      )}
      <p className="m-0">
        Current user: <b>{username}</b>
      </p>
      <p className="m-0">
        User status: <b>{status}</b>
      </p>
    </footer>
  );
}
