import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import {Provider} from 'react-redux';
//import {createStore} from 'redux';
//import reducer from 'GameModel';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import { FirebaseContext } from './firebase';

//const store = createStore(reducer);
//<Provider store = {store}></Provider>
//</Provider>

//<FirebaseContext.Provider value={db}>
//</FirebaseContext.Provider>

// To deploy, run 'yarn build' and then 'firebase deploy'

ReactDOM.render(
    <App />
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
