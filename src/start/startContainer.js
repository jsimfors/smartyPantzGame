import React from 'react';
import StartView from './startView.js'

const Start = (props) => {
    const [username, setUsername] = React.useState("");
    return <StartView model={props.model} username={username} setUsername={setUsername}
    />
}

export default Start;