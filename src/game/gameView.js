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
        <Image id="pantzLife" style={{opacity: props.opacity[i]}} src={pantzLifesrc}  key={i}></Image>
    );
  }

  // Change cursor depending on category
  if(document.getElementsByClassName("body")[0].id !== props.category + 'Body'){
    document.getElementsByClassName("body")[0].id = props.category + 'Body'
    }

  return (
    
    <Container className='gameView' id={props.category} fluid> 
    
      <Row id={"topBar"+props.category}>
        <Col> 
          <Button variant="outline-danger" onClick={function(e)
            { history.push('/'); 
            document.getElementsByClassName("body")[0].id = 'CategoryBody'
            }}>LEAVE GAME
          </Button>
        </Col>
        <Col>
          <Row>
            <div id="scoreText" >Score: {props.score}</div>
          </Row>
        </Col>

        <Col xs={{span:6}} sm={{span:8, offset:0}} md={{offset:1}}>
          <Row id="livesText">
            Lives: {lifeCols}
          </Row>
        </Col>
      </Row>

      <Row><Col>{props.statsMessage}</Col></Row>
          {options(props)}

      
      <Row style={{marginTop: "2%"}}>
        <Col>
          <ProgressBar animated striped variant="danger" now={(props.countdown > 0 ? 100 : props.time)}/>
        </Col>
      </Row>
      <Row>
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
            <Row id="gamePlay"> 
        <Col>
      <h2>Get ready</h2>
      <h1 className="h0" >{props.countdown}</h1>
      </Col>
      </Row>
    </div>)
  } else {
    return (<div>

    
      <Row> {/* GAME HEADING */}
        <Col>
        <Image className="gameQuestion" id={"gameQuestion"+props.category} src={require('../imgs/' + "question" + props.questionType + ".png")} alt="" />
        </Col>
      </Row>

      <Row id="gamePlay">  {/* GAME PLAY */}
        <Col>
        {props.questionType=="Artist"?optionsArtist(props):optionsTrack(props)}
      </Col>
      </Row>
      
    </div>)
  }
}

const optionsArtist = (props) => {
  return (<div>
    <Row>
    <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
        <div class="optionsText">{props.artist1?props.artist1.name:null}</div>
        </Col>
        <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
        <div class="optionsText">{props.artist2?props.artist2.name:null}</div>
        </Col>
      </Row>
      <Row>
      <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
          <Image src={props.artist1?props.artist1.imgsrc:null}  onClick={() => props.checkAnswer(props.artist1, props.artist2)} alt="" />
        </Col>
        <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
          <Image src={props.artist1?props.artist2.imgsrc:null} onClick={() => props.checkAnswer(props.artist2, props.artist1)} alt="" />
        </Col>
      </Row>
  </div>)
}

const optionsTrack = (props) => {
  return (<div>
    <Row>
    <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
    <div class="optionsText">{props.track1?props.track1.name:null}</div>
    </Col>
    <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
    <div class="optionsText">{props.track2?props.track2.name:null}</div>
    </Col>
  </Row>
  <Row>
  <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
      <Image src={props.track1?props.track1.album.images["0"].url:null}  onClick={() => props.checkAnswer(props.track1, props.track2)} alt="" />
      <Row><Col>By {props.track1?props.track1.artists[0].name:null}</Col></Row>
    </Col>
    <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
      <Image src={props.track2?props.track2.album.images["0"].url:null} onClick={() => props.checkAnswer(props.track2, props.track1)} alt="" />
      <Row><Col>By {props.track2?props.track2.artists[0].name:null}</Col></Row>
    </Col>
  </Row></div>)
}

export default GameView;
