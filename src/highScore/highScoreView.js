import React from 'react';
import {Col, Row, Image, Table, Container, Button, Spinner} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

const HighScoreView = (props) => {
    const history = useHistory();

    return (
        <Container className="highScoreView">
            <Row style={{marginTop: "2%"}}>
                <Col md={{span:2, offset:0}}>
                    <Row style={{marginTop: "30%"}}>
                        <Button variant="outline-danger" onClick={function(e)
                            { history.push('/'); 
                            document.getElementsByClassName("body")[0].id = 'CategoryBody'
                            }}>BACK TO START
                        </Button>
                    </Row>
                </Col>
                <Col md={{span:8, offset:0}}>
                    <Image src={"https://i.imgur.com/nbrayQO.png"} alt="" />
                </Col>
            </Row>
            <Row style={{marginTop: "4%"}}>
                <Col md={{span:6, offset:3}}>
                    <Row className="justify-content-center">
                        <h2>All categories</h2>
                    </Row>
                    {generateList(props.allScores)}
                </Col>
            </Row>
            <Row style={{marginTop: "2%"}}>
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
            <Row style={{marginTop: "2%", marginBottom: "2%"}}>
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
}

const generateList = (scores) => {
    return <Row className="tableBox justify-content-center">
        {scores.length === 0 ? <Spinner animation="border"/> :
        <Table striped borded="true" size="sm">
            <thead>
                <tr>
                <th>Rank</th>
                <th>Score</th>
                <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {scores.map(({score, name}, index) => <tr key={index}><td>{index+1}</td><td>{score}</td><td>{name}</td></tr>)}
            </tbody>
        </Table>}
    </Row>
}

export default HighScoreView;