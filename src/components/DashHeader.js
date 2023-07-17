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
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

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
        <>
          <header className="px-header border-bottom">
            <Navbar expand={'lg'} collapseOnSelect>
              <Container fluid>
                <Navbar.Brand>
                  <Link className="text-danger text-decoration-none" to="/dash">
                    <h2 className="paragraph-1 mb-0">Tech Notes</h2>
                  </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-lg`}
                  className="offcanvas-nav"
                  aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                      <Link
                        className="text-danger text-decoration-none"
                        to="/dash"
                      >
                        <h2 className="paragraph-1 mb-0">Tech Notes</h2>
                      </Link>
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      {!isLoading && (
                        <Nav.Link eventKey={1}>
                          <NavButton link="/dash/notes">
                            <DocumentTextIcon height={28} />
                            <span>Notes</span>
                          </NavButton>
                        </Nav.Link>
                      )}
                      {!isLoading && (
                        <Nav.Link eventKey={2}>
                          <NavButton link="/dash/notes/new">
                            <DocumentPlusIcon height={28} />
                            <span>New note</span>
                          </NavButton>
                        </Nav.Link>
                      )}
                      {(isManager || isAdmin) && !isLoading && (
                        <Nav.Link eventKey={3}>
                          <NavButton link="/dash/users">
                            <UsersIcon height={28} />
                            <span>Users</span>
                          </NavButton>
                        </Nav.Link>
                      )}
                      {(isManager || isAdmin) && !isLoading && (
                        <Nav.Link eventKey={4}>
                          <NavButton link="/dash/users/new">
                            <UserPlusIcon height={28} />
                            <span>New user</span>
                          </NavButton>
                        </Nav.Link>
                      )}
                      <Nav.Link eventKey={5}>
                        <span
                          className="btn-link d-flex flex-lg-column gap-4 gap-lg-1 ms-lg-5"
                          onClick={() => sendLogout()}
                        >
                          <ArrowRightOnRectangleIcon height={28} />
                          <span>Logout</span>
                        </span>
                      </Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>

            <div className="d-none d-lg-flex justify-content-between align-items-center px-4">
              <nav className="d-flex gap-3"></nav>
            </div>
          </header>
        </>
      )}
    </>
  );
}
