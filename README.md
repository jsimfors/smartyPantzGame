# SmartyPantZ

<h2>This is our app SmartyPantz!!!</h2></br>

<b>Details about the app</b><br />

Name of the app: Smarty pants
Description: A quiz that asks questions about music. Every question has two generated answers and it’s up to the user to guess which one that’s the correct answer. If the user picks the correct answer they will get one point and a new question. When a wrong answer is picked they lose a life. When the player has lost all three lives, the points will be summed up and put on the scoreboard.
Framework: React
API: Spotify’s
Data the app will use: The questions will be app specific, the answers will be from the API

<b>What have we done?</b><br />
We started with making the skeleton for the app. The app contains four different views. They are called Start, Game, GameOver and HighScore. Every view comes with a container and a view. We have also made it possible to navigate between these views. The API is connected and some data are recived and viewd in the Game-view. Right now we are only getting the song title, popularity and album cover from two different songs.  We use Firebase to publish our app and Firestore to store our highscore data in a database. The database only contains names and highscores and this data is viewed in the Highscore-view.  

<b>What you still plan to do</b><br />
We will focus a lot more on the layout, for example: add buttons instead of just text-links, titles, instructions, textboxes...
To be able to play a game we need enable the necessary functions like randomize songs, start a game session connected to the player, save the score to the highscore database and so on.

<b>Project file structure:</b><br />
In src/index.js the function App(), found in App.js, is rendered.
> src/index.js
> src/App.js

App.js consists of a Router, and navigates to the controllers and corresponding view.
To start the game:
> src/start/StartContainer.js, src/start/startView.js

The view the game is played in:
> src/game/Gamecontainer.js, src/game/GameView.js

The view the user is redirected to when the game is over:
> src/gameOver/gameOverContainer.js, src/gameOver/gameOverView.js

The view showing the highscores. Can be accessed after the game is over, or already at the startpage:
> src/highScore/highscoreContanier.js, src/highScore/highScoreView.js

The stylesheet for all windows:
> src/index.css

The model that holds the game state, including username, current score and current amount of lives:
> GameModel.js

<b>How to play</b><br />
Visit <link>https://smartypantz-c6131.firebaseapp.com</link> on Chrome to try it out! Alternatively, clone this repo and run `npm start` to play it locally.