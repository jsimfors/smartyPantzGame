import {getReqAuth, getReqSpec} from './apiConfig.js';

// The API-call
function getApiPlaylist(category, setTrack1, setTrack2, setArtist1, setArtist2, questionType, setQuestionType){
    
    var [authOptions, request] = getReqAuth();
    
    // Get playlist id depending on category
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
        
        if (!error && response.statusCode === 200) {
            var options = getReqSpec('playlists/' + playlistid, body.access_token);
    
            request.get(options, function(err, resp, body) {
                    // Randomize a track
                    var i = Math.floor(Math.random()*100);
                    var firstTrack = body.tracks.items[i].track;
                    while (firstTrack === null) {
                        i = Math.floor(Math.random()*100);
                        firstTrack = body.tracks.items[i].track;
                    }

                    // Randomize a suitable second track
                    var j = Math.floor(Math.random()*100);
                    var secondTrack = body.tracks.items[j].track;
                    while (secondTrack === null || j === i || secondTrack.popularity === firstTrack.popularity || secondTrack.artists[0].id === firstTrack.artists[0].id) {
                        j = Math.floor(Math.random()*100);
                        secondTrack = body.tracks.items[j].track;
                    }

                    if (questionType === 'Track') {
                        setTrack1(firstTrack);
                        setTrack2(secondTrack);
                        setQuestionType('Track');
                    } else {
                        var id1 = firstTrack.artists[0].id;
                        var id2 = secondTrack.artists[0].id;
                        getApiDataArtists(id1, id2, setArtist1, setArtist2, setQuestionType);
                    }
            });
        }
    });
}

// API call for Artist-object
function getApiDataArtists(id1, id2, setArtist1, setArtist2, setQuestionType){
    
    var [authOptions, request] = getReqAuth();
    
    request.post(authOptions, function(error, response, body) {

        if (!error && response.statusCode === 200) {
            var options = getReqSpec('artists/' + id1, body.access_token);
            request.get(options, function(err, resp, body) {
                setArtist1({name: body.name, popularity: body.popularity, imgsrc: body.images[0].url});
            });

            options = getReqSpec('artists/' + id2, body.access_token);
            request.get(options, function(err, resp, body) {
                setArtist2({name: body.name, popularity: body.popularity, imgsrc: body.images[0].url});
            });

            setQuestionType('Artist');
        }
    });
}

export {getApiPlaylist};