import React from 'react';
import {Container, Row, Col, Image, ProgressBar, Button} from 'react-bootstrap';
import ResultModal from './modal.js';
import './gameView.css';

// Main view for game page
const GameView = (props) => (
  <Container className='gameView' id={props.category} fluid> 
    <Row id={"topBar"+props.category}> {/* Game header including current player, score and lives */}
      <Col>
        <Button variant="outline-danger" onClick={() => props.goTo('/')}>
          LEAVE GAME
        </Button>
      </Col>
      <Col>
        <Row>
          <div id="scoreText">Score: {props.score}</div>            
        </Row>
      </Col>
      <Col>
        <Row>
        <div id="scoreText">Player: {props.name}</div>            
        </Row>
      </Col>
      <Col  xs={{span:6}} sm={{span:8, offset:0}} md={{offset:1}}>
        <Row id="livesText">
          Lives: {props.opacity.map((el, index) => {
            return <Image id="pantzLife" style={{opacity: el}} src={props.pantzLifesrc} key={index} ></Image>
          })}
        </Row>
      </Col>
    </Row>
    <Row id="statsMessage"> {/* Statistic message */}
      <Col>
        {props.statsMessage}
      </Col>
    </Row>
    {/* Question options (artists or tracks) */}
    {options(props)}
    <Row style={{marginTop: "2%"}}> {/* Timebar */}
      <Col>
        <ProgressBar animated striped variant="danger" now={props.time}/>
      </Col>
    </Row>
    <Row> {/* Modal between questions */}
      <Col>
        <ResultModal
          show = {props.modalShow}
          onHide = {props.onHide}
          message = {props.message}
          category = {props.category}
          gameoverpath = {props.gameoverpath}
          imgsrc = {props.modalImgsrc}/>
      </Col>
    </Row>
  </Container>);

// Subview showing count down or game question
const options = (props) => {
  if (props.countdown > 0) {
    return (<div>
      <Row id="gamePlay"> {/* COUNT DOWN */}
        <Col>
          <h2>Get ready</h2>
          <h1 className="h0" >{props.countdown}</h1>
        </Col>
      </Row>
    </div>);
  } else {
    return (<div>
      <Row> {/* GAME HEADING */}
        <Col>
        <Image className="gameQuestion" id={"gameQuestion"+props.category} src={(props.artist1 == null || props.artist2 == null) ? (props.track1 == null || props.track2 == null) ? null : require('../imgs/questionTrack.png') : require('../imgs/questionArtist.png')} alt="" />
        </Col>
      </Row>
      <Row id="gamePlay">  {/* GAME PLAY */}
        <Col>
          {(props.artist1 == null || props.artist2 == null) ? optionsTrack(props) : optionsArtist(props)}
        </Col>
      </Row>
    </div>);
  }
};

// Subsubview showing artist alternatives
const optionsArtist = (props) => {
  return (
    <div>
      <Row> {/* Names */}
        <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
          <div className="optionsText">{props.artist1?props.artist1.name:null}</div>
        </Col>
        <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
          <div className="optionsText">{props.artist2?props.artist2.name:null}</div>
        </Col>
      </Row>
      <Row> {/* Images */}
        <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
          <Image src={props.artist1?props.artist1.imgsrc:null}  onClick={() => props.checkAnswer(props.artist1, props.artist2)} alt="" />
        </Col>
        <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
          <Image src={props.artist1?props.artist2.imgsrc:null} onClick={() => props.checkAnswer(props.artist2, props.artist1)} alt="" />
        </Col>
      </Row>
    </div>);
};

// Subsubview showing track alternatives
const optionsTrack = (props) => {
  return (
    <div>
      <Row> {/* Track names */}
        <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
          <div className="optionsText">{props.track1?props.track1.name:null}</div>
        </Col>
        <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
          <div className="optionsText">{props.track2?props.track2.name:null}</div>
        </Col>
      </Row>
      <Row> {/* Images and artist names */}
        <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
          <Image src={props.track1?props.track1.album.images["0"].url:null}  onClick={() => props.checkAnswer(props.track1, props.track2)} alt="" />
          <Row><Col>{props.track1?"By "+props.track1.artists[0].name:null}</Col></Row>
        </Col>
        <Col md={{span:3, offset:2}} xs={{span:6, offset:0}}>
          <Image src={props.track2?props.track2.album.images["0"].url:null} onClick={() => props.checkAnswer(props.track2, props.track1)} alt="" />
          <Row><Col>{props.track2?"By "+props.track2.artists[0].name:null}</Col></Row>
        </Col>
      </Row>
    </div>);
};

export default GameView;
