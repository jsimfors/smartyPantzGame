import React from 'react';
import HighScoreView from './highScoreView';
import {db} from '../util/dbConfig.js';

const HighScoreContainer = () => {
    const [rows, setRows] = React.useState([]);
    React.useEffect(()=>{
        getHighScores(setRows);
    }, []);
    return <HighScoreView highScores={rows}/>;
};

const getHighScores = (setRows) => {
    db.collection("highscore").orderBy("score", "desc").limit(10).get()
        .then((querySnapshot) => {
            const allRows = [];
            querySnapshot.forEach((doc) => {
                allRows.push({score: doc.data().score, name: doc.data().name});
            });
            setRows(allRows);
        });
}

export default HighScoreContainer;