import { useState } from 'react';
import { useParams } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import { useGetNotesQuery } from '../features/notes/notesApiSlice';
import { useGetUsersQuery } from '../features/users/usersApiSlice';
import { useGetClientsQuery } from '../features/clients/clientsApiSlice';
import EditNoteForm from '../features/notes/EditNoteForm';
import BackButton from '../components/BackButton';
import FullScreenLoader from '../components/FullScreenLoader';

export default function Note() {
  const { username, isManager, isAdmin } = useAuth();
  const [readOnly, setReadOnly] = useState(true);
  const { id } = useParams();
  const { note } = useGetNotesQuery('Note', {
    selectFromResult: ({ data }) => ({
      note: data?.notes?.find((note) => note?._id === id),
    }),
  });
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids
        .map((id) => data?.entities[id])
        .filter((user) => user?.active),
    }),
  });
  const { clients } = useGetClientsQuery('clientsList', {
    selectFromResult: ({ data }) => ({
      clients: data?.ids
        .map((id) => data?.entities[id])
        .filter((client) => client?.active),
    }),
  });

  const handleToggleEditForm = () => {
    setReadOnly((prev) => !prev);
  };

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return (
        <div className="heading-2 text-danger text-center my-5">No access</div>
      );
    }
  }
  return (
    <>
      <BackButton to="/dash/notes" />
      {note && users?.length && clients?.length ? (
        <EditNoteForm
          note={note}
          users={users}
          clients={clients}
          hasDeleteCredentials={isManager || isAdmin}
          readOnly={readOnly}
          handleToggleEditForm={handleToggleEditForm}
        />
      ) : (
        <FullScreenLoader />
      )}
    </>
  );
}
