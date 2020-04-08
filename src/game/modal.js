import React from 'react';
import {Modal, Button, Image} from 'react-bootstrap';

function ResultModal(props) {

  if(props.message.result=='r'){
    var imgsrc = 'f' + props.message.img +'.png';
  }else if(props.message.result=='w'){
    var imgsrc = 'b' + props.message.img +'.png';
  }else if(props.message.result=='t'){ 
    var imgsrc = 's1.png';
  }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Body>
        <Image id="title" style={{maxWidth: '100%'}} src={require('./feedback_images/' + imgsrc)}></Image>
          {props.message.text}
        </Modal.Body>
        <Modal.Footer id={
          props.message.result=='r'? 'r':'w'
          }>
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

export default ResultModal;