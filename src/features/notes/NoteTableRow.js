import { memo } from 'react';

import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const MemoNoteTableRow = memo(function NoteTableRow({ note }) {
  const navigate = useNavigate();

  const created = new Date(note?.createdAt).toLocaleString('en-UK', {
    day: 'numeric',
    month: 'long',
  });

  const updated = new Date(note?.updatedAt).toLocaleString('en-UK', {
    day: 'numeric',
    month: 'long',
  });

  return (
    <tr className="row p-2 border-top bg-light rounded cursor-pointer">
      {note && (
        <>
          <td className="col-2 col-md">
            {note?.completed ? (
              <span className="text-success">Done</span>
            ) : (
              <span className="text-danger">Open</span>
            )}
          </td>
          <td className="col d-none d-md-inline">{created}</td>
          <td className="col d-none d-md-inline">{updated}</td>
          <td
            className="col col-md-3 col-lg-5 btn-click"
            onClick={() => navigate(`/dash/notes/${note._id}`)}
          >
            {note?.title}
          </td>
          <td className="col d-none d-md-inline">{note?.username}</td>
          <td className="col-2 col-md-1 text-center">
            <PencilSquareIcon
              role="button"
              height={20}
              width={20}
              onClick={() => navigate(`/dash/notes/edit/${note._id}`)}
            />
          </td>
        </>
      )}
    </tr>
  );
});

export default MemoNoteTableRow;
