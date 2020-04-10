import React from 'react';
import {Container, Row, Col, Image, ProgressBar, Button} from 'react-bootstrap';
import ResultModal from './modal.js';
import {useHistory} from 'react-router-dom';

const GameView = (props) => {
  const history = useHistory();
  var pantzLifesrc;
  // Change pantZlife img depending on category
  if(props.category === 'Rock'){
    pantzLifesrc = require("../imgs/pantzRock.png");
  }else{pantzLifesrc="https://i.imgur.com/Zrdtb9n.png"
  }

  // Lives
  var xsOffset = [6, 0, 0];
  var lifeCols = [];
  for (let i = 0; i < 3; i++) {
    lifeCols.push(
      <Col key={i} md={{span:1, offset:0}} xs={{span:2, offset:xsOffset[i]}}>
        <Image id="pantzLife" style={{opacity: props.opacity[i]}} src={pantzLifesrc}></Image>
      </Col>
    );
  }

  // Change cursor depending on category
  if(document.getElementsByClassName("body")[0].id !== props.category + 'Body'){
    document.getElementsByClassName("body")[0].id = props.category + 'Body'
    // document.getElementsByClassName("gameQuestion")[0].id = "gameQuestion" + props.category;
    }
 // change ID for images, so they change color:


  return (
    
    <Container className='gameView' id={props.category} fluid>
      {/* TOP-BAR. Includes: PantZ life*/}
      <Row id={"topBar"+props.category}>
        <Col style={{marginTop: "4%"}} md={{span:2, offset:0}}>
          <Button variant="outline-danger" onClick={function(e)
            { history.push('/'); 
            document.getElementsByClassName("body")[0].id = 'CategoryBody'
            }}>LEAVE GAME
          </Button>
        </Col>
        <Col style={{marginTop: "4%"}} md={{span:2, offset:0}}>
          <h2>Score: {props.score}</h2>
        </Col>
        <Col style={{marginTop: "4%"}} md={{span:1, offset:4}}>
          <h2>Lives: </h2>
        </Col>
        {lifeCols}
      </Row>

      <Row><Col>{props.statsMessage}</Col></Row>

      <Row> {/* GAME HEADING */}
        <Col>
        <Image className="gameQuestion" id={"gameQuestion"+props.category} src={"https://i.imgur.com/lXXGtBV.png"} alt="" />
        </Col>
      </Row>
      
      <Row id="gamePlay">  {/* GAME PLAY */}
        <Col style={{height: "350px"}}>
          {options(props)}
        </Col>
      </Row>
      <Row style={{marginTop: "2%"}}>
        <Col md={{span: 8, offset: 2}}>
          <ProgressBar animated striped variant="danger" now={(props.countdown > 0 ? 100 : props.time)}/>
        </Col>
      </Row>
      <Row> {/* MESSAGE RÄTT/FEL */}
        <Col>
          <ResultModal
            show={props.modalShow}
            onHide={() => props.setModalShow(false)}
            message={props.message}
            setQ={props.setQ}
            nextQuestion={props.nextQuestion}
            category={props.category}/>
        </Col>
      </Row>
    </Container>);
}

const options = (props) => {
  if (props.countdown > 0) {
    return (<div>
      <h2>Get ready</h2>
      <h1 className="h0" >{props.countdown}</h1>
    </div>)
  } else {
    return (<div>
      <Row>
        <Col md={{span:3, offset:2}}>
        <h4>{props.track1?props.track1.name:null}</h4>
        </Col>
        <Col md={{span:3, offset:2}}>
        <h4>{props.track2?props.track2.name:null}</h4>
        </Col>
      </Row>
      <Row>
        <Col md={{span:3, offset:2}}>
          <Image src={props.track1?props.track1.album.images["0"].url:null}  onClick={() => props.checkAnswer(props.track1)} alt="" />
          <Row><Col>By {props.track1?props.track1.artists[0].name:null}</Col></Row>

        </Col>
        <Col md={{span:3, offset:2}}>
          <Image src={props.track2?props.track2.album.images["0"].url:null} onClick={() => props.checkAnswer(props.track2)} alt="" />
          <Row><Col>By {props.track2?props.track2.artists[0].name:null}</Col></Row>

        </Col>
      </Row>
    </div>)
  }
}

export default GameView;
