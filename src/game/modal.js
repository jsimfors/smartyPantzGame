import React from 'react';
import {Modal, Button, Image} from 'react-bootstrap';

function ResultModal(props) {
  var imgsrc;
  if(props.message.result==='r'){
    if(props.category==='Rock'){
      imgsrc = 'fr' + props.message.img +'.png';
    }else{imgsrc = 'f' + props.message.img +'.png';}
  }else if(props.message.result==='w'){
    imgsrc = 'b' + props.message.img +'.png';
  }else if(props.message.result==='t'){ 
    imgsrc = 's1.png';
  }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Body id={"modal"+props.category}>
        <Image id={"title"+props.message.result} style={{maxWidth: '100%'}} src={require('./feedback_images/' + imgsrc)}></Image>
          {props.message.text}
        </Modal.Body>
        <Modal.Footer id={ props.category + props.message.result
          // (props.message.result==='r'&&props.category!=='Rock')? 'r':(props.message.result==='r'&&props.category==='Rock')?'ro':'w'
          }>
        <Button 
        onClick={() => props.onHide()}>
        NEXT QUESTION
      </Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ResultModal;