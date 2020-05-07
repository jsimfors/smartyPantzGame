import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Start from './start/startContainer.js';
import Game from './game/gameContainer.js';
import GameOver from './gameOver/gameOverContainer.js';
import HighScore from './highScore/highScoreContainer.js';
import ErrorBoundary from './error/errorBoundary.js';
import {Offline, Online} from "react-detect-offline";

const App = () => (
    <Router>
      <Online>
        <Switch>
            <Route exact path="/game">
              <ErrorBoundary>
                <Game/>
              </ErrorBoundary>
            </Route>
            <Route exact path="/gameover/:onHighscore">
              <ErrorBoundary>
                <GameOver/>
              </ErrorBoundary>
            </Route>
            <Route exact path="/highscore">
              <ErrorBoundary>
                <HighScore/>
              </ErrorBoundary>
            </Route>
            <Route path="/">
                <Start/>
            </Route>
        </Switch>
      </Online>
      <Offline> {/* If internet connection is lost */}
        <h5 style={{marginTop: "10%", textAlign: "center"}}>You're offline. Check your internet connection and refresh.</h5>
      </Offline>
    </Router>
);

export default App;