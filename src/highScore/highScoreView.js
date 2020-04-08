import React from 'react';
import {Col, Row, Image, Table, Container, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

const HighScoreView = (props) => {
    const history = useHistory();

    return (
        <Container className="highScoreView">
            <Row style={{marginTop: "2%"}}>
                <Col md={{span:2, offset:0}}>
                    <Row style={{marginTop: "30%"}}>
                        <Button variant="outline-danger" onClick={() => history.push('/')}>BACK TO START</Button>
                    </Row>
                </Col>
                <Col md={{span:8, offset:0}}>
                    <Image src={"https://i.imgur.com/nbrayQO.png"} alt="" />
                </Col>
            </Row>
            <Row className="tableBox">
                <Table striped borded="true" size="sm">
                    <thead>
                        <tr>
                        <th>Rank</th>
                        <th>Score</th>
                        <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.highScores.map(({score, name}, index) => <tr key={index}><td>{index+1}</td><td>{score}</td><td>{name}</td></tr>)}
                    </tbody>
                </Table>
            </Row>
        </Container>);
}

export default HighScoreView;