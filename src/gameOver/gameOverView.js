import React from 'react';
import './gameOver.css';
import {Container, Row, Col, Button, Image} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';

const GameOverView = (props) => {
  const history = useHistory();


  return (

    <Container className="gameOverView">
     <Row>
        <Col>
          <Image src="https://i.imgur.com/qA66fUX.png"></Image>
        </Col>
      </Row>
      <Row>
        <Col id="highScoreMessage">
          {props.highscoreMessage}
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="infotext">Score: {props.score}</div>
        </Col>
      </Row>
      <Row style={{marginTop: "3%"}}>
        <Col>
          <Button style={{marginRight: "1%"}} variant="outline-dark" onClick={() => history.push('/game')}>PLAY AGAIN</Button>
        </Col>
      </Row>
      <Row style={{marginTop: "1%"}}>
        <Col>
          <Button style={{marginRight: "1%"}} variant="outline-dark" onClick={function(e)
            { history.push('/'); 
            document.getElementsByClassName("body")[0].id = 'CategoryBody'
            }}>BACK TO START</Button>
          <Button variant="outline-dark" onClick={function(e) 
            {history.push('/highscore')
            document.getElementsByClassName("body")[0].id = 'CategoryBody'
            }}>SEE HIGHSCORES</Button>
        </Col>
      </Row>
    </Container>);
}

GameOverView.propTypes = {
  score: PropTypes.number.isRequired,
};

export default GameOverView;