//Generate a random  int in range n (number n exclusive)
function getRandomInt(min, max){
    return Math.floor(Math.random()*(max - min)) + min;
}

function createGame(elements){
    if(elements < 5){
        console.error("At least 5 element is acceptable");
    }else{
        let game = new Array(elements).fill(".");
        let specialPos = [];
        while (specialPos.length < 3) {
            let randomPos = getRandomInt(0, elements);
            if (!specialPos.includes(randomPos)){
                specialPos.push(randomPos);
            }
        }

        //[0] for "C", [1] for "^", [2] for fruit
        game[specialPos[0]] = "C";
        game[specialPos[1]] = "^";
        game[specialPos[2]] = "@";

        return game
    }
} 
