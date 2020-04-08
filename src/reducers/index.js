const defaultLives = 3;

const reducer = (state = {username: "", score: 0, lives: defaultLives, category: "Category"}, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
        console.log({username: action.username, score: state.score, lives: state.lives, category: state.category});
        return {username: action.username, score: state.score, lives: state.lives, category: state.category};
    case 'SET_SCORE':
        console.log({username: state.username, score: action.score, lives: state.lives, category: state.category});
        return {username: state.username, score: action.score, lives: state.lives, category: state.category};
    case 'SET_LIVES':
        console.log({username: state.username, score: state.score, lives: action.lives, category: state.category});
        return {username: state.username, score: state.score, lives: action.lives, category: state.category};
    case 'SET_CATEGORY':
        console.log({username: state.username, score: state.score, lives: state.lives, category: action.category});
        return {username: state.username, score: state.score, lives: state.lives, category: action.category};
    default:
        console.log(state);
        return state;
  }
}

export default reducer;