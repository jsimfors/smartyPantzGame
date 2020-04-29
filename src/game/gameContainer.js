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
    const [artist1, setArtist1] = React.useState({name:'', popularity:'', imgsrc:''});
    const [artist2, setArtist2] = React.useState({name:'', popularity:'', imgsrc:''});

    const [questionType, setQuestionType] = React.useState('Track');

    // result: r = right/ w = wrong/ t = time's up 
    // text: the text that's then displayed
    const [message, setMessage] = React.useState({ result:'r', text: '', img:'1'}); 

    const [countdown, setCountdown] = React.useState(5);
    const [time, setTime] = React.useState(100);
    const [modalShow, setModalShow] = React.useState(null);
    const [statsMessage, setStatsMessage] = React.useState("");
    
    // When game mode in entered
    // Start countdown and reset score and lives
    React.useEffect(() => {
        // If the user is reloading they should be directed to start page
        if (props.username === "") history.push('/');

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
        if (countdown < 1 && !modalShow) {
            if (Math.floor(Math.random()*2)<1) {
                getApiPlaylist(props.category, setTrack1, setTrack2, setArtist1, setArtist2, "Track", setQuestionType);
            } else {
                getApiPlaylist(props.category, setTrack1, setTrack2, setArtist1, setArtist2, "Artist", setQuestionType);
            }
            
            setTime(100);
            var i = 100;
            const interval = setInterval(() => {
                setTime(time => time - 1);
                --i;
                // delay of setTime() is approx. 5 ms
                if (i === -5) {
                    // Time ran out
                    clearInterval(interval);
                    setMessage({result: 't', text: <div>You didn't make it in time.</div>, img:'1'});
                    if (props.lives > 1) {
                        props.setLives(props.lives - 1);
                    } else {
                        db.collection("highscore").add({
                            name: props.username,
                            category: props.category,
                            score: Number(props.score)
                        });
                        history.push('/gameover');
                    }
                    setModalShow(true);
                }
            }, 100);
            db.collection("highscore").where("category", "==", props.category).orderBy("score").get()
                .then((querySnapshot) => {
                    const scores = [];
                    querySnapshot.forEach((doc) => {
                        scores.push(doc.data().score);
                    });
                    setStatsMessage(calculatePercent(props.score, scores));
                });
            return () => clearInterval(interval);
        }
    }, [modalShow]);

    // Lives
    var opacity = [1, 1, 1];
    if (props.lives === 2) opacity = [1, 1, 0.5];
    else if (props.lives === 1) opacity = [1, 0.5, 0.5];

    return <GameView
        score={props.score}
        opacity = {opacity}
        track1={track1}
        track2={track2}
        artist1={artist1}
        artist2={artist2}
        checkAnswer={(trackChosen, trackOther) => {
            checkAnswer(trackChosen, trackOther, props.username, props.category, props.score, props.setScore, props.lives, props.setLives, setMessage, history, setModalShow);
        }}
        message = {message}
        countdown= {countdown}
        time = {time}
        modalShow={modalShow}
        setModalShow={setModalShow}
        statsMessage={statsMessage}
        category={props.category}
        questionType={questionType}
        />
}

GameContainer.propTypes = {
    score: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    setScore: PropTypes.func.isRequired,
    setLives: PropTypes.func.isRequired
};

function checkAnswer(trackChosen, trackOther, username, category, score, setScore, lives, setLives, setMessage, history, setModalShow) {
    if (trackChosen.popularity>=trackOther.popularity) {
        // Correct
        setScore(score + 1);
        var i = Math.floor(Math.random() * 5) + 1;
        setMessage({result:'r', text: <div><i>{trackChosen.name}</i> has popularity <b>{trackChosen.popularity}%</b> and <i>{trackOther.name}</i> <b>{trackOther.popularity}%</b></div>, img: i});
        setModalShow(true);
    } else if (lives > 1) {
        // Incorrect but has lives left
        setLives(lives - 1);
        var i = Math.floor(Math.random() * 6) + 1;
        setMessage({result: 'w', text: <div><i>{trackChosen.name}</i> has popularity <b>{trackChosen.popularity}%</b> and <i>{trackOther.name}</i> <b>{trackOther.popularity}%</b></div>, img: i});
        setModalShow(true);
    } else {
        // Incorrect and out of lives
        db.collection("highscore").add({
            name: username,
            category,
            score: Number(score)
        });
        history.push('/gameover');
    }
}

function calculatePercent(currentScore, scores) {
    var lesserPoints = scores.findIndex((num) => currentScore <= num);
    var percent = 100 - Math.round(lesserPoints/scores.length * 100);
    if (percent < 50) return "Keep it up! Only " + percent + " % has got this far in this category!";
    else return "";
}

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
