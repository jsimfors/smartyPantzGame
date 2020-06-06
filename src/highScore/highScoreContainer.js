import React from 'react';
import HighScoreView from './highScoreView';
import ErrorView from '../error/errorView';
import {db} from '../util/dbConfig.js';
import {useHistory} from 'react-router-dom';

const HighScoreContainer = () => {
    const history = useHistory();
    const [allScores, setAllScores] = React.useState([]);
    const [hitsScores, setHitsScores] = React.useState([]);
    const [EDMScores, setEDMScores] = React.useState([]);
    const [rockScores, setRockScores] = React.useState([]);
    const [hiphopScores, setHiphopScores] = React.useState([]);
    const [errMessage, setErrMessage] = React.useState('');

    React.useEffect(()=>{
        // Make sure the background is correct
        document.getElementsByClassName("body")[0].id = 'HitsBody';

        // Fetch all highscore lists from the database
        getAllScores(setAllScores, setErrMessage);
        getCategoryScores(setHitsScores, "Hits", setErrMessage);
        getCategoryScores(setEDMScores, "EDM", setErrMessage);
        getCategoryScores(setRockScores, "Rock", setErrMessage);
        getCategoryScores(setHiphopScores, "Hip-hop", setErrMessage);
    }, []);
    
    if (errMessage) {
        return <ErrorView errMessage={errMessage}/>;
    } else {
        return <HighScoreView
            allScores = {allScores}
            hitsScores = {hitsScores}
            EDMScores = {EDMScores}
            rockScores = {rockScores}
            hiphopScores = {hiphopScores}
            toStart = {() => {
                history.push('/');
                document.getElementsByClassName("body")[0].id = 'CategoryBody';
            }}/>;
    }
};

// Get high score list for all categories and update the state
const getAllScores = (setAllScores, setErrMessage) => {
    let timeout = new Promise((resolve, reject) => {
        setTimeout(reject, 10000, {message: 'The request timed out.'});
    });

    Promise.race([db.collection("highscore").orderBy("score", "desc").limit(10).get(), timeout])
        .then((querySnapshot) => {
            if (querySnapshot.empty) throw new Error("Empty query result.");
            const rows = [];
            querySnapshot.forEach((doc) => {
                rows.push({score: doc.data().score, category: doc.data().category, name: doc.data().name});
            });
            setAllScores(rows);
        })
        .catch(err => setErrMessage("Could not get high score data from database. " + err.message));
};

// Get high score list for a specific categories and update that state
const getCategoryScores = ( setScoreList, category, setErrMessage ) => {
    let timeout = new Promise((resolve, reject) => {
        setTimeout(reject, 10000, {message: 'The request timed out.'});
    });

    Promise.race([db.collection("highscore").where("category", "==", category).orderBy("score", "desc").limit(10).get(), timeout])
        .then((querySnapshot) => {
            if (querySnapshot.empty) throw new Error("Empty query result.");
            const rows = [];
            querySnapshot.forEach((doc) => {
                rows.push({score: doc.data().score, name: doc.data().name});
            });
            setScoreList(rows);
        })
        .catch(err => setErrMessage("Could not get high score data from database. " + err.message));
};

export default HighScoreContainer;