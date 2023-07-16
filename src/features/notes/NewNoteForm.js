import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { useAddNewNoteMutation } from './notesApiSlice';
import { useNavigate } from 'react-router-dom';

export default function NewNoteForm({ users }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [assignedUser, setAssignedUser] = useState(users[0]?.id);

  const navigate = useNavigate();

  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  useEffect(() => {
    if (isSuccess) {
      setTitle('');
      setText('');
      setAssignedUser('');
      navigate('/dash/notes');
    }
  }, [isSuccess, navigate]);

  const canSave = [title, text, assignedUser].every(Boolean) && !isLoading;

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleTextChange = (event) => setText(event.target.value);
  const handleAssignedUserChange = (event) =>
    setAssignedUser(event.target.value);

  const handleSaveNote = (event) => {
    event.preventDefault();

    if (canSave) {
      addNewNote({
        title,
        text,
        user: assignedUser,
      });
    }
  };

  return (
    <>
      <h1 className="mb-5">Add New Note</h1>

      <p className="text-danger">{error?.data?.message ?? ''}</p>

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

        <Form.Group className="mb-5">
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
      </Form>
    </>
  );
}
