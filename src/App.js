import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Start from './start/startContainer.js';
import Game from './game/gameContainer.js';
import GameOver from './gameOver/gameOverContainer.js';
import HighScoreContainer from './highScore/highScoreContainer.js';

const App = () => (
  <Router>
    <Switch>
        <Route exact path="/">
          <Start/>
        </Route>
        <Route exact path="/game">
          <Game/>
        </Route>
        <Route exact path="/gameover">
          <GameOver/>
        </Route>
        <Route exact path="/highscore">
          <HighScoreContainer/>
        </Route>
    </Switch>
  </Router>
);

export default App;