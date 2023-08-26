import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserPlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import useTitle from '../../hooks/useTitle';
import { setCredentials } from '../auth/authSlice';
import {
  useUpdateClientMutation,
  useDeleteClientMutation,
} from './clientsApiSlice';
import { useRefreshMutation } from '../auth/authApiSlice';
import ConfirmModal from '../../components/ConfirmModal';
import Map from '../../components/Map';

export default function EditClientForm({ client }) {
  useTitle('Edit client');

  const [updateClient, { isLoading }] = useUpdateClientMutation();
  const [deleteClient, { isLoading: delLoading }] = useDeleteClientMutation();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();
  const [mapPosition, setMapPosition] = useState([
    client.position?.lat || 43.82297882218348,
    client.position?.lng || 18.36547136306763,
  ]);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: 'all' });

  const canSave = !isLoading || !delLoading || isValid || !isSubmitting;

  const handlePositionChange = (newPosition) => {
    setMapPosition(newPosition);
  };
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    try {
      const { accessToken } = await refresh().unwrap();
      dispatch(setCredentials({ accessToken }));

      await updateClient({
        ...data,
        id: client.id,
        position: {
          lat: mapPosition[0].toString(),
          lng: mapPosition[1].toString(),
        },
      }).unwrap();

      toast.success('Client edited successfully');
      reset();
      navigate('/dash/clients');
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

  const onDeleteClient = async (event) => {
    event.preventDefault();
    try {
      const { accessToken } = await refresh().unwrap();
      dispatch(setCredentials({ accessToken }));

      await deleteClient({ id: client.id }).unwrap();

      handleCloseModal();
      toast.success('Client deleted successfully');
      navigate('/dash/clients');
    } catch (error) {
      handleCloseModal();
      if (!error.status) {
        toast.error('No server response');
      } else if (error.status === 400) {
        toast.error('Missing fields or wrong data format');
      } else if (error.status === 409) {
        toast.error('This client has open notes.');
      } else {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <>
      <h1 className="mb-5">Edit Client</h1>

      <ConfirmModal
        show={showModal}
        handleDelete={onDeleteClient}
        message="Are You sure You want to delete this client?"
        handleClose={handleCloseModal}
      />

      <Form className="form text-start" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First name (*)</Form.Label>
          <Controller
            control={control}
            name="firstName"
            defaultValue={client.firstName}
            rules={{
              required: { value: true, message: 'This field is required' },
              minLength: {
                value: 3,
                message: 'First name must be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'First name must be at most 20 characters',
              },

              pattern: {
                value: /^[a-zA-Zа-яА-ЯćčđšžĆČĐŠŽ'-]+$|^[p{L}ćčđšžĆČĐŠŽ'-]+$/,
                message: 'First name must be letters only',
              },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.firstName}
                placeholder="Enter first name"
                autoComplete="off"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last name (*)</Form.Label>
          <Controller
            control={control}
            name="lastName"
            defaultValue={client.lastName}
            rules={{
              required: { value: true, message: 'This field is required' },
              minLength: {
                value: 3,
                message: 'Last name must be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Last name must be at most 20 characters',
              },
              pattern: {
                value: /^[a-zA-Zа-яА-ЯćčđšžĆČĐŠŽ'-]+$|^[p{L}ćčđšžĆČĐŠŽ'-]+$/,
                message: 'Last name must be letters only',
              },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.lastName}
                placeholder="Enter last name"
                autoComplete="off"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="IDnumber">
          <Form.Label>ID number (*)</Form.Label>
          <Controller
            control={control}
            name="IDnumber"
            defaultValue={client.IDnumber}
            rules={{
              required: { value: true, message: 'This field is required' },
              minLength: {
                value: 9,
                message: 'ID number must be 9 characters',
              },
              maxLength: {
                value: 9,
                message: 'ID number must be 9 characters',
              },
              pattern: {
                value: /^[A-Z0-9]+$/,
                message: 'ID number must be letters and numbers only',
              },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.IDnumber}
                placeholder="Enter ID number"
                autoComplete="off"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.IDnumber?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Controller
            control={control}
            name="email"
            defaultValue={client.email}
            rules={{
              required: { value: true, message: 'This field is required' },
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Invalid email address',
              },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.email}
                placeholder="Enter email"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone number (*)</Form.Label>
          <Controller
            control={control}
            name="phone"
            defaultValue={client.phone}
            rules={{
              required: { value: true, message: 'This field is required' },
              minLength: {
                value: 9,
                message: 'Phone number must be at least 9 characters',
              },
              maxLength: {
                value: 15,
                message: 'Phone number must be at most 15 characters',
              },
              pattern: {
                value: /^[0-9]+$/,
                message: 'Invalid phone number',
              },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.phone}
                placeholder="Enter phone number"
                autoComplete="off"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="street">
          <Form.Label>Street (*)</Form.Label>
          <Controller
            control={control}
            name="street"
            defaultValue={client.street}
            rules={{
              required: { value: true, message: 'This field is required' },
              maxLength: {
                value: 64,
                message: 'Street name and number must be at most 64 characters',
              },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.street}
                placeholder="Enter street name and number"
                autoComplete="off"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.street?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City (*)</Form.Label>
          <Controller
            control={control}
            name="city"
            defaultValue={client.city}
            rules={{
              required: { value: true, message: 'This field is required' },
              maxLength: {
                value: 64,
                message: 'City name must be at most 64 characters',
              },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.city}
                placeholder="Enter city"
                autoComplete="off"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.city?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Map
          initialPosition={mapPosition}
          onPositionChange={handlePositionChange}
        />

        <Form.Group className="mb-5">
          <Form.Label className="fw-bolder">Active status</Form.Label>
          <Controller
            control={control}
            name="active"
            defaultValue={client.active}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Check
                onChange={onChange}
                checked={value}
                ref={ref}
                name="active"
                type="switch"
                value={value}
                defaultChecked={client.active}
                label="Is client active"
              />
            )}
          />
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
