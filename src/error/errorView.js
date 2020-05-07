import React from 'react';
import {Button} from 'react-bootstrap';
import {useHistory} from "react-router-dom";

const ErrorView = (props) => {
    const history = useHistory();
    return (
        <div style={{marginTop: "10%", textAlign: "center"}}>
        <h5>Something went wrong :(</h5>
        <details style={{ whiteSpace: 'pre-wrap' }}>
            <h5>Error: {props.errMessage}</h5>
        </details>
        <Button style={{marginTop: "2%"}} variant="outline-danger" onClick={() => history.push('/')}>
            BACK TO START
        </Button>
        </div>);
}

export default ErrorView;