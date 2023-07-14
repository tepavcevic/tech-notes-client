import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { TrashIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';

import { useDeleteNoteMutation, useUpdateNoteMutation } from './notesApiSlice';
import useAuth from '../../hooks/useAuth';

export default function EditNoteForm({ note, users }) {
  const [title, setTitle] = useState(note?.title);
  const [text, setText] = useState(note?.text);
  const [assignedUser, setAssignedUser] = useState(note?.user);
  const [completed, setCompleted] = useState(note?.completed);
  const navigate = useNavigate();
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();
  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteNoteMutation();
  const { isManager, isAdmin } = useAuth();

  const created = new Date(note?.createdAt).toLocaleString('en-UK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  const updated = new Date(note?.updatedAt).toLocaleString('en-UK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

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
  };
  return (
    <>
      <h1 className="mb-5">Edit Note</h1>

      <p className="text-danger">
        {(error?.data?.message || delError?.data?.message) ?? ''}
      </p>

      <Form className="text-start">
        <Form.Group className="mb-3" controlId="title">
          <Form.Label className="fw-bolder">Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
            autoComplete="off"
          />
          <Form.Text className="text-muted">
            Every note should have a unique title
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="text">
          <Form.Label className="fw-bolder">Text</Form.Label>
          <Form.Control
            name="text"
            as="textarea"
            style={{ height: 150 }}
            placeholder="Enter text"
            value={text}
            onChange={handleTextChange}
            autoComplete="off"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bolder">User(s)</Form.Label>
          <Form.Select
            className="mb-2"
            value={assignedUser}
            onChange={handleAssignedUserChange}
          >
            {users.map((user) => (
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
              onClick={handleDeleteNote}
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
