import GameOverView from './gameOverView.js'
import {connect} from 'react-redux';
import React from 'react';
import {db} from '../util/dbConfig.js';

const GameOverContainer = (props) => {
    const [highscoreMessage, setHighscoreMessage] = React.useState("");
    React.useEffect(()=>{
        db.collection("highscore").orderBy("score", "desc").limit(10).get()
        .then((querySnapshot) => {
            var queryDocs = querySnapshot.docs;
            var lastDoc = queryDocs[queryDocs.length - 1];
            var tenthScore = lastDoc.data().score;
            setHighscoreMessage(getHighscoreMessage(props.score, tenthScore));
        });
    }, []);
    return <GameOverView highscoreMessage={highscoreMessage}/>;
};

function getHighscoreMessage(currentScore, tenthScore) {
    var message = "";
    if (currentScore > tenthScore) {
        message = "Congratulations, you got on the highscore list! :D";
    } else {
        message = "Sadly you didn't get on the highscore list. :(";
    }
    return message;
}

const mapStateToProps = state => ({
    score: state.score,
});

export default connect(mapStateToProps)(GameOverContainer);