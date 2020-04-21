import React from 'react';
import HighScoreView from './highScoreView';
import {db} from '../util/dbConfig.js';

const HighScoreContainer = () => {
    const [allScores, setAllScores] = React.useState([]);
    const [hitsScores, setHitsScores] = React.useState([]);
    const [EDMScores, setEDMScores] = React.useState([]);
    const [rockScores, setRockScores] = React.useState([]);
    const [hiphopScores, setHiphopScores] = React.useState([]);
    React.useEffect(()=>{
        getAllScores(setAllScores);
        getCategoryScores(setHitsScores, "Hits");
        getCategoryScores(setEDMScores, "EDM");
        getCategoryScores(setRockScores, "Rock");
        getCategoryScores(setHiphopScores, "Hip-hop");
    }, []);
    return <HighScoreView
            allScores={allScores}
            hitsScores={hitsScores}
            EDMScores={EDMScores}
            rockScores={rockScores}
            hiphopScores={hiphopScores}
            />;
};

const getAllScores = (setAllScores) => {
    db.collection("highscore").orderBy("score", "desc").limit(10).get()
        .then((querySnapshot) => {
            const rows = [];
            querySnapshot.forEach((doc) => {
                rows.push({score: doc.data().score, name: doc.data().name});
            });
            setAllScores(rows);
        });
}

const getCategoryScores = (setScoreList, category) => {
    db.collection("highscore").where("category", "==", category).orderBy("score", "desc").limit(10).get()
        .then((querySnapshot) => {
            const rows = [];
            querySnapshot.forEach((doc) => {
                rows.push({score: doc.data().score, name: doc.data().name});
            });
            setScoreList(rows);
        });
}

export default HighScoreContainer;