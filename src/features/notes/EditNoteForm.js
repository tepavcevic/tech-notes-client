import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { TrashIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import useTitle from '../../hooks/useTitle';
import useRefreshCredentials from '../../hooks/useRefreshCredentials';
import handleFormDate from '../../utils/handleFormDate';
import { useDeleteNoteMutation, useUpdateNoteMutation } from './notesApiSlice';
import ConfirmModal from '../../components/ConfirmModal';

export default function EditNoteForm({
  note,
  users,
  clients,
  hasDeleteCredentials,
}) {
  useTitle('Edit note');

  const [updateNote, { isLoading }] = useUpdateNoteMutation();
  const [deleteNote, { iisLoading: delLoading }] = useDeleteNoteMutation();
  const [showModal, setShowModal] = useState(false);
  const { refreshToken, isRefreshingToken } = useRefreshCredentials();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: 'all' });

  const canSave =
    isValid && !isLoading && !delLoading && !isSubmitting && !isRefreshingToken;

  const created = handleFormDate(note?.createdAt);
  const updated = handleFormDate(note?.updatedAt);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    try {
      await refreshToken();

      await updateNote({ id: note.id, ...data }).unwrap();

      toast.success('Note edited successfully');
      reset();
      navigate('/dash/notes');
    } catch (error) {
      console.log(error);
      if (!error.status) {
        toast.error('No server response');
      } else if (error.status === 400) {
        toast.error('Missing fields, wrong data format or note not completed');
      } else {
        toast.error(error?.data?.message);
      }
    }
  };

  const onDeleteNote = async () => {
    try {
      await refreshToken();

      await deleteNote({ id: note.id }).unwrap();

      handleCloseModal();
      toast.success('Note deleted successfully');
      navigate('/dash/notes');
    } catch (error) {
      handleCloseModal();
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
      <ConfirmModal
        show={showModal}
        handleDelete={onDeleteNote}
        message="Are You sure You want to delete this note?"
        handleClose={handleCloseModal}
      />

      <h1 className="mb-5">{`Edit Note #${note?.ticket || 'N/A'}`}</h1>

      <Form className="form text-start" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label className="fw-bolder">Title</Form.Label>
          <Controller
            control={control}
            name="title"
            defaultValue={note?.title}
            rules={{
              required: { value: true, message: 'This field is required' },
              maxLength: {
                value: 80,
                message: 'Title must be at most 80 characters',
              },
            }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                name="title"
                type="text"
                placeholder="Enter title"
                value={value}
                onChange={onChange}
                ref={ref}
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
            defaultValue={note?.text}
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
            defaultValue={note?.user}
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
            defaultValue={note?.client}
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

        <Form.Group className="mb-3">
          <Form.Label className="fw-bolder">Completed status</Form.Label>
          <Controller
            control={control}
            name="completed"
            defaultValue={note.completed}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Check
                onChange={onChange}
                checked={value}
                ref={ref}
                name="completed"
                id="completed"
                type="switch"
                label="Is note completed"
                className="mb-3"
              />
            )}
          />
        </Form.Group>

        <Form.Text>
          <p>
            Created:
            <br />
            {created}
          </p>
        </Form.Text>
        <Form.Text>
          <p>
            Updated:
            <br />
            {updated}
          </p>
        </Form.Text>

        <div className="d-flex justify-content-end align-items-center gap-3 mt-5">
          <Button
            variant="primary"
            type="submit"
            className="d-flex align-items-center gap-2"
            disabled={!canSave}
          >
            <DocumentPlusIcon height={18} width={18} />
            Submit
          </Button>

          {hasDeleteCredentials && (
            <Button
              variant="danger"
              type="submit"
              className="d-flex align-items-center gap-2"
              onClick={handleShowModal}
            >
              <TrashIcon height={18} width={18} />
              Delete
            </Button>
          )}
        </div>
      </Form>
    </>
  );
}
