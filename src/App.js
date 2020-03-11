import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import Navigation from './components/Navigation';
import Start from './start/startContainer.js'
import Game from './game/gameContainer.js'
import HighScoreContainer from './highScore/highScoreContainer.js'
import GameOver from './gameOver/gameOverContainer.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import GameModel from './GameModel.js';

const model = new GameModel();
model.addObserver(() => {
  console.log("UPDATED STATE:");
  console.log("Username: ", model.getUsername());
  console.log("Score: ", model.getScore());
  console.log("Lives: ", model.getLives());
})

function App() {
  
  return (
    <Router>
      <Switch>
          <Route exact path="/">
            <Start model = {model}
            />
          </Route>
          <Route path="/game">
            <Game
            />
          </Route>
          <Route exact path="/highscore">
            <HighScoreContainer />
          </Route>
          <Route exact path="/gameover">
            <GameOver />
          </Route>

      </Switch>
    </Router>
  );
}


export default App;