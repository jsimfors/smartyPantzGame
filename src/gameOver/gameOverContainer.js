import GameOverView from './gameOverView.js'
import {connect} from 'react-redux';
import React from 'react';
import {db} from '../util/dbConfig.js';
import {useHistory} from 'react-router-dom';

const GameOverContainer = (props) => {
    const history = useHistory();
    const [highscoreMessage, setHighscoreMessage] = React.useState("");

    React.useEffect(()=>{
        // If the user is reloading they should be directed to start page
        if (props.username === "") history.push('/');

        db.collection("highscore").where("category", "==", props.category).orderBy("score", "desc").limit(10).get()
        .then((querySnapshot) => {
            var queryDocs = querySnapshot.docs;
            var lastDoc = queryDocs[queryDocs.length - 1];
            var tenthScore = lastDoc.data().score;
            setHighscoreMessage(getHighscoreMessage(props.score, tenthScore));
        });
    }, []);
    return <GameOverView highscoreMessage={highscoreMessage}
    score={props.score}/>;
};

function getHighscoreMessage(currentScore, tenthScore) {
    var body = document.getElementsByClassName("body")[0];
    console.log(body.id)

    var message = "";
    if (currentScore > tenthScore) {
        message = "Congratulations, you made it to the highscore list :D";
        body.id = 'winningBody';
        var i;
        for (i = 0; i < 20; i++) {
            var confettiPiece = document.createElement("div");
            confettiPiece.className = "confetti"
            body.insertBefore(confettiPiece, body.firstChild)
        }
    } else {
        message = "Sadly you didn't get on the highscore list :(";
        body.id = 'losingBody';
    }
    return message;
}




const mapStateToProps = state => ({
    score: state.score,
    username: state.username,
    category: state.category
});

export default connect(mapStateToProps)(GameOverContainer);