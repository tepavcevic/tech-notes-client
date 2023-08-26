import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import useTitle from '../../hooks/useTitle';
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice';
import { ROLES } from '../../config/roles';
import ConfirmModal from '../../components/ConfirmModal';
import { useDispatch } from 'react-redux';
import { useRefreshMutation } from '../auth/authApiSlice';
import { setCredentials } from '../auth/authSlice';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function EditUserForm({ user }) {
  useTitle('Edit user');

  const [roles, setRoles] = useState(user.roles);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [refresh, { isLoading: isRefreshingToken }] = useRefreshMutation();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: 'all' });

  const handleRolesChange = (event) => {
    if (!event.target.checked) {
      return setRoles((prev) =>
        prev.filter((role) => role !== event.target.value)
      );
    }

    setRoles((prev) => [...prev, event.target.value]);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    const { username, password, active } = data;

    try {
      const { accessToken } = await refresh().unwrap();
      dispatch(setCredentials({ accessToken }));

      if (password.length === 0) {
        await updateUser({ id: user.id, username, active, roles }).unwrap();
      } else {
        await updateUser({ id: user.id, ...data, roles }).unwrap();
      }

      toast.success('User edited successfully');
      reset();
      navigate('/dash/users');
    } catch (error) {
      if (!error.status) {
        toast.error('No server response');
      } else if (error.status === 400) {
        toast.error('Missing fields or wrong data format');
      } else {
        toast.error(error?.data?.message);
      }
    }
  };

  const onDeleteUser = async (event) => {
    event.preventDefault();
    try {
      const { accessToken } = await refresh().unwrap();
      dispatch(setCredentials({ accessToken }));

      await deleteUser({ id: user.id }).unwrap();

      handleCloseModal();
      toast.success('User deleted successfully');
      navigate('/dash/users');
    } catch (error) {
      handleCloseModal();
      if (!error.status) {
        toast.error('No server response');
      } else if (error.status === 400) {
        toast.error('Missing fields or wrong data format');
      } else if (error.status === 409) {
        toast.error('This user has open notes.');
      } else {
        toast.error(error?.data?.message);
      }
    }
  };

  const canSave =
    isValid &&
    !isLoading &&
    !isSubmitting &&
    !isRefreshingToken &&
    roles.length > 0;

  return (
    <>
      <ConfirmModal
        show={showModal}
        handleDelete={onDeleteUser}
        message="Are You sure You want to delete this user?"
        handleClose={handleCloseModal}
      />
      <h1 className="mb-5">Edit User</h1>

      <Form className="form text-start" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label className="fw-bolder">Username (*)</Form.Label>
          <Controller
            control={control}
            name="username"
            defaultValue={user.username}
            rules={{
              required: { value: true, message: 'This field is required' },
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must be at most 20 characters',
              },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.username}
                placeholder="Enter username"
                autoComplete="off"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username?.message}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">3-20 letters</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="fw-bolder">Password</Form.Label>
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              required: { value: false },
              minLength: {
                value: 4,
                message: 'Password must be at least 4 characters',
              },
              maxLength: {
                value: 20,
                message: 'Password must be at most 20 characters',
              },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.password}
                placeholder="Enter password"
                autoComplete="off"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            4-20 characters including!@#$%
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bolder">Role(s) (*)</Form.Label>

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
          <Form.Label className="fw-bolder">Active status (*)</Form.Label>
          <Controller
            control={control}
            name="active"
            defaultValue={user.active}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Check
                onChange={onChange}
                checked={value}
                ref={ref}
                name="active"
                id="active"
                type="switch"
                label="Is user active"
                className="mb-2"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.active?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-end align-items-center gap-3">
          <Button
            variant="primary"
            type="submit"
            className="d-flex align-items-center gap-2"
            onClick={handleSubmit}
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
