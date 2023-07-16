import { useParams } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

import useAuth from '../../hooks/useAuth';
import { useGetNotesQuery } from './notesApiSlice';
import { useGetUsersQuery } from '../users/usersApiSlice';
import EditNoteForm from './EditNoteForm';

export default function EditNote() {
  const { username, isManager, isAdmin } = useAuth();
  const { id } = useParams();
  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids
        .map((id) => data?.entities[id])
        .filter((user) => user?.active),
    }),
  });

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return (
        <div className="heading-2 text-danger text-center my-5">No access</div>
      );
    }
  }
  return (
    <>
      {note && users?.length ? (
        <EditNoteForm note={note} users={users} />
      ) : (
        <PulseLoader />
      )}
    </>
  );
}
