import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Image, Button} from 'react-bootstrap';



function GameView({track1, track2}) {
    return (
      <Container className='gameView'>
        <Row> {/* TOP-BAR. Includes: PantZ life*/}
          <Col md={{span:2, offset:10}} xs={{span:6, offset:6}}>
          <Image id="pantzLife" src="https://i.imgur.com/kTFtr9Q.png"></Image>
          </Col>
        </Row>

        <Row> {/* GAME HEADING */}
          <Col>
          <Image id="gameQuestion" src={"https://i.imgur.com/lXXGtBV.png"} alt="" />
          </Col>
        </Row>

        <Row id="gamePlay">  {/* GAME PLAY */}
          <Col  md={{span:2, offset:3}}> {/* TRACK 1 */}
            <Row>
              <h5>{track1?track1.name:null}</h5>
            </Row>
            <Row>
              <Image src={track1?track1.album.images["0"].url:null}  onClick={() => console.log("Incorrect")} alt="" />
            </Row>
          </Col>

          <Col  md={{span:2, offset:2}}> {/* TRACK 2 */}
          <Row>
            <h5>{track2?track2.name:null}</h5>
          </Row>
          <Row>
            <Image src={track2?track2.album.images["0"].url:null} onClick={() => console.log("Correct")} alt="" />
          </Row>
          </Col>
        </Row>

      </Container>
    );
  }


export default GameView;
