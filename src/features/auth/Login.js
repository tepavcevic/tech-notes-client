import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import useTitle from '../../hooks/useTitle';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';

export default function Login() {
  useTitle('Login');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [persist, setPersist] = usePersist();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  const handleToggle = () => setPersist((prev) => !prev);

  const onSubmit = async (data) => {
    try {
      const { accessToken } = await login({ ...data }).unwrap();
      dispatch(setCredentials({ accessToken }));
      reset();
      navigate('/dash');
    } catch (error) {
      if (!error.status) {
        toast.error('No server response');
      } else if (error.status === 400) {
        toast.error('Missing username or password');
      } else if (error.status === 401) {
        toast.error('Wrong username or password');
      } else {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <section>
      <header className="header border-bottom py-5"></header>

      <Container className="container-md py-5">
        <Form onSubmit={handleSubmit(onSubmit)} className="form mx-auto">
          <Form.Group className="mb-3" controlId="username">
            <Form.Label className="fw-bolder">Username</Form.Label>
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
            <Form.Label className="fw-bolder">Password</Form.Label>
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
                  type="password"
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

          <div className="d-flex justify-content-between align-items-center mt-5">
            <Form.Group controlId="persist">
              <Form.Label className="fw-bolder">Trust this device</Form.Label>
              <Form.Check
                name="perist"
                type="switch"
                onChange={handleToggle}
                checked={persist}
              />
            </Form.Group>

            <Button
              type="submit"
              disabled={isSubmitting || isLoading || !isValid}
            >
              {isLoading || isSubmitting ? 'Loading...' : 'Login'}
            </Button>
          </div>
        </Form>
      </Container>
    </section>
  );
}
