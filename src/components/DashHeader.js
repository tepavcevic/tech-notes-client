import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRightOnRectangleIcon,
  DocumentPlusIcon,
  DocumentTextIcon,
  UserPlusIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import PulseLoader from 'react-spinners/PulseLoader';

import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../hooks/useAuth';
import NavButton from './NavButton';

export default function DashHeader() {
  const navigate = useNavigate();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const { isManager, isAdmin } = useAuth();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  return (
    <>
      {isLoading && <PulseLoader />}
      {isError && (
        <div className="text-danger">Error: {error?.data?.message}</div>
      )}
      {!isLoading && !isError && (
        <header className="px-header border-bottom">
          <div className="d-flex justify-content-between align-items-center px-4">
            <Link className="text-danger text-decoration-none" to="/dash">
              <h1>Tech Notes</h1>
            </Link>

            <nav className="d-flex gap-3">
              {!isLoading && (
                <NavButton link="/dash/notes">
                  <DocumentTextIcon height={28} />
                  <span>Notes</span>
                </NavButton>
              )}
              {!isLoading && (
                <NavButton link="/dash/notes/new">
                  <DocumentPlusIcon height={28} />
                  <span>New note</span>
                </NavButton>
              )}
              {(isManager || isAdmin) && !isLoading && (
                <NavButton link="/dash/users">
                  <UsersIcon height={28} />
                  <span>Users</span>
                </NavButton>
              )}
              {(isManager || isAdmin) && !isLoading && (
                <NavButton link="/dash/users/new">
                  <UserPlusIcon height={28} />
                  <span>New user</span>
                </NavButton>
              )}
              <span
                className="btn-link d-flex flex-column ms-5"
                onClick={() => sendLogout()}
              >
                <ArrowRightOnRectangleIcon height={28} />
                <span>Logout</span>
              </span>
            </nav>
          </div>
        </header>
      )}
    </>
  );
}
