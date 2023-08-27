import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import useTitle from '../../hooks/useTitle';
import useRefreshCredentials from '../../hooks/useRefreshCredentials';
import { useAddNewUserMutation } from './usersApiSlice';
import BackButton from '../../components/BackButton';
import { ROLES } from '../../config/roles';

export default function NewUserForm() {
  useTitle('New user');

  const [roles, setRoles] = useState(['Employee']);
  const [addNewUser, { isLoading }] = useAddNewUserMutation();
  const { refreshToken, isRefreshingToken } = useRefreshCredentials();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: 'all' });

  const canSave = isValid && !isLoading && !isSubmitting && roles.length > 0;

  const handleRolesChange = (event) => {
    if (!event.target.checked) {
      return setRoles((prev) =>
        prev.filter((role) => role !== event.target.value)
      );
    }

    setRoles((prev) => [...prev, event.target.value]);
  };

  const onSubmit = async (data) => {
    try {
      await refreshToken();

      await addNewUser({ ...data, roles }).unwrap();

      toast.success('User added successfully');
      reset();
      navigate('/dash/users');
    } catch (error) {
      if (!error.status) {
        toast.error('No server response');
      } else if (error.status === 400) {
        toast.error('Missing fields or wrong data format');
      } else if (error.status === 409) {
        toast.error('Username already exists');
      } else {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <>
      <BackButton />
      <h1 className="mb-5">Add New User</h1>

      <Form className="form text-start" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username (*)</Form.Label>
          <Controller
            control={control}
            name="username"
            defaultValue=""
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
          <Form.Label>Password (*)</Form.Label>
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              required: { value: true, message: 'This field is required' },
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
        <Form.Group className="mb-5">
          <Form.Label>Role(s) (*)</Form.Label>

          {Object.values(ROLES).map((role) => (
            <Form.Check
              type="switch"
              id={role}
              key={role}
              value={role}
              label={role}
              onChange={handleRolesChange}
              checked={roles.includes(role)}
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
            {isSubmitting || isLoading || isRefreshingToken ? (
              <>
                <span className="spinner-border spinner-border-sm mr-1" />{' '}
                Submit
              </>
            ) : (
              <>
                <UserPlusIcon height={18} width={18} /> Submit
              </>
            )}
          </Button>
        </div>
      </Form>
    </>
  );
}
