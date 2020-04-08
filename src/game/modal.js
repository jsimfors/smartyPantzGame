import React from 'react';
import {Modal, Button} from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Body>
          {props.message}
        </Modal.Body>
        <Modal.Footer>
        <Button
        onClick={() => (
            props.nextQuestion(),
            props.onHide()
        )}>
        NEXT QUESTION
      </Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default MyVerticallyCenteredModal;