import React from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';



function GameView(props) {
    // Lives
    const mdOffset = [9, "auto", "auto"];
    const xsOffset = [6, "auto", "auto"];
    var lifeCols = [];
    for (var i = 0; i < 3; i++) {
      lifeCols.push(
        <Col key={i} md={{span:1, offset:mdOffset[i]}} xs={{span:2, offset:xsOffset[i]}}>
          <Image id="pantzLife" style={{opacity: props.opacity[i]}} src="https://i.imgur.com/Zrdtb9n.png"></Image>
        </Col>
      );
    }

    return (
      <Container className='gameView'>
        <Row> {/* TOP-BAR. Includes: PantZ life*/}
          {lifeCols}
        </Row>

        <Row> {/* GAME HEADING */}
          <Col>
          <Image id="gameQuestion" src={"https://i.imgur.com/lXXGtBV.png"} alt="" />
          </Col>
        </Row>

        <Row id="gamePlay">  {/* GAME PLAY */}
          <Col  md={{span:2, offset:3}}> {/* TRACK 1 */}
            <Row>
              <h5>{props.track1?props.track1.name:null}</h5>
            </Row>
            <Row>
              <Image src={props.track1?props.track1.album.images["0"].url:null}  onClick={() => props.checkAnswer(props.track1)} alt="" />
            </Row>
          </Col>

          <Col  md={{span:2, offset:2}}> {/* TRACK 2 */}
          <Row>
            <h5>{props.track2?props.track2.name:null}</h5>
          </Row>
          <Row>
            <Image src={props.track2?props.track2.album.images["0"].url:null} onClick={() => props.checkAnswer(props.track2)} alt="" />
          </Row>
          </Col>
        </Row>
        <Row> {/* MESSAGE RÄTT/FEL */}
          <Col>
          <div className="result">{props.message}</div>
          </Col>
        </Row>
      </Container>
    );
  }


export default GameView;
