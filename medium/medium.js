import TileMap from "./tilemedium.js";

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;
const gameOverSound = new Audio("sounds/gameOver.wav");
const gameWinSound = new Audio("sounds/gameWin.wav");

//  Runs the game loop.
function gameLoop() {
  tileMap.draw(ctx);
  drawGameEnd();
  pacman.draw(ctx, pause(), enemies);
  enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman));
  checkGameOver();
  checkGameWin();
  drawScore();
}
// Updates the score display with the current score
function drawScore() {
  const scoreDisplay = document.getElementById("scoreValue");
  scoreDisplay.innerText = pacman.score;
}
// Check if the game has been won.
function checkGameWin() {
  if (!gameWin) {
    gameWin = tileMap.didWin();
    if (gameWin) {
      playGameWinSound();
      drawGameEnd();
      drawScore();
      redirectToWonPage();
    }
  }
}
// Redirects the user to the "won.html" page after a delay of 1 millisecond.
function redirectToWonPage() {
  setTimeout(() => {
    window.location.href = "won.html";
  }, 1);
}
// Checks if the game is over and performs game over actions if necessary.
function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();
    if (gameOver) {
      playGameOverSound();
      drawGameEnd();
      drawScore();
      redirectToGameOverPage();
    }
  }
}
// Plays the game over sound.
function playGameOverSound() {
  gameOverSound.play();
}
// Checks if the game is over by checking if any enemy collides with pacman.
function isGameOver() {
  return enemies.some(
    (enemy) => !pacman.powerDotActive && enemy.collideWith(pacman)
  );
}
// Checks if the game should pause.
function pause() {
  const isFirstMoveMade = pacman.madeFirstMove;
  const isGameOver = gameOver;
  const isGameWin = gameWin;
  return !isFirstMoveMade || isGameOver || isGameWin;
}
// Draws the end game screen based on the game state.
function drawGameEnd() {
  if (gameOver || gameWin) {
    let text = " You Win!";
    if (gameOver) {
      text = "Game Over";
      setTimeout(() => {
        window.location.href = "mediumgameover.html";
      }, 5);
    } else if (gameWin) {
      text = "You Win!";
      setTimeout(() => {
        window.location.href = "won.html";
      }, 5);
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, canvas.height / 3.2, canvas.width, 80);

    ctx.font = "75px comic sans";
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");

    ctx.fillStyle = gradient;
    ctx.fillText(text, 10, canvas.height / 2);
  }
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);
