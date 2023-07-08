import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import { selectNoteById } from './notesApiSlice';

export default function Note({ noteId }) {
  const navigate = useNavigate();
  const note = useSelector((state) => selectNoteById(state, noteId));

  const created = new Date(note?.createdAt).toLocaleString('en-UK', {
    day: 'numeric',
    month: 'long',
  });

  const updated = new Date(note?.updatedAt).toLocaleString('en-UK', {
    day: 'numeric',
    month: 'long',
  });

  return (
    <tr className={`row p-2 border-top bg-light rounded`}>
      {note && (
        <>
          <td className="col">
            {note?.completed ? (
              <span className="text-success">Completed</span>
            ) : (
              <span className="text-danger">Open</span>
            )}
          </td>
          <td className="col d-none d-md-inline">{created}</td>
          <td className="col d-none d-md-inline">{updated}</td>
          <td className="col">{note?.title}</td>
          <td className="col d-none d-md-inline">{note?.username}</td>
          <td className="col">
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
}
