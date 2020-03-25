import React from 'react';
import {Container, Row, Col, Button, Image, InputGroup, FormControl} from 'react-bootstrap';


function StartView(props) {
  console.log(props);
  return (
    <Container className="startView">
      <Row>
        <Col>
        <Image src="https://i.imgur.com/u7zri8i.png"></Image>
        </Col>
      </Row>

      <Row>
        <Col>
        <div className="infotext">Welcome to SmartyPantZ, the smartest music quiz on the internet! &#10; Type in your prefered name and start quizzing. Three wrong answers and you lose!</div>
        </Col>
      </Row>


      <Row>
        
        <Col md={{span:4, offset:4}}> 
        <InputGroup className="nameInput">
          <FormControl
            placeholder="A superdupercool name"
            name="username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(event) => {
              event.preventDefault();
              var username = event.target.value
              props.setUsername(username);
            }}
          />
          <InputGroup.Append>
            <Button variant="outline-danger" href="/game" onClick={props.model.setUsername(props.username)} disabled={props.username===""}>START</Button>
          </InputGroup.Append>
        </InputGroup>

        </Col>

        
        
      </Row>

      <Row>
        <Col>
        <Button className="highscoreButton" variant="outline-danger" href="/highscore">HIGHSCORE</Button>
        </Col>
      </Row>

    </Container>
  
    
    )
}


export default StartView;