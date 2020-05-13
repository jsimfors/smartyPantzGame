import React from 'react';
import GameView from './gameView.js';
import {getApiPlaylist} from '../util/apiReq.js';
import {db} from '../util/dbConfig.js';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {setScore, setLives} from '../actions';
import PropTypes from 'prop-types';

const GameContainer = (props) => {
    const history = useHistory();

    /* GUESS TRACK VERSION */
    const [track1, setTrack1] = React.useState();
    const [track2, setTrack2] = React.useState();

    /* GUESS ARTIST VERSION */
    const [artist1, setArtist1] = React.useState(null);
    const [artist2, setArtist2] = React.useState(null);

    // result: r = right/ w = wrong/ t = time's up 
    // text: the text that's then displayed
    const [message, setMessage] = React.useState({ result:'r', text: '', img:'1'}); 
    
    const [errMessage, setErrMessage] = React.useState('');
    const [countdown, setCountdown] = React.useState(5);
    const [time, setTime] = React.useState(100);
    const [modalShow, setModalShow] = React.useState(null);
    const [statsMessage, setStatsMessage] = React.useState("");
    const [gameoverpath, setGameOverPath] = React.useState(null);
    const mountedRef = React.useRef(false);
    
    // When game mode in entered
    // Start countdown and reset score and lives
    React.useEffect(() => {
        // If the user is reloading they should be directed to start page
        if (props.username === "") history.push('/');

        // Reset score, lives and start count down
        props.setScore(0);
        props.setLives(3);
        setCountdown(5);
        var i = 5;
        const interval = setInterval(() => {
            setCountdown(countdown => countdown - 1)
            --i;
            if (i === 0) {
                clearInterval(interval);
                setModalShow(false);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // For every new question:
    // Start timebar, load new question and load new stats
    React.useEffect(() => {
        var interval;
        mountedRef.current = true;
        if (countdown < 1 && !modalShow) {
            // Update question data like images, names and question
            getApiPlaylist(props.category, setTrack1, setTrack2, setArtist1, setArtist2, Math.floor(Math.random()*2), mountedRef)
                .then(() => {
                    // Start timebar
                    if (mountedRef.current) setTime(100);
                    var i = 100;
                    interval = setInterval(() => {
                        if (mountedRef.current) setTime(time => time - 1);
                        --i;
                        // delay of setTime() is approx. 5 ms
                        if (i === -5) {
                            // Time ran out
                            clearInterval(interval);
                            if (mountedRef.current) setMessage({result: 't', text: <div>You didn't make it in time.</div>, img:'1'});
                            // If the player is out of lives, call outOfLives() and prevent the player to go to another question
                            if (props.lives === 1) outOfLives(props.username, props.category, props.score, setGameOverPath, setErrMessage, setModalShow, mountedRef);
                            else if (mountedRef.current) setModalShow(true);
                            props.setLives(props.lives - 1);
                        }
                    }, 100);
                    // Update statistic message
                    db.collection("highscore").where("category", "==", props.category).orderBy("score").get()
                        .then((querySnapshot) => {
                            const scores = [];
                            querySnapshot.forEach((doc) => {
                                scores.push(doc.data().score);
                            });
                            if (mountedRef.current) setStatsMessage(calculatePercent(props.score, scores));
                        })
                        .catch(() => {});
                })
                .catch(err => {if (mountedRef.current) setErrMessage(err)});
        }
        return () => {
            clearInterval(interval);
            mountedRef.current = false;
        };
    }, [modalShow]);

    // Lives
    var opacity = [1, 1, 1];
    if (props.lives === 2) opacity = [1, 1, 0.5];
    else if (props.lives === 1) opacity = [1, 0.5, 0.5];
    else if (props.lives === 0) opacity = [0.5, 0.5, 0.5];

    return <GameView
        score = {props.score}
        opacity = {opacity}
        track1 = {track1}
        track2 = {track2}
        artist1 = {artist1}
        artist2 = {artist2}
        checkAnswer = {(trackChosen, trackOther) => {
            checkAnswer(trackChosen, trackOther, props.username, props.category, props.score, props.setScore, props.lives, props.setLives, setMessage, setModalShow, setGameOverPath, setErrMessage);
        }}
        message = {message}
        countdown = {countdown}
        time = {time}
        modalShow = {modalShow}
        setModalShow = {setModalShow}
        statsMessage = {statsMessage}
        category = {props.category}
        errMessage = {errMessage}
        gameoverpath = {gameoverpath}
        name = {props.username}
        ref = {mountedRef}/>
}

// Define proptypes
GameContainer.propTypes = {
    score: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    setScore: PropTypes.func.isRequired,
    setLives: PropTypes.func.isRequired
};

// When the player has clicked on a track/an artist, we check the answer
const checkAnswer = (trackChosen, trackOther, username, category, score, setScore, lives, setLives, setMessage, setModalShow, setGameOverPath, setErrMessage) => {
    if (trackChosen.popularity>=trackOther.popularity) {
        // Correct
        setScore(score + 1);
        var i = Math.floor(Math.random() * 5) + 1;
        setMessage({
            result:'r',
            text: <div><i>{trackChosen.name}</i> has popularity <b>{trackChosen.popularity}%</b> and <i>{trackOther.name}</i> <b>{trackOther.popularity}%</b></div>,
            img: i
        });
        setModalShow(true);
    } else {
        // Incorrect
        if (lives === 1) outOfLives(username, category, score, setGameOverPath, setErrMessage, setModalShow, {current: true})
        else setModalShow(true);
        setLives(lives - 1);
        var j = Math.floor(Math.random() * 6) + 1;
        setMessage({
            result: 'w',
            text: <div><i>{trackChosen.name}</i> has popularity <b>{trackChosen.popularity}%</b> and <i>{trackOther.name}</i> <b>{trackOther.popularity}%</b></div>,
            img: j
        });
    }
};

// When game is over (answers incorrectly and is out of lives)
const outOfLives = (name, category, score, setGameOverPath, setErrMessage, setModalShow, mountedRef) => {
    // Add the score to the database
    db.collection("highscore").add({
        name,
        category,
        score: Number(score)
    })
        .then(() => {
            // Determine whether the user will make it on a high score list or not and send them to the game over page
            db.collection("highscore").where("category", "==", category).orderBy("score", "desc").limit(10).get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) throw new Error("Empty query result.");
                var queryDocs = querySnapshot.docs;
                var tenthScore = queryDocs[queryDocs.length - 1].data().score;
                if (score > tenthScore && mountedRef.current) setGameOverPath('/gameover/true');
                else if (mountedRef.current) setGameOverPath('/gameover/false');
            })
            .then(() => setModalShow(true))
            .catch(error => {if (mountedRef.current) setErrMessage("Could not get high score data from database. " + error.message)});
        })
        .catch((error) => {if (mountedRef.current) setErrMessage("Could not add to database. " + error.message)}); 
};

// Calculate how many percent of players that have made it this far and return statistic message
const calculatePercent = (currentScore, scores) => {
    var lesserPoints = scores.findIndex((num) => currentScore <= num);
    var percent = 100 - Math.round(lesserPoints/scores.length * 100);
    if (percent < 50) return "Keep it up! Only " + percent + " % has got this far in this category!";
    else return "";
};

// Connect component to Redux store
const mapStateToProps = state => ({
    score: state.score,
    lives: state.lives,
    category: state.category,
    username: state.username
});

const mapDispatchToProps = dispatch => ({
    setScore: score => dispatch(setScore(score)),
    setLives: lives => dispatch(setLives(lives))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
