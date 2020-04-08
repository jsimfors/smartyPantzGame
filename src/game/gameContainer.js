import React from 'react';
import GameView from './gameView.js';
import {client_id, client_secret} from '../util/apiConfig.js';
import {db} from '../util/dbConfig.js';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {setScore, setLives} from '../actions';
import PropTypes from 'prop-types';

const Game = (props) => {
    const history = useHistory();

    /* PLAYLIST VERSION */
    const [track1, setTrack1] = React.useState();
    const [track2, setTrack2] = React.useState();
    const [question, setQ] = React.useState(0);
    const [message, setMessage] = React.useState({ result:'r', text: '', img:'1'}); 
    //setMessage: result: r = right/ w = wrong/ t = time's up 
    // text: the text that's then displayed
    const [countdown, setCountdown] = React.useState(5);
    const [time, setTime] = React.useState(100);
    const [modalShow, setModalShow] = React.useState(false);
    const [statsMessage, setStatsMessage] = React.useState("");

    const nextQuestion = () => setQ(question + 1);

    // Start countdown and reset score and lives first time
    React.useEffect(() => {
        props.setScore(0);
        props.setLives(3);
        setCountdown(5);
        var i = 5;
        const interval = setInterval(() => {
            setCountdown(countdown => countdown - 1)
            --i;
            if (i === 0) {
                clearInterval(interval);
                setQ(question+1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Start timebar, load new question and load new stats
    React.useEffect(() => {
        if (countdown < 1 && !modalShow) {
            setTime(100);
            var i = 100;
            const interval = setInterval(() => {
                setTime(time => time - 1);
                --i;
                // delay of setTime()
                if (i === -5) {
                    clearInterval(interval);
                    checkAnswer(null, null, props.username, props.score, props.setScore, props.lives, props.setLives, setMessage, history, setModalShow);
                }
            }, 100);
            if (question > 4) {
                db.collection("highscore").orderBy("score").get()
                    .then((querySnapshot) => {
                        const scores = [];
                        querySnapshot.forEach((doc) => {
                            scores.push(doc.data().score);
                        });
                        setStatsMessage(calculatePercent(props.score, scores));
                    });
            }
            getApiPlaylist(props.category, client_id, client_secret, setTrack1, setTrack2);
            return () => clearInterval(interval);
        }
    }, [question, modalShow]);

    // Lives
    var opacity = [1, 1, 1];
    if (props.lives === 2) opacity = [1, 1, 0.5];
    else if (props.lives === 1) opacity = [1, 0.5, 0.5];

    return <GameView
        score={props.score}
        opacity = {opacity}
        track1={track1}
        track2={track2}
        checkAnswer={(trackChosen) => {
            if (trackChosen === track1) checkAnswer(trackChosen, track2, props.username, props.score, props.setScore, props.lives, props.setLives, setMessage, history, setModalShow);
            else checkAnswer(trackChosen, track1, props.username, props.score, props.setScore, props.lives, props.setLives, setMessage, history, setModalShow);
        }}
        message = {message}
        countdown= {countdown}
        time = {time}
        modalShow={modalShow}
        setModalShow={setModalShow}
        nextQuestion={nextQuestion}
        statsMessage={statsMessage}/>
}

Game.propTypes = {
    score: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    setScore: PropTypes.func.isRequired,
    setLives: PropTypes.func.isRequired
};

function getApiPlaylist(category, client_id, client_secret, setTrack1, setTrack2){
    console.log("fetch starting!");

    var i = Math.floor(Math.random()*100);
    var j = i;
    while (j === i) {
        j = Math.floor(Math.random()*100);
    }

    console.log('i starten är i ' +i);

    // your application requests authorization
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };
    var request = require('request'); // "Request" library
    
    console.log("authOptions is: " + authOptions);
    
    var playlistid;
    console.log(category);
    switch (category) {
        case "EDM":
            // EDM Hits 2020
            playlistid = '6KU6tm70eecXvDNITltN3h';
            break;
        case "Rock":
            // Rock Classics
            playlistid = '37i9dQZF1DWXRqgorJj26U';
            break;
        case "Hip-hop":
            // Get Turnt
            playlistid = '37i9dQZF1DWY4xHQp97fN6';
            break;
        default:
            playlistid = '4hvCIDjqQBWj8uz5jPntNf';
    }
    console.log(playlistid);

    request.post(authOptions, function(error, response, body) {
        console.log(error);
        console.log(response.statusCode);
        if (!error && response.statusCode === 200) {
            console.log("In the if-statement!");

            // use the access token to access the Spotify Web API
            var token = body.access_token;
            var options = {
                url: 'https://api.spotify.com/v1/playlists/' + playlistid,
                //url: 'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
    
            request.get(options, function(error, response, body) {
                // console.log("Body in fetch: ");
                // console.log(body);
                // console.log("Body.title in fetch: ");
                // console.log(body.id);

                //setPlaylist(body)
                //setTrack(body);
                console.log('här är bodyn: '+body);
                console.log(body);
                console.log('här är iet' + i);
                console.log("body.tracks... " + body.tracks.items[i]);
                setTrack1(body.tracks.items[i].track);
                setTrack2(body.tracks.items[j].track);
            });
            //return body
        }
    });
}

function checkAnswer(trackChosen, trackOther, username, score, setScore, lives, setLives, setMessage, history, setModalShow) {
    if (trackChosen !== null && trackChosen.popularity>trackOther.popularity) {
        setScore(score + 1);
        var i = Math.floor(Math.random() * 5) + 1;
        setMessage({result:'r', text: <div><i>{trackChosen.name}</i> has popularity <b>{trackChosen.popularity}%</b> and <i>{trackOther.name}</i> <b>{trackOther.popularity}%</b></div>, img: i});
        setModalShow(true)
        return true;
    } else {
        if (trackChosen !== null){ 
            var i = Math.floor(Math.random() * 6) + 1;
            setMessage({result: 'w', text: <div><i>{trackChosen.name}</i> has popularity <b>{trackChosen.popularity}%</b> and <i>{trackOther.name}</i> <b>{trackOther.popularity}%</b></div>, img: i});
        }        
        else setMessage({result: 't',text: <div>You didn't make it in time.</div>, img:'1'});

        if (lives > 1) {
            setLives(lives - 1);
        } else {
            db.collection("highscore").add({
                name: username,
                score: Number(score)
            });
            history.push('/gameover');
        }
        setModalShow(true);
        return false;
    }
}

function calculatePercent(currentScore, scores) {
    var length = scores.length;
    var lesserPoints = scores.findIndex((num) => currentScore <= num);
    var percent = 100 - Math.round(lesserPoints/length * 100);
    return "Keep it up! Only " + percent + " % has got this far!";
}

// Old function to get tracks
/*
function getApiData(id, client_id, client_secret, setTrack){
    console.log("fetch starting!")
    // your application requests authorization
    var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
    };
    var request = require('request'); // "Request" library
    console.log("authOptions is: " + authOptions)
  
    request.post(authOptions, function(error, response, body) {
        console.log(error)
        console.log(response.statusCode)
    if (!error && response.statusCode === 200) {
        console.log("In the if-statement!")
        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
          url: 'https://api.spotify.com/v1/tracks/' + id,
        //url: 'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
        };
  
        request.get(options, function(error, response, body) {
            console.log("Body in fetch: ");
            console.log(body);

            setTrack(body)
            //setTrack(body);
  
  
        });
        //return body
        }
    });
}
*/

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

export default connect(mapStateToProps, mapDispatchToProps)(Game);
