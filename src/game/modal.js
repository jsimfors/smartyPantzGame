import React from 'react';
import {Modal, Button, Image} from 'react-bootstrap';

// Modal that is visible between questions
const ResultModal = (props) => (
  <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    onHide={props.onHide}
  >
    <Modal.Body id={"modal"+props.category}>
      <Image id={"title"+props.message.result} style={{maxWidth: '100%'}} src={props.imgsrc}/>
      {props.message.text}
    </Modal.Body>
    <Modal.Footer id={ props.category + props.message.result} className="justify-content-center">
      {props.gameoverpath ? <b>You have no lives left :(  </b> : null}
      <Button style={{float: "right"}} onClick={props.onHide}>
        {props.gameoverpath ? "OK" : "NEXT QUESTION"}
      </Button>
    </Modal.Footer>
  </Modal>);

export default ResultModal;