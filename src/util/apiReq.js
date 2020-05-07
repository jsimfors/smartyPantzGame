import {getReqAuth, getReqSpec} from './apiConfig.js';

// The API-call regardless of question type
const getApiPlaylist = (category, setTrack1, setTrack2, setArtist1, setArtist2, questionType, mountedRef) => {
    
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

    return new Promise((resolve, reject) => {
        request.post(authOptions, function(error, response, body) {
            if (error) {
                reject('Could not connect to Spotify\'s API.');
            } else if (response.statusCode === 200) {
                var options = getReqSpec('playlists/' + playlistid, body.access_token);

                request.get(options, function(error, resp, body) {
                    if (error) reject('Could not get playlist data from API.' + error);
                    
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

                    if (questionType === 0) {
                        // If the upcoming question is a track question, we set the info about the new tracks
                        if (mountedRef.current) setTrack1(firstTrack);
                        else reject();
                        if (mountedRef.current) setTrack2(secondTrack);
                        else reject();
                        if (mountedRef.current) setArtist1(null);
                        else reject();
                        if (mountedRef.current) setArtist2(null);
                        else reject();
                        resolve();
                    } else {
                        // If the upcoming question is an artist question, we have to get artist specific data
                        var id1 = firstTrack.artists[0].id;
                        var id2 = secondTrack.artists[0].id;
                        getApiDataArtists(id1, id2, setArtist1, setArtist2, resolve, reject, mountedRef);
                    }
                });
            }
        });
    });
};

// API call for Artist-object
const getApiDataArtists = (id1, id2, setArtist1, setArtist2, resolve, reject, mountedRef) => {
    
    var [authOptions, request] = getReqAuth();
    
    request.post(authOptions, function(error, response, body) {
        if (error) {
            reject('Could not connect to Spotify\'s API.');
        } else if (response.statusCode === 200) {
            // Get and set info about the first artist
            var options = getReqSpec('artists/' + id1, body.access_token);
            request.get(options, function(err, resp, body) {
                if (err) reject('Could not get artist data from API.');
                else if (mountedRef.current) setArtist1({name: body.name, popularity: body.popularity, imgsrc: body.images[0].url});
                else reject();
            });

            // Get and set info about the second artist
            options = getReqSpec('artists/' + id2, body.access_token);
            request.get(options, function(err, resp, body) {
                if (err) reject('Could not get artist data from API.');
                else if (mountedRef.current) setArtist2({name: body.name, popularity: body.popularity, imgsrc: body.images[0].url});
                else reject();
            });
            resolve();
        }
    });
};

export {getApiPlaylist};