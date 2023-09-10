import { useNavigate } from 'react-router-dom';

export default function NoteDetails({ note }) {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="d-flex justify-content-between align-items-center"
        onClick={() => navigate(`/dash/notes/edit/${note._id}`)}
      >
        <h1>
          (#{note.ticket}) {note?.title || 'Untitled'}
        </h1>
        <button className="btn btn-outline btn-sm">Edit</button>
      </div>
      <p>{note?.text}</p>
      <p>Created: {note?.createdAt}</p>
      <p>Updated: {note?.updatedAt}</p>
      <p>Completed: {note?.completed ? 'Yes' : 'No'}</p>
      <p>User: {note?.username}</p>
      <p>
        Client: {note?.clientMetadata?.firstName}{' '}
        {note?.clientMetadata?.lastName}
      </p>
    </div>
  );
}
