import React from 'react';
//import { FirebaseContext } from '../firebase';
import HighScoreView from './highScoreView';
import * as app from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAbWEE-X5hskw_9wvYfoixZoKnPRl9xQBw",
    authDomain: "smartypantz-c6131.firebaseapp.com",
    databaseURL: "https://smartypantz-c6131.firebaseio.com",
    projectId: "smartypantz-c6131",
    storageBucket: "smartypantz-c6131.appspot.com",
    messagingSenderId: "888130110269",
    appId: "1:888130110269:web:dcae88f6c62d5e22867b54",
    measurementId: "G-R2GE08FY8L"
};

app.initializeApp(config);
const db = app.firestore();

const HighScoreContainer = () => {
    const [rows, setRows] = React.useState([]);
    React.useEffect(()=>{
        getHighScores(setRows);
    }, []);
    return <HighScoreView onAdd={addToDB} highScores={rows}/>;
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

const addToDB = (event) => {
    event.preventDefault();
    var name = event.target.elements["name"].value;
    var score = Number(event.target.elements["score"].value);
    db.collection("highscore").add({
        name: name,
        score: score
    });
}

export default HighScoreContainer;