import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PulseLoader from 'react-spinners/PulseLoader';

import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';

export default function Login() {
  const userRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [persist, setPersist] = usePersist();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleToggle = () => setPersist((prev) => !prev);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername('');
      setPassword('');
      navigate('/dash');
    } catch (error) {
      if (!error.status) {
        setErrorMessage('No server response');
      } else if (error.status === 400) {
        setErrorMessage('Missing username or password');
      } else if (error.status === 401) {
        setErrorMessage('Unauthorized');
      } else {
        setErrorMessage(error?.data?.message);
      }
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage('');
  }, [username, password]);

  return (
    <>
      {isLoading && <PulseLoader />}
      {!isLoading && (
        <section>
          <header className="px-header py-5 px-2">
            <h3 className="m-0">Employee Login</h3>
          </header>

          <Container className="main-content w-100 w-md-75">
            <p className="text-danger">{errorMessage}</p>
            <Form onSubmit={handleSubmit} className="content-max-width mx-auto">
              <Form.Group className="mb-3" controlId="username">
                <Form.Label className="fw-bolder">Username</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  minLength={3}
                  maxLength={20}
                  ref={userRef}
                  placeholder="Username"
                  value={username}
                  onChange={handleUsername}
                  autoComplete="off"
                  required
                  isInvalid={!!errorMessage}
                />
                <Form.Text className="text-muted">3-20 letters</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label className="fw-bolder">Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  minLength={4}
                  maxLength={20}
                  placeholder="Password"
                  value={password}
                  onChange={handlePassword}
                  autoComplete="off"
                  required
                  isInvalid={!!errorMessage}
                />
                <Form.Text className="text-muted">
                  4-20 characters including!@#$%
                </Form.Text>
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mt-5">
                <Form.Group controlId="persist">
                  <Form.Label className="fw-bolder">
                    Trust this device
                  </Form.Label>
                  <Form.Check
                    name="perist"
                    type="switch"
                    onChange={handleToggle}
                    checked={persist}
                  />
                </Form.Group>

                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </Container>

          <footer className="px-footer py-5 px-2 bg-light">
            <Link to="/" className="paragraph-2">
              Back to Home
            </Link>
          </footer>
        </section>
      )}
    </>
  );
}
