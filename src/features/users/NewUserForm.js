import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import useTitle from '../../hooks/useTitle';
import { useAddNewUserMutation } from './usersApiSlice';
import { ROLES } from '../../config/roles';
import BackButton from '../../components/BackButton';

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

export default function NewUserForm() {
  useTitle('New user');
  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(['Employee']);
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername('');
      setPassword('');
      setRoles([]);
      navigate('/dash/users');
    }
  }, [isSuccess, navigate]);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleRolesChange = (event) => {
    if (!event.target.checked) {
      return setRoles((prev) =>
        prev.filter((role) => role !== event.target.value)
      );
    }

    setRoles((prev) => [...prev, event.target.value]);
  };

  const canSave =
    [roles?.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSave = (event) => {
    event.preventDefault();

    if (canSave) {
      addNewUser({ username, password, roles });
    }
  };

  return (
    <>
      <BackButton />
      <h1 className="mb-5">Add New User</h1>

      <p className="text-danger">{error?.data?.message}</p>

      <Form className="text-start" onSubmit={onSave}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            minLength={3}
            maxLength={20}
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
            autoComplete="off"
            isInvalid={isError}
          />
          <Form.Text className="text-muted">3-20 letters</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="text"
            minLength={4}
            maxLength={20}
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="off"
            isInvalid={isError}
          />
          <Form.Text className="text-muted">
            4-20 characters including!@#$%
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label>Role(s)</Form.Label>

          {Object.values(ROLES).map((role) => (
            <Form.Check
              type="switch"
              id={role}
              key={role}
              value={role}
              label={role}
              onChange={handleRolesChange}
              checked={roles.includes(role)}
              isInvalid={isError}
            />
          ))}
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            type="submit"
            className="d-flex align-items-center gap-2"
            disabled={!canSave}
          >
            <UserPlusIcon height={18} width={18} />
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}
