import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import useTitle from '../../hooks/useTitle';
import useRefreshCredentials from '../../hooks/useRefreshCredentials';
import { useAddNewClientMutation } from './clientsApiSlice';
import BackButton from '../../components/BackButton';
import Map from '../../components/Map';

export default function NewClientForm() {
  useTitle('New client');

  const [addNewClient, { isLoading }] = useAddNewClientMutation();
  const { refreshToken, isRefreshingToken } = useRefreshCredentials();
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([
    43.82297882218348, 18.36547136306763,
  ]);

  const handlePositionChange = (newPosition) => {
    setMapPosition(newPosition);
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: 'all' });

  const canSave = !isLoading && !isSubmitting && isValid && !isRefreshingToken;

  const onSubmit = async (data) => {
    try {
      await refreshToken();
      await addNewClient({
        ...data,
        position: {
          lat: mapPosition[0].toString(),
          lng: mapPosition[1].toString(),
        },
      }).unwrap();

      toast.success('Client added successfully');
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

  return (
    <>
      <BackButton />
      <h1 className="mb-5">Add New Client</h1>

      <Form className="form text-start" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First name (*)</Form.Label>
          <Controller
            control={control}
            name="firstName"
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
