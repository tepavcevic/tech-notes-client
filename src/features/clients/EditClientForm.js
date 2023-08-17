import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import useTitle from '../../hooks/useTitle';
import {
  useUpdateClientMutation,
  useDeleteClientMutation,
} from './clientsApiSlice';
import { ROLES } from '../../config/roles';
import ConfirmModal from '../../components/ConfirmModal';

const CLIENT_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

export default function EditClientForm({ client }) {
  useTitle('Edit client');
  const [clientname, setClientname] = useState(client.clientname);
  const [validClientname, setValidClientname] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(client.roles);
  const [active, setActive] = useState(client.active);
  const [updateClient, { isLoading, isSuccess, error }] =
    useUpdateClientMutation();
  const [deleteClient, { isSuccess: isDelSuccess, error: delError }] =
    useDeleteClientMutation();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setValidClientname(CLIENT_REGEX.test(clientname));
  }, [clientname]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setClientname('');
      setPassword('');
      setRoles([]);
      navigate('/dash/clients');
    }

    if (isDelSuccess) {
      setClientname('');
      setPassword('');
      setRoles([]);
      navigate('/dash/clients');
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handleClientnameChange = (event) => setClientname(event.target.value);
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

  const handleSaveClient = async (event) => {
    event.preventDefault();

    if (password) {
      return updateClient({
        id: client.id,
        clientname,
        password,
        roles,
        active,
      });
    }

    updateClient({ id: client.id, clientname, roles, active });
  };

  const handleDeleteClient = (event) => {
    event.preventDefault();

    deleteClient({ id: client.id });
    handleCloseModal();
  };

  const canSave = password
    ? [roles?.length, validClientname, validPassword].every(Boolean) &&
      !isLoading
    : [roles?.length, validClientname].every(Boolean) && !isLoading;

  return (
    <>
      <ConfirmModal
        show={showModal}
        handleDelete={handleDeleteClient}
        message="Are You sure You want to delete this client?"
        handleClose={handleCloseModal}
      />
      <h1 className="mb-5">Edit Client</h1>

      <p className="text-danger">
        {(error?.data?.message || delError?.data?.message) ?? ''}
      </p>
      <Form className="text-start">
        <Form.Group className="mb-3" controlId="clientname">
          <Form.Label className="fw-bolder">Clientname</Form.Label>
          <Form.Control
            name="clientname"
            type="text"
            placeholder="Enter clientname"
            value={clientname}
            onChange={handleClientnameChange}
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
            label="Is client active"
            onChange={handleActiveChange}
            checked={active}
          />
        </Form.Group>

        <div className="d-flex justify-content-end align-items-center gap-3">
          <Button
            variant="primary"
            type="submit"
            className="d-flex align-items-center gap-2"
            onClick={handleSaveClient}
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
