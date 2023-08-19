import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import useTitle from '../../hooks/useTitle';
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice';
import { ROLES } from '../../config/roles';
import ConfirmModal from '../../components/ConfirmModal';

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

export default function EditUserForm({ user }) {
  useTitle('Edit user');
  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);
  const [updateUser, { isLoading, isSuccess, error }] = useUpdateUserMutation();
  const [deleteUser, { isSuccess: isDelSuccess, error: delError }] =
    useDeleteUserMutation();
  const [showModal, setShowModal] = useState(false);
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

    if (isDelSuccess) {
      setUsername('');
      setPassword('');
      setRoles([]);
      navigate('/dash/users');
    }
  }, [isSuccess, isDelSuccess, navigate]);

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
  const handleActiveChange = (event) => setActive(event.target.checked);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleSaveUser = async (event) => {
    event.preventDefault();

    if (password) {
      return updateUser({
        id: user.id,
        username,
        password,
        roles,
        active,
      });
    }

    updateUser({ id: user.id, username, roles, active });
  };

  const handleDeleteUser = (event) => {
    event.preventDefault();

    deleteUser({ id: user.id });
    handleCloseModal();
  };

  const canSave = password
    ? [roles?.length, validUsername, validPassword].every(Boolean) && !isLoading
    : [roles?.length, validUsername].every(Boolean) && !isLoading;

  return (
    <>
      <ConfirmModal
        show={showModal}
        handleDelete={handleDeleteUser}
        message="Are You sure You want to delete this user?"
        handleClose={handleCloseModal}
      />
      <h1 className="mb-5">Edit User</h1>

      <p className="text-danger">
        {(error?.data?.message || delError?.data?.message) ?? ''}
      </p>
      <Form className="form text-start">
        <Form.Group className="mb-3" controlId="username">
          <Form.Label className="fw-bolder">Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
            autoComplete="off"
          />
          <Form.Text className="text-muted">3-20 letters</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="fw-bolder">Password</Form.Label>
          <Form.Control
            name="password"
            type="text"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="off"
          />
          <Form.Text className="text-muted">
            4-20 characters including!@#$%
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bolder">Role(s)</Form.Label>

          {Object.values(ROLES).map((role) => (
            <Form.Check
              type="switch"
              id={role}
              key={role}
              value={role}
              label={role}
              onChange={handleRolesChange}
              checked={roles.includes(role)}
              className="mb-2"
            />
          ))}
        </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label className="fw-bolder">Active status</Form.Label>
          <Form.Check
            id="active"
            type="switch"
            label="Is user active"
            onChange={handleActiveChange}
            checked={active}
          />
        </Form.Group>

        <div className="d-flex justify-content-end align-items-center gap-3">
          <Button
            variant="primary"
            type="submit"
            className="d-flex align-items-center gap-2"
            onClick={handleSaveUser}
            disabled={!canSave}
          >
            <UserPlusIcon height={18} width={18} />
            Submit
          </Button>

          <Button
            variant="danger"
            type="submit"
            className="d-flex align-items-center gap-2"
            onClick={handleShowModal}
          >
            <TrashIcon height={18} width={18} />
            Delete
          </Button>
        </div>
      </Form>
    </>
  );
}
