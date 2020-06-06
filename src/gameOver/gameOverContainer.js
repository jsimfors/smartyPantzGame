import GameOverView from './gameOverView.js'
import {connect} from 'react-redux';
import React from 'react';
import {useHistory, useParams} from 'react-router-dom';

const GameOverContainer = (props) => {
    const history = useHistory();
    let {onHighscore} = useParams();
    
    const updateConfetti = (update) => {
        var element = document.getElementById("confettiParent");
        if (element) element.style.display = update;
    }

    React.useEffect(() => {
        // If the user is reloading they should be directed to start page
        if (props.username === "") {
            history.push('/');
            return;
        }

        // Set style depending on if the player made it on a high score list or not
        const body = document.getElementsByClassName("body")[0];
        if (onHighscore === "true") {
            body.id = 'winningBody';
            updateConfetti("block");
        } else {
            body.id = 'losingBody';
            updateConfetti("none");
        }
    }, []);

    return <GameOverView
        highscoreMessage = {onHighscore === "true" ?
            "Congratulations " + props.username + "! You made it on the highscore list :D" :
            "Sorry " + props.username + ", you didn't get on the highscore list :("}
        score = {props.score}
        goTo = {(path) => {
            updateConfetti("none");
            history.push(path);
        }}/>;
};

// Connect component to Redux store
const mapStateToProps = state => ({
    score: state.score,
    username: state.username
});

export default connect(mapStateToProps)(GameOverContainer);