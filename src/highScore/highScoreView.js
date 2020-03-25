import React from 'react';
import {Col, Row, Image, Table, Container} from 'react-bootstrap';


function HighScoreView({onAdd, highScores}) {
    const h = React.createElement;

    return (
        <Container className="highScoreView">
        <Row> 
      <Col>
      <Image src={"https://i.imgur.com/nbrayQO.png"} alt="" />
      </Col>
    </Row>
    <Row className="tableBox">
        <Table striped borded="true" size="sm">
        <thead>
            <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            </tr>
        </thead>
        <tbody>
            {highScores.map(({score, name}, index) => <tr key={index}><td>{index+1}</td><td>{score}</td><td>{name}</td></tr>)}
        </tbody>
        </Table>
        </Row>
        <Row>
        <h4>Add to database</h4>
        {h("form", {onSubmit: onAdd},
            h("label", {key:"name"}, "Name:", h("input", {type:"text", name:"name"})),
            h("label", {key:"score"}, "Score:", h("input", {type:"text", name:"score"})),
            h("input", {key:"submit", type:"submit", value:"Add"})
        )}
        </Row>
    </Container>)
    
    
    
    
    // <div>
    //     <h2>THE 10 MOST SMARTYPANTZ</h2>
    //     <table>
    //         <tbody>
    //             <tr><th>Rank</th><th>Score</th><th>Name</th></tr>
    //             {highScores.map(({score, name}, index) => <tr key={index}><td>{index+1}</td><td>{score}</td><td>{name}</td></tr>)}
    //         </tbody>
    //     </table>
    //     <h4>Add to database</h4>
    //     {h("form", {onSubmit: onAdd},
    //         h("label", {key:"name"}, "Name:", h("input", {type:"text", name:"name"})),
    //         h("label", {key:"score"}, "Score:", h("input", {type:"text", name:"score"})),
    //         h("input", {key:"submit", type:"submit", value:"Add"})
    //     )}
    // </div>);
}

export default HighScoreView;