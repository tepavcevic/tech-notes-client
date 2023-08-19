import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { TrashIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';

import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';
import handleFormDate from '../../utils/handleFormDate';
import { useDeleteNoteMutation, useUpdateNoteMutation } from './notesApiSlice';
import ConfirmModal from '../../components/ConfirmModal';

export default function EditNoteForm({ note, users }) {
  useTitle('Edit note');
  const [title, setTitle] = useState(note?.title);
  const [text, setText] = useState(note?.text);
  const [assignedUser, setAssignedUser] = useState(note?.user);
  const [completed, setCompleted] = useState(note?.completed);
  const navigate = useNavigate();
  const [updateNote, { isLoading, isSuccess, error }] = useUpdateNoteMutation();
  const [deleteNote, { isSuccess: isDelSuccess, error: delError }] =
    useDeleteNoteMutation();
  const { isManager, isAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const created = handleFormDate(note?.createdAt);
  const updated = handleFormDate(note?.updatedAt);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle('');
      setText('');
      setAssignedUser('');
      navigate('/dash/notes');
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const canSave = [title, text, assignedUser].every(Boolean) && !isLoading;

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleTextChange = (event) => setText(event.target.value);
  const handleAssignedUserChange = (event) =>
    setAssignedUser(event.target.value);
  const handleCompletedChange = (event) => setCompleted(event.target.checked);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleSaveNote = (event) => {
    event.preventDefault();

    if (canSave) {
      updateNote({
        id: note?.id,
        title,
        text,
        user: assignedUser,
        completed,
      });
    }
  };

  const handleDeleteNote = (event) => {
    event.preventDefault();

    deleteNote({ id: note?.id });
    handleCloseModal();
  };
  return (
    <>
      <ConfirmModal
        show={showModal}
        handleDelete={handleDeleteNote}
        message="Are You sure You want to delete this note?"
        handleClose={handleCloseModal}
      />

      <h1 className="mb-5">{`Edit Note #${note?.ticket || 'N/A'}`}</h1>

      <p className="text-danger">
        {(error?.data?.message || delError?.data?.message) ?? ''}
      </p>

      <Form className="form text-start">
        <Form.Group className="mb-3" controlId="title">
          <Form.Label className="fw-bolder">Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            maxLength={80}
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
            autoComplete="off"
          />
          <Form.Text className="text-muted">
            Every note should have a unique title, no longer than 80 characters
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="text">
          <Form.Label className="fw-bolder">Text</Form.Label>
          <Form.Control
            name="text"
            as="textarea"
            maxLength={800}
            style={{ height: 150 }}
            placeholder="Enter text"
            value={text}
            onChange={handleTextChange}
            autoComplete="off"
          />
          <Form.Text className="text-muted">
            You can describe the issue in 800 characters or less
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bolder">User(s)</Form.Label>
          <Form.Select
            className="mb-2"
            value={assignedUser}
            onChange={handleAssignedUserChange}
          >
            {users?.map((user) => (
              <option value={user?.id} key={user?.id}>
                {user?.username}
              </option>
            ))}
          </Form.Select>
          <Form.Text className="text-muted">
            You can assign note to one of these users
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bolder">Completed status</Form.Label>
          <Form.Check
            id="completed"
            type="switch"
            label="Is note completed"
            onChange={handleCompletedChange}
            checked={completed}
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
            onClick={handleSaveNote}
            disabled={!canSave}
          >
            <DocumentPlusIcon height={18} width={18} />
            Submit
          </Button>

          {(isManager || isAdmin) && (
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
