import React from 'react';
import {Container, Row, Col, Button, Image, InputGroup, FormControl, DropdownButton, Dropdown, OverlayTrigger, Tooltip} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './start.css'

// Main view for start page
const StartView = (props) => (
    <Container className="startView" fluid>
      <Row> {/* SMARTY PANTZ logo on start page */}
        <Col>
        <Image src="https://i.imgur.com/u7zri8i.png"></Image>
        </Col>
      </Row>
      <Row> {/* Game introduction text */}
        <Col md={{span:10, offset:1}}>
          <div className="infotext">
            Welcome to the smartest music quiz on the internet! Show us your knowledge in music by answering question about track and artist popularity*
            Three wrong answers and you lose.
            Can you make it to the SmartypantZ highscore, or are you just a dumb sock? <i>Let's find out!</i>
          </div>
        </Col>
      </Row>
      <Row> {/* Input fields */}
        <Col md={{span:6, offset:3}} xs={{span:10, offset:1}}> 
          <InputGroup className="nameInput">
            <FormControl
              placeholder="A superdupercool name"
              name="username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={props.username}
              onChange={(event) => {
                event.preventDefault();
                var uName = event.target.value;
                props.setUsername(uName);
              }}/>
            <DropdownButton as={InputGroup.Append} variant="outline-danger" title={props.category.toUpperCase()}>
                {props.categories.map((genre) => {
                    return <Dropdown.Item key={genre} onSelect={() => {
                        props.setCategory(genre);
                    }}>{genre.toUpperCase()}</Dropdown.Item>
                })}
            </DropdownButton>
            <InputGroup.Append>
              {props.invalidUsername ?   
              <OverlayTrigger placement="right" delay={{show: 250, hide: 400}} overlay={<Tooltip>Enter a username (starting with a non-whitespace character)</Tooltip>}>
                <div style={{cursor: 'not-allowed'}}>
                  <Button style={{ pointerEvents: 'none' }} disabled variant="danger">START</Button>
                </div>
              </OverlayTrigger> :
              <Button variant="danger" onClick={() => props.goTo('/game')}>START</Button>}
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row> {/* Button to go to high score page */}
        <Col>
          <Button className="highscoreButton" variant="outline-danger" onClick={() => props.goTo('/highscore')}>HIGHSCORES</Button>
        </Col>
      </Row>
      <Row> {/* Popularity explanation text */}
        <Col  md={{span:8, offset:2}}>
          <div className="infoTextDisc">
            *The popularity is calculated by an algorithm and is based, in the most part, 
            on the total number of plays the track has had on Spotify and how recent those
            plays are. Artist popularity is derived mathematically from track popularity.
          </div>
        </Col>
      </Row>
    </Container>);

// Define proptypes
StartView.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired
};

export default StartView;