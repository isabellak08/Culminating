let paddleX;
let paddleWidth = 100;
let paddleHeight = 20;
let ballX, ballY;
let ballDiameter = 40; // Bigger ball
let ballSpeedX, ballSpeedY;
let gameRunning = true;
let startTime;
let timeLimit = 30; // 30 seconds
let gameOver = false;
let win = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  startGame();
}

function draw() {
  background(209, 63, 129);

  if (gameRunning) {
    // Draw paddle
    fill(0);
    rect(paddleX, height - paddleHeight - 10, paddleWidth, paddleHeight);

    // Draw ball
    fill(0, 255, 0); // Green ball
    ellipse(ballX, ballY, ballDiameter);

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Check for collisions with walls
    if (ballX < ballDiameter / 2 || ballX > width - ballDiameter / 2) {
      ballSpeedX *= -1;
    }
    if (ballY < ballDiameter / 2) {
      ballSpeedY *= -1;
    }

    // Check for collision with paddle
    if (
      ballY + ballDiameter / 2 >= height - paddleHeight - 10 &&
      ballX > paddleX &&
      ballX < paddleX + paddleWidth
    ) {
      ballSpeedY *= -1;
      ballY = height - paddleHeight - 10 - ballDiameter / 2;
      ballSpeedX *= 1.1; // Increase speed
      ballSpeedY *= 1.1; // Increase speed
    }

    // Check if the ball hits the bottom of the screen
    if (ballY > height) {
      gameRunning = false;
      gameOver = true;
    }

    // Check time limit
    let elapsedTime = (millis() - startTime) / 1000;
    if (elapsedTime >= timeLimit) {
      gameRunning = false;
      win = true;
    }

    // Timer display
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Time left: " + ceil(timeLimit - elapsedTime), width / 2, 30);

    // Update paddle position
    if (keyIsDown(LEFT_ARROW)) {
      paddleX -= 10;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      paddleX += 10;
    }

    // Ensure paddle stays within canvas
    paddleX = constrain(paddleX, 0, width - paddleWidth);
  } else {
    if (gameOver) {
      showGameOver();
    } else if (win) {
      showWin();
    }
  }
}

function showGameOver() {
  background(255, 0, 0);
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("You failed!", width / 2, height / 2 - 20);

  drawPlayAgainButton();
}

function showWin() {
  background(0, 255, 0);
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("You won!", width / 2, height / 2 - 20);

  drawPlayAgainButton();
}

function drawPlayAgainButton() {
  fill(128, 0, 128);
  rect(width / 2 - 75, height / 2 + 20, 150, 50);
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Play Again", width / 2, height / 2 + 45);
}

function mousePressed() {
  if (!gameRunning) {
    if (mouseX > width / 2 - 75 && mouseX < width / 2 + 75 && mouseY > height / 2 + 20 && mouseY < height / 2 + 70) {
      startGame();
    }
  }
}

function startGame() {
  paddleX = width / 2 - paddleWidth / 2;
  ballX = random(ballDiameter, width - ballDiameter);
  ballY = height / 2;
  ballSpeedX = random(-5, 5);
  ballSpeedY = 5;
  startTime = millis();
  gameRunning = true;
  gameOver = false;
  win = false;
}
