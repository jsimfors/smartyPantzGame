import {createStore} from 'redux';

const SET_USERNAME = 'SET_USERNAME';
const SET_SCORE = 'SET_SCORE';
const SET_LIVES = 'SET_LIVES';
const defaultLives = 3;

const store= createStore(reducer);

class GameModel {
    addObserver(callback){
        this.lastObserver = store.subscribe(()=>
        callback(this.lastAction));                                             
    }
    setUsername(name){
        store.dispatch(this.lastAction={ type: SET_USERNAME, username: name });
    }
    getUsername(){
        return store.getState().username;
    }
    incrementScore(){
        store.dispatch(this.lastAction={ type: SET_SCORE, score: store.getState().score + 1 });
    }
    resetScore(){
        store.dispatch(this.lastAction={ type: SET_SCORE, score: 0 });
    }
    getScore(){
        return store.getState().score;
    }
    decrementLives(){
        store.dispatch(this.lastAction={ type: SET_LIVES, lives: store.getState().lives - 1 });
    }
    resetLives(){
        store.dispatch(this.lastAction={ type: SET_LIVES, lives: defaultLives });
    }
    getLives(){
        return store.getState().lives;
    }
}

function reducer(state={username: "", score: 0, lives: defaultLives}, action) {
    switch(action.type) {
        case SET_USERNAME:
            return {username: action.username, score: state.score, lives: state.lives};
        case SET_SCORE:
            return {username: state.username, score: action.score, lives: state.lives};
        case SET_LIVES:
            return {username: state.username, score: state.score, lives: action.lives}
        default:
            return state;
    }   
}

export default GameModel;