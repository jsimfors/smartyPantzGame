import React from 'react';
import {Col, Row, Image, Table, Container, Button, Spinner} from 'react-bootstrap';

// Main view for high score page
const HighScoreView = (props) => (
    <Container className="highScoreView">
        <Row style={{marginTop: "2%"}}>
            <Col md={{span:2, offset:0}}> {/* Back to start page button */}
                <Row style={{marginTop: "10%"}}>
                    <Button variant="outline-danger" onClick={props.toStart}>
                        BACK TO START
                    </Button>
                </Row>
            </Col>
            <Col md={{span:8, offset:0}}> {/* High score label */}
                <Image src={"https://i.imgur.com/nbrayQO.png"} alt="" />
            </Col>
        </Row>
        <Row style={{marginTop: "10%"}}> {/* High score list for all categories */}
            <Col md={{span:6, offset:3}}>
                <Row className="justify-content-center">
                    <h2>All categories</h2>
                </Row>
                {generateList(props.allScores)}
            </Col>
        </Row>
        <Row style={{marginTop: "2%"}}> {/* High score lists for categories hits and EDM */}
            <Col style={{marginRight: "2%"}}>
                <Row className="justify-content-center">
                    <h2>Hits</h2>
                </Row>
                {generateList(props.hitsScores)}
            </Col>
            <Col>
                <Row className="justify-content-center">
                    <h2>EDM</h2>
                </Row>
                {generateList(props.EDMScores)}
            </Col>
        </Row>
        <Row style={{marginTop: "2%", marginBottom: "2%"}}> {/* High score lists for categories rock and hip-hop */}
            <Col style={{marginRight: "2%"}}>
                <Row className="justify-content-center">
                    <h2>Rock</h2>
                </Row>
                {generateList(props.rockScores)}
            </Col>
            <Col>
                <Row className="justify-content-center">
                    <h2>Hip-hop</h2>
                </Row>
                {generateList(props.hiphopScores)}
            </Col>
        </Row>
    </Container>);

// Sub-view to high score view that displays a high score list as a table
const generateList = (scores) => {
    return <Row className="tableBox justify-content-center">
        {scores.length === 0 ? <Spinner animation="border"/> :
        <Table striped borded="true" size="sm">
            <thead>
                <tr>
                <th>Rank</th>
                <th>Score</th>
                {scores[0].category != null ? <th>Category</th> : null}
                <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {scores.map((el, index) => <tr key={index}><td>{index+1}</td><td>{el.score}</td>{el.category != null ? <td>{el.category}</td> : null}<td>{el.name}</td></tr>)}
            </tbody>
        </Table>}
    </Row>;
};

export default HighScoreView;