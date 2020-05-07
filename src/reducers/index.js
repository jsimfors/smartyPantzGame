const reducer = (state = {username: "", score: 0, lives: 3, category: "Hits"}, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
        return {username: action.username, score: state.score, lives: state.lives, category: state.category};
    case 'SET_SCORE':
        return {username: state.username, score: action.score, lives: state.lives, category: state.category};
    case 'SET_LIVES':
        return {username: state.username, score: state.score, lives: action.lives, category: state.category};
    case 'SET_CATEGORY':
        return {username: state.username, score: state.score, lives: state.lives, category: action.category};
    default:
        return state;
  }
};

export default reducer;