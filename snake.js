// Get the canvas element by its id
let canvas = document.getElementById('game');

// Get the 2D rendering context for the drawing surface of the canvas
let context = canvas.getContext('2d');

// Define the size of each square (box) on the canvas
let box = 32;

// Initialize the score to 0
let score = 0;

// Initialize the snake as an array of objects, each representing a part of the snake
let snake = [
    { x: 8 * box, y: 8 * box }
];

// Create an array of obstacles
let obstacles = [
    { x: 5 * box, y: 7 * box },
    { x: 8 * box, y: 12 * box },
    { x: 13 * box, y: 9 * box },
];


// Set the initial direction of the snake to right
let direction = "right";

// Create the food object at a random position on the canvas
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Function to create the game background
function createBG() {
    // Set the fill color to light green
    context.fillStyle = "lightgreen";
    // Draw a rectangle covering the entire canvas
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to create the snake
function createSnake() {
    // Loop through each part of the snake
    for (i = 0; i < snake.length; i++) {
        // Set the fill color to green
        context.fillStyle = "green";
        // Draw a rectangle for each part of the snake
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Function to draw the obstacles
function drawObstacles() {
    context.fillStyle = "grey";
    obstacles.forEach(obstacle => {
        context.fillRect(obstacle.x, obstacle.y, box, box);
    });
}

// Function to draw the food on the canvas
function drawFood() {
    // Set the fill color to red
    context.fillStyle = "red";
    // Draw a rectangle for the food
    context.fillRect(food.x, food.y, box, box);
}

// Add an event listener for keydown events
document.addEventListener('keydown', update);

// Function to update the direction of the snake
function update(event) {
    // Change the direction of the snake based on the key pressed
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

// Function to start the game
function startGame() {
    // Check if the snake has hit the border and make it appear on the opposite side
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Check if the snake has hit itself
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            // If the snake has hit itself, stop the game and display an alert
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    // Draw the game background, the snake, and the food
    createBG();
    createSnake();
    drawFood();

    // Draw the obstacles
    drawObstacles();


    // Check if the snake has hit an obstacle
    for (let i = 0; i < obstacles.length; i++) {
        if (snake[0].x == obstacles[i].x && snake[0].y == obstacles[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    // Get the current head position of the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Update the head position based on the direction
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // Check if the snake has eaten the food
    if (snakeX == food.x && snakeY == food.y) {
        // If the snake has eaten the food, increment the score
        score++;
        
        // Update the score display       
        document.getElementById('score').innerText = "Score: " + score;

        // Generate a new food object at a random position
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    } else {
        // If the snake hasn't eaten the food, remove the tail
        snake.pop();
    }

    // Create a new head for the snake at the new position
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Add the new head to the front of the snake array
    snake.unshift(newHead);
}

// Set an interval to run the startGame function every 100 milliseconds
// This will make the game run continuously, updating the game state every 100 milliseconds
let game = setInterval(startGame, 100);