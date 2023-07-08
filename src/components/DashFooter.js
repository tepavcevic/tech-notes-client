import { HomeIcon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function DashFooter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <footer className="d-flex flex-column flex-sm-row align-items-center gap-3 gap-lg-5 py-5 px-4 bg-light">
      {pathname !== '/dash' && (
        <Button
          className="btn btn-sm btn-outline d-flex align-items-center gap-2"
          onClick={() => navigate('/dash')}
        >
          Dash <HomeIcon width={18} height={18} />
        </Button>
      )}
      <p className="m-0">
        Current user:<b> placeholder</b>
      </p>
      <p className="m-0">
        User status:<b> placeholder</b>
      </p>
    </footer>
  );
}
