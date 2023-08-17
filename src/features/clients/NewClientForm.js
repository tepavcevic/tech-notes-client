import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useForm, Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import useTitle from '../../hooks/useTitle';
import { useAddNewClientMutation } from './clientsApiSlice';
import BackButton from '../../components/BackButton';

export default function NewClientForm() {
  useTitle('New client');
  const [addNewClient, { isLoading, isSuccess, isError, error }] =
    useAddNewClientMutation();
  const navigate = useNavigate();

  const {
    setError,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  useEffect(() => {
    if (isSuccess) {
      navigate('/dash/clients');
    }
  }, [isSuccess, navigate]);

  const onSubmit = async (data) => {
    await new Promise((res, rej) =>
      setTimeout(() => res(console.log(data)), 2000)
    );
  };

  return (
    <>
      <BackButton />
      <h1 className="mb-5">Add New Client</h1>

      <p className="text-danger">{error?.data?.message}</p>

      <Form className="text-start" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First name</Form.Label>
          <Controller
            control={control}
            name="firstName"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.firstName}
                placeholder="Enter first name"
              />
            )}
          />
          <Form.Text className="text-muted">Login name</Form.Text>
          <Form.Control.Feedback type="invalid">
            {errors.firstName?.message}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">3-20 letters</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                type="email"
                isInvalid={errors.email}
                placeholder="Enter email"
              />
            )}
          />
          <Form.Text className="text-muted">Enter client email</Form.Text>
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            type="submit"
            className="d-flex align-items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-1" />
            )}
            {!isSubmitting && <UserPlusIcon height={18} width={18} />}
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}
