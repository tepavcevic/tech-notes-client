import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

import useTitle from '../../hooks/useTitle';
import { useAddNewNoteMutation } from './notesApiSlice';

export default function NewNoteForm({ users, clients }) {
  useTitle('New note');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [assignedUser, setAssignedUser] = useState(users?.[0]?.id);
  const [assignedClient, setAssignedClient] = useState(clients?.[0]?.id);

  const navigate = useNavigate();

  const [addNewNote, { isLoading, isSuccess, error }] = useAddNewNoteMutation();

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
  const handleAssignedClientChange = (event) =>
    setAssignedClient(event.target.value);

  const handleSaveNote = (event) => {
    event.preventDefault();

    if (canSave) {
      addNewNote({
        title,
        text,
        user: assignedUser,
        client: assignedClient,
      });
    }
  };

  return (
    <>
      <h1 className="mb-5">Add New Note</h1>

      <p className="text-danger">{error?.data?.message ?? ''}</p>

      <Form className="content-max-width text-start mx-auto">
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
        </Form.Group>

        <Form.Group className="mb-5">
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

        <Form.Group className="mb-5">
          <Form.Label className="fw-bolder">Client</Form.Label>
          <Form.Select
            className="mb-2"
            value={assignedClient}
            onChange={handleAssignedClientChange}
          >
            {clients?.map((client) => (
              <option value={client?.id} key={client?.id}>
                {`${client?.firstName} ${client?.lastName}`}
              </option>
            ))}
          </Form.Select>
          <Form.Text className="text-muted">
            Which user needs the repair?
          </Form.Text>
        </Form.Group>

        <div className="d-flex justify-content-end">
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
        </div>
      </Form>
    </>
  );
}
