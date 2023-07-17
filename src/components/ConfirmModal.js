import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmModal({
  show,
  handleDelete,
  message,
  handleClose,
}) {
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
        <h5>{message}</h5>
        <p className="bold text-danger mt-3">This change is irreversible.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
