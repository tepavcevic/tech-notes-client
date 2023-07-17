import { memo } from 'react';

import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import { useGetNotesQuery } from './notesApiSlice';

const MemoNote = memo(function Note({ noteId, setNote, showModal }) {
  const navigate = useNavigate();
  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });

  const created = new Date(note?.createdAt).toLocaleString('en-UK', {
    day: 'numeric',
    month: 'long',
  });

  const updated = new Date(note?.updatedAt).toLocaleString('en-UK', {
    day: 'numeric',
    month: 'long',
  });

  return (
    <tr
      className="row p-2 border-top bg-light rounded cursor-pointer"
      onClick={() => {
        setNote(note);
        showModal();
      }}
    >
      {note && (
        <>
          <td className="col-2">
            {note?.completed ? (
              <span className="text-success">Done</span>
            ) : (
              <span className="text-danger">Open</span>
            )}
          </td>
          <td className="col d-none d-md-inline">{created}</td>
          <td className="col d-none d-md-inline">{updated}</td>
          <td className="col">{note?.title}</td>
          <td className="col d-none d-md-inline">{note?.username}</td>
          <td className="col-1">
            <PencilSquareIcon
              role="button"
              height={20}
              width={20}
              onClick={() => navigate(`/dash/notes/${noteId}`)}
            />
          </td>
        </>
      )}
    </tr>
  );
});

export default MemoNote;
