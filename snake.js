var game = document.getElementById("game");
var snake = document.getElementById("snake");
var food = document.getElementById("food");
var snakeX = 200;
var snakeY = 200;
var foodX;
var foodY;
var direction = "right";
var snakeLength = 1;
var speed = 100;
var score = 0;

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 37 && direction !== "right") {
        direction = "left";
    } else if (event.keyCode === 38 && direction !== "down") {
        direction = "up";
    } else if (event.keyCode === 39 && direction !== "left") {
        direction = "right";
    } else if (event.keyCode === 40 && direction !== "up") {
        direction = "down";
    }
});

function moveSnake() {
    if (direction === "right") {
        snakeX += 20;
    } else if (direction === "left") {
        snakeX -= 20;
    } else if (direction === "up") {
        snakeY -= 20;
    } else if (direction === "down") {
        snakeY += 20;
    }
    if (snakeX >= game.offsetWidth) {
        snakeX = 0;
    } else if (snakeX < 0) {
        snakeX = game.offsetWidth - 20;
    } else if (snakeY >= game.offsetHeight) {
        snakeY = 0;
    } else if (snakeY < 0) {
        snakeY = game.offsetHeight - 20;
    }
    snake.style.left = snakeX + "px";
    snake.style.top = snakeY + "px";
    if (snakeX === foodX && snakeY === foodY) {
        snakeLength++;
        score++;
        if (score % 5 === 0) {
            speed -= 10;
        }
        scoreDisplay.textContent = "Score: " + score;
        generateFood();
    }
}

function generateFood() {
    foodX = Math.floor(Math.random() * (game.offsetWidth - 20));
    foodY = Math.floor(Math.random() * (game.offsetHeight - 20));
    food.style.left = foodX + "px";
    food.style.top = foodY + "px";
}

function updateSnake() {
    moveSnake();
    for (var i = snakeLength - 1; i > 0; i--) {
        var prevX = snake[i - 1].x;
        var prevY = snake[i - 1].y;
        snake[i].x = prevX;
        snake[i].y = prevY;
        snake[i].style.left = prevX + "px";
        snake[i].style.top = prevY + "px";
    }
    snake[0].x = snakeX;
    snake[0].y = snakeY;
    setTimeout(updateSnake, speed);
}

function init() {
    snake.style.left = snakeX + "px";
    snake.style.top = snakeY + "px";
    snake.style.width = "20px";
    snake.style.height = "20px";
    snake.style.borderRadius = "50%";
    generateFood();
    for (var i = 1; i < snakeLength; i++) {
        var newSegment = document.createElement("div");
        newSegment.classList.add("snake");
        newSegment.x = snakeX - i * 20;
        newSegment.y = snakeY;
        newSegment.style.left = newSegment.x + "px";
        newSegment.style.top = newSegment.y + "px";
        game.appendChild(newSegment);
        snake.push(newSegment);
    }
    updateSnake();
}

init();