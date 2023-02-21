import React from "react";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
const InfoModal = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <p className="info_text">
          Tap the three-dots button at the bottom right on your Reel, and click
          🔗 Copy Link.
        </p>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default InfoModal;
