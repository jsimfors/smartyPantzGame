import React from 'react';
import './gameOver.css';
import {Container, Row, Col, Button, Image} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Main view for game over page
const GameOverView = (props) => (
  <Container className="gameOverView">
    <Row> {/* Confetti */}
      <Col>
        <div id="confettiParent">
          {new Array(10).map(() => {
            return <div className="confetti"></div>
          })}
        </div>   
      </Col>
    </Row>   
    <Row> {/* Game over label */}
      <Col>
        <Image src="https://i.imgur.com/qA66fUX.png"></Image>
      </Col>
    </Row>
    <Row id="highScoreMessage"> {/* Tell the user if they made it on a high score list or not */}
      <Col>
        {props.highscoreMessage}
      </Col>
    </Row>
    <Row> {/* Score label */}
      <Col>
        <div className="infotext">Score: {props.score}</div>
      </Col>
    </Row>
    <Row style={{marginTop: "3%"}}> {/* Play again button */}
      <Col>
        <Button style={{marginRight: "1%"}} variant="outline-dark" onClick={() => props.goTo('/game')}>PLAY AGAIN</Button>
      </Col>
    </Row>
    <Row style={{marginTop: "1%"}}> {/* Buttons to start and high score pages */}
      <Col>
        <Button style={{marginRight: "1%"}} variant="outline-dark" onClick={() => props.goTo('/')}>BACK TO START</Button>
        <Button variant="outline-dark" onClick={() => props.goTo('/highscore')}>SEE HIGHSCORES</Button>
      </Col>
    </Row>
  </Container>);

// Define proptypes
GameOverView.propTypes = {
  score: PropTypes.number.isRequired
};

export default GameOverView;