# SmartyPantZ

<h2>This is our app SmartyPantz!!!</h2></br>

<h3>Details about the app</h3><br />

<b>Name of the app:</b> Smarty pants<br />
<b>Description:</b> A quiz that asks questions about music. Every question has two generated answers and it’s up to the user to guess which one that’s the correct answer. If the user picks the correct answer they will get one point and a new question. When a wrong answer is picked they lose a life. When the player has lost all three lives, the points will be summed up and put on the scoreboard.<br />
<b>Framework:</b> React<br />
<b>API:</b> Spotify’s<br />
<b>Data the app is using:</b> The questions are app specific while the answers are from the API. The app is also connected to Firebase to store scores<br />

<b>New features!</b>
<ul>
<li><b>Categories!</b> You can now choose to play the game based on one of these four genres; Hits, EDM, Rock, Hip Hop. Each category has their own game design and highscore list</li>
<li><b>Stats!</b> During the game you will be updated with stats if your score is among the 50% best ones</li> 
<li><b>Confetti!</b> If you made it to the high score list your game over view will be celebrating with you</li>
</ul>


<h3>Project file structure:</h3><br />
In src/index.js the function App(), found in App.js, is rendered. App.js consists of a Router, and navigates to the controllers and corresponding view.
> src/index.js
> src/App.js

To start the game:
> src/start/StartContainer.js, src/start/startView.js

The view the game is played in:
> src/game/Gamecontainer.js, src/game/GameView.js, src/game/modal.js

The view the user is redirected to when the game is over:
> src/gameOver/gameOverContainer.js, src/gameOver/gameOverView.js

The view showing the highscores. Can be accessed after the game is over, or already at the startpage:
> src/highScore/highscoreContanier.js, src/highScore/highScoreView.js

The stylesheet for all windows:
> src/index.css

Stylesheet for specific views:
> src/start/start.css
> src/game/gameView.css
> scr/gameOver/gameOver.css

<h3>How to play</h3><br />
Visit <link>https://smartypantz-c6131.firebaseapp.com</link> on Chrome to try it out! <br/>
If you would like to play it locally you will have to clone this repo, install Bootstrap, React and Firebase tools. You will also need to get API keys to the Spotify API and configure to a Firestore before you can run `npm start` to play.