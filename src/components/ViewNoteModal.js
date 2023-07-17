import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ViewNoteModal({ note, show, handleClose }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Tech Notes</Modal.Title>
      </Modal.Header>

      <Modal.Body className="py-5 px-3">
        <h5>{note?.title}</h5>
        <p className="my-4">{note?.text}</p>
        <p className="text-end">Assigned to: {note?.username}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
