import React from 'react';
import {useHistory} from 'react-router-dom';

import GameView from './gameView.js'
import {client_id, client_secret} from '../util/apiConfig.js';

const Game = (props) => {

    /* PLAYLIST VERSION */

    var playlistid = '1Invdu6HejW05i65d0UCTE';
    const [track1, setTrack1] = React.useState();
    const [track2, setTrack2] = React.useState();
    const [question, setQ] = React.useState(1);
    const [message, setMessage] = React.useState('');
    
    
    React.useEffect( () => {
        getApiPlaylist(playlistid, client_id, client_secret, setTrack1, setTrack2)
    },[question, playlistid])

    // Lives
    var opacity = [1, 1, 1];
    if (props.model.getLives() === 2) opacity = [1, 1, 0.5];
    else if (props.model.getLives() === 1) opacity = [1, 0.5, 0.5];

    const history = useHistory();

    return <GameView
        model={props.model}
        track1={track1}
        track2={track2}
        checkAnswer={(trackChosen) => {
            if (trackChosen === track1) checkAnswer(trackChosen, track2, props.model, setQ, question, setMessage, history);
            else checkAnswer(trackChosen, track1, props.model, setQ, question, setMessage, history);
        }}
        opacity = {opacity}
        message = {message}
        />
}

function getApiPlaylist(playlistid, client_id, client_secret, setTrack1, setTrack2){
    console.log("fetch starting!")

    var i = Math.floor(Math.random()*100)
    var j = Math.floor(Math.random()*100)

    
    console.log('i starten är i ' +i)
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
            console.log('här är bodyn: '+body)
            console.log(body)
            console.log('här är iet' + i)
            console.log("body.tracks... " + body.tracks.items[i]);
            setTrack1(body.tracks.items[i].track);
            setTrack2(body.tracks.items[j].track);
  
  
        });
        //return body
        }
    });
  }



function checkAnswer(trackChosen, trackOther, model, setQ, question, setMessage, history){
    if(trackChosen.popularity>trackOther.popularity){
        setQ(question + 1);
        setMessage('Rätt');
        return true
    }else{
        setMessage('Fel');
        if(model.getLives()>1){
            model.decrementLives();
            setQ(question + 1);
        }else{
            history.push('/gameover');
        }
        return false
    }
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


export default Game;
