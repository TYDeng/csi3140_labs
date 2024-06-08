let game = [];
let fruitEat = false;
let ghostDie = false;
let gameOver = false;
let level = 0;
let levelcomplete = false;
let pacmanIndex = -99;
let ghostIndex = -99;
let score = 0;

//Generate a random  int in range n (number n exclusive)
function getRandomInt(min, max){
    return Math.floor(Math.random()*(max - min)) + min;
}

function createGame(elements){
    if(elements < 5){
        console.error("At least 5 element is acceptable");
        return null;
    }
    game = new Array(elements).fill(".");
    let specialPos = [];
    while (specialPos.length < 3) {
        let randomPos = getRandomInt(0, elements);
        if (!specialPos.includes(randomPos)){
            specialPos.push(randomPos);
        }
    }

    //[0] for "C", [1] for "^", [2] for fruit
    let pacmanIndex = specialPos[0]
    let ghostIndex = specialPos[1]
    game[specialPos[2]] = "@";

    level = 0;
    score = 0;
    fruitEat = false;
    ghostDie = false;
    gameOver = false;
    levelcomplete = false;

    game[pacmanIndex] = "C";
    game[ghostIndex] = "^";

    return game
} 

function moveLeft(game) {
    if (pacmanIndex != -99) {
        if (pacmanIndex == 0){// reach the boundary limit (index 0)
            game[pacmanIndex] = " "; // set index 0 pellet as empty
            pacmanIndex = game.length;// taken pac index as max +1
        }
        if (game[pacmanIndex - 1] === ".") {
            score += 1;
        }
        if (pacmanIndex != game.length)
            game[pacmanIndex] = " ";
        pacmanIndex--;
        game[pacmanIndex] = "C";
    }
    gameDisplay();
}

function moveRight(game) {
    if (pacmanIndex != -99) {
        if (pacmanIndex == game.length -1){// reach the boundary limit (index 0)
            game[pacmanIndex] = " "; // set index 0 pellet as empty
            pacmanIndex = -1;// taken pac index as max +1
        }
        if (game[pacmanIndex + 1] === ".") {
            score += 1; 
        }
        if (pacmanIndex != -1)
            game[pacmanIndex] = " ";
        pacmanIndex++;
        game[pacmanIndex] = "C";
    }
    gameDisplay();
}

function Checkcompletion(game) {
    if (!game.includes(".") && !game.includes("@")){
        levelcomplete = true;
    }
}

function ghostMove(move) {
    let newGhostIndex = ghostIndex + move;
    if (newGhostIndex >= 0 && newGhostIndex < game.length && newGhostIndex !== pacmanIndex) {
        game[ghostIndex] = "."; 
        ghostIndex = newGhostIndex;
        game[ghostIndex] = "^"; 
    }

    if (newGhostIndex >= 0 && newGhostIndex < game.length && newGhostIndex == pacmanIndex){
        if(fruitEat){
            ghostDie;
        }else{
            gameOver;
        }
    }
    gameDisplay();
}

function ghostMovement() {
    let directions = [-1, 1];
    let move = directions[getRandomInt(0, directions.length)];
    setInterval(ghostMove, 2000);
}

function stopGhostMovement() {
    clearInterval(intervalID);
}

function handleKeyPress(event) {
    switch(event.key) {
        case "ArrowLeft":
            moveLeft(game);
            break;
        case "ArrowRight":
            moveRight(game);
            break;
    }
}

function gameDisplay() {
    document.getElementById('game').textContent = game.join('');
    document.getElementById('score').textContent = `Score: ${score}`;
    if (gameOver) {
        document.getElementById('game').textContent += '\nGame Over!';
    }
}

function startGame() {
    createGame(10);
    ghostMovement();
    document.addEventListener('keydown', handleKeyPress);
    gameDisplay();
}

startGame();