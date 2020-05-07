import React from 'react';
import {Modal, Button, Image} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

// Modal that is visible between questions
const ResultModal = React.forwardRef((props, ref) => {
  const history = useHistory();
  var imgsrc;

  // Set image based on result and category
  if (props.message.result === 'r') {
    if (props.category === 'Rock') imgsrc = 'fr' + props.message.img + '.png';
    else imgsrc = 'f' + props.message.img + '.png';
  } else if (props.message.result === 'w') {
    imgsrc = 'b' + props.message.img + '.png';
  } else if (props.message.result === 't') { 
    imgsrc = 's1.png';
  }

  // Starts a 30 sec timer, to go to highscore, as soon as gameoverpath is no longer 'null'
  if (props.gameoverpath != null) setTimeout(() => {if (ref.current) history.push(props.gameoverpath)}, 20000);
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => props.gameoverpath != null?history.push(props.gameoverpath):props.onHide()}
    >
      <Modal.Body id={"modal"+props.category}>
        <Image id={"title"+props.message.result} style={{maxWidth: '100%'}} src={require('../imgs/' + imgsrc)}/>
        {props.message.text}
      </Modal.Body>
      <Modal.Footer id={ props.category + props.message.result} className="justify-content-center">
        {props.gameoverpath != null?<b>You have no lives left :(  </b>:null}
        <Button style={{float: "right"}} onClick={
          () => props.gameoverpath != null?history.push(props.gameoverpath):props.onHide()}>
          {props.gameoverpath?"OK":"NEXT QUESTION"}
        </Button>
      </Modal.Footer>
    </Modal>);
});

export default ResultModal;