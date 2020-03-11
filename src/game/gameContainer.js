import React from 'react';
import GameView from './gameView.js'
import {client_id, client_secret} from '../util/apiConfig.js';


const Game = () => {

    //var request = require('request'); // "Request" library
    var id1 = "2TpxZ7JUBn3uw46aR7qd6V";
    var id2 = "11dFghVXANMlKmJXsNCbNl";
    const [track1, setTrack1] = React.useState();
    const [track2, setTrack2] = React.useState();


    React.useEffect( () => {
        getApiData(id1, client_id, client_secret, setTrack1)
        getApiData(id2, client_id, client_secret, setTrack2)

        //getApiData2(id2, client_id, client_secret, setTrack2)

    }, [id1, id2])



    return <GameView
        track1={track1}
        track2={track2}

        //track={track}
        />
}


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

/*
const Game = () => {
    


    return <GameView
    body={body}/>
}
*/

export default Game;
