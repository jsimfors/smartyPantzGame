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


    /* GUESS TRACK VERSION */
    const [track1, setTrack1] = React.useState();
    const [track2, setTrack2] = React.useState();

    /* GUESS ARTIST VERSION */
    const [artist1, setArtist1] = React.useState({name:'', popularity:'', imgsrc:''});
    const [artist2, setArtist2] = React.useState({name:'', popularity:'', imgsrc:''});

    const [question, setQ] = React.useState(0);
    const [questionType, setQuestionType] = React.useState('Track');

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

    // For every new question:

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
                    checkAnswer(null, null, props.username, props.category, props.score, props.setScore, props.lives, props.setLives, setMessage, history, setModalShow);
                }
            }, 100);
            if (question > 4) {
                db.collection("highscore").orderBy("score").get()
                    .then((querySnapshot) => {
                        const scores = [];
                        querySnapshot.forEach((doc) => {
                            if (doc.data().category == props.category) scores.push(doc.data().score);
                        });
                        setStatsMessage(calculatePercent(props.score, scores));
                    });
            }
            getApiPlaylist(props.category, client_id, client_secret, setTrack1, setTrack2, setArtist1, setArtist2, questionType);
            return () => clearInterval(interval);
        }
    }, [question, modalShow]);

    // Randomize type of question
    React.useEffect(() => { 
        if(Math.floor(Math.random()*2)<1){
            setQuestionType("Track");
        }else{
            setQuestionType("Artist");
        }
    }, [question] );


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
        nextQuestion={nextQuestion}
        statsMessage={statsMessage}
        category={props.category}
        questionType={questionType}
        />
}

Game.propTypes = {
    score: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    setScore: PropTypes.func.isRequired,
    setLives: PropTypes.func.isRequired
};




// The API-call
function getApiPlaylist(category, client_id, client_secret, setTrack1, setTrack2, setArtist1, setArtist2, questionType){

    var i = Math.floor(Math.random()*100);
    var j = i;
    while (j === i) {
        j = Math.floor(Math.random()*100);
    }

    // Application requests authorization
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
    
    
    var playlistid;
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

    request.post(authOptions, function(error, response, body) {
        // console.log(error);
        // console.log(response.statusCode);
        if (!error && response.statusCode === 200) {
            // use the access token to access the Spotify Web API
            var token = body.access_token;
            var options = {
                url: 'https://api.spotify.com/v1/playlists/' + playlistid,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
    
            request.get(options, function(error, response, body) {
                    setTrack1(body.tracks.items[i].track);
                    setTrack2(body.tracks.items[j].track);
                    var id1=body.tracks.items[i].track.artists[0].id
                    var id2=body.tracks.items[j].track.artists[0].id
                    getApiDataArtist(client_id, client_secret, id1, setArtist1)
                    getApiDataArtist(client_id, client_secret, id2, setArtist2)
            });
            //return body
        }
    });
}

function checkAnswer(trackChosen, trackOther, username, category, score, setScore, lives, setLives, setMessage, history, setModalShow) {

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
        else {
            setMessage({result: 't',text: <div>You didn't make it in time.</div>, img:'1'});   
        }

        if (lives > 1) {
            setLives(lives-1);
        } else {
            db.collection("highscore").add({
                name: username,
                category,
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
    return "Keep it up! Only " + percent + " % has got this far in this category!";
}

// API call for Artist-object
function getApiDataArtist(client_id, client_secret, artistId, setArtist){
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
  
    request.post(authOptions, function(error, response, body) {
        console.log(error)
        console.log(response.statusCode)
    if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
          url: 'https://api.spotify.com/v1/artists/' + artistId,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
        };
  
        request.get(options, function(error, response, body) {
            setArtist({name: body.name, popularity: body.popularity, imgsrc: body.images[0].url});
        });
        }
    });
}

// Old function to get tracks
/*
function getApiData(id, client_id, client_secret, setTrack){
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
  
    request.post(authOptions, function(error, response, body) {
        console.log(error)
        console.log(response.statusCode)
    if (!error && response.statusCode === 200) {
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
