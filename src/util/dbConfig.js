import * as app from 'firebase/app';
import 'firebase/firestore';

const dbConfig = {
    apiKey: "AIzaSyAbWEE-X5hskw_9wvYfoixZoKnPRl9xQBw",
    authDomain: "smartypantz-c6131.firebaseapp.com",
    databaseURL: "https://smartypantz-c6131.firebaseio.com",
    projectId: "smartypantz-c6131",
    storageBucket: "smartypantz-c6131.appspot.com",
    messagingSenderId: "888130110269",
    appId: "1:888130110269:web:dcae88f6c62d5e22867b54",
    measurementId: "G-R2GE08FY8L"
};

app.initializeApp(dbConfig);
const db = app.firestore();

export {db};