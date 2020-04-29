import React from 'react';
import {Container, Row, Col, Button, Image, InputGroup, FormControl, DropdownButton, Dropdown, OverlayTrigger, Tooltip} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';

const StartView = (props) => {
  const history = useHistory();

  return (
    <Container className="startView">
      <Row>
        <Col>
        <Image src="https://i.imgur.com/u7zri8i.png"></Image>
        </Col>
      </Row>

      <Row>
        <Col md={{span: 8, offset: 2}}>
        <div className="infotext"><b>Welcome to SmartyPantZ, the smartest music quiz on the internet! &#10; Type in your prefered name and start quizzing. Three wrong answers and you lose!</b></div>
        </Col>
      </Row>

      <Row style={{marginTop: "2%"}}> 
        <Col md={{span:6, offset:3}}> 
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
              }}
            />
            <DropdownButton as={InputGroup.Append} variant="outline-danger" title={props.category.toUpperCase()}>
                {["Hits", "EDM", "Rock", "Hip-hop"].map((genre) => {
                    return <Dropdown.Item key={genre} onSelect={() => {
                        props.setCategory(genre);
                    }}>{genre.toUpperCase()}</Dropdown.Item>
                })}
            </DropdownButton>
            <InputGroup.Append>
              {!(/^\S.*$/.test(props.username)) ?   
              <OverlayTrigger placement="right" delay={{show: 250, hide: 400}} overlay={<Tooltip>Enter a username (starting with a non-whitespace character)</Tooltip>}>
                <div style={{cursor: 'not-allowed'}}>
                  <Button style={{ pointerEvents: 'none' }} disabled variant="danger">START</Button>
                </div>
              </OverlayTrigger> :
              <Button variant="danger" onClick={() => history.push('/game')}>START</Button>}
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button className="highscoreButton" variant="outline-danger" onClick={() => history.push('/highscore')}>HIGHSCORES</Button>
        </Col>
      </Row>
    </Container>);
}

StartView.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired
};

export default StartView;