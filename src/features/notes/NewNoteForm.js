import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import useTitle from '../../hooks/useTitle';
import useRefreshCredentials from '../../hooks/useRefreshCredentials';
import { useAddNewNoteMutation } from './notesApiSlice';

export default function NewNoteForm({ users, clients }) {
  useTitle('New note');

  const [addNewNote, { isLoading }] = useAddNewNoteMutation();
  const { refreshToken, isRefreshingToken } = useRefreshCredentials();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: 'all' });

  const canSave = isValid && !isLoading && !isSubmitting;

  const onSave = async (data) => {
    try {
      await refreshToken();

      await addNewNote(data).unwrap();

      toast.success('Note added successfully');
      reset();
      navigate('/dash/notes');
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
      <h1 className="mb-5">Add New Note</h1>

      <Form className="form text-start" onSubmit={handleSubmit(onSave)}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label className="fw-bolder">Title</Form.Label>
          <Controller
            control={control}
            name="title"
            defaultValue=""
            rules={{
              required: { value: true, message: 'This field is required' },
              maxLength: {
                value: 80,
                message: 'Title must be at most 80 characters',
              },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.title}
                placeholder="Enter title"
                autoComplete="off"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Every note should have a unique title, no longer than 80 characters
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="text">
          <Form.Label className="fw-bolder">Text</Form.Label>
          <Controller
            control={control}
            name="text"
            defaultValue=""
            rules={{
              required: { value: true, message: 'This field is required' },
              maxLength: {
                value: 800,
                message: 'Text must be at most 800 characters',
              },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                as="textarea"
                rows={10}
                onChange={onChange}
                value={value}
                ref={ref}
                isInvalid={errors.text}
                placeholder="Enter text"
                autoComplete="off"
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.text?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bolder">User(s)</Form.Label>
          <Controller
            control={control}
            name="user"
            defaultValue=""
            rules={{
              required: { value: true, message: 'This field is required' },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Select
                className="mb-2"
                value={value}
                onChange={onChange}
                ref={ref}
              >
                {users?.map((user) => (
                  <option value={user?.id} key={user?.id}>
                    {user?.username}
                  </option>
                ))}
              </Form.Select>
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.user?.message}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            You can assign note to one of these users
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bolder">Client</Form.Label>
          <Controller
            control={control}
            name="client"
            defaultValue=""
            rules={{
              required: { value: true, message: 'This field is required' },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Select
                className="mb-2"
                value={value}
                onChange={onChange}
                ref={ref}
              >
                {clients?.map((client) => (
                  <option value={client?.id} key={client?.id}>
                    {`${client?.firstName} ${client?.lastName}, ${client?.street}`}
                  </option>
                ))}
              </Form.Select>
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.client?.message}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Which client needs the repair?
          </Form.Text>
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
                <DocumentPlusIcon height={18} width={18} /> Submit
              </>
            )}
          </Button>
        </div>
      </Form>
    </>
  );
}
