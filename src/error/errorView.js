import React from 'react';
import {Button} from 'react-bootstrap';

const ErrorView = (props) => (
    <div style={{marginTop: "10%", textAlign: "center"}}>
    <h5>Something went wrong :(</h5>
    <details style={{ whiteSpace: 'pre-wrap' }}>
        <h5>Error: {props.errMessage}</h5>
    </details>
    <Button style={{marginTop: "2%"}} variant="outline-danger" onClick={props.toStart}>
        BACK TO START
    </Button>
    </div>);

export default ErrorView;