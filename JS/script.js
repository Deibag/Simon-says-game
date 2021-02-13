//Auto generated sequence
var sequence = [];
//Users inputed sequence
var inputSequence = [];
//Round span
var showRound = document.getElementById('round');
var round = 0;
//Click audio
var audio = new Audio('Audio/click.mp3');
//Square color
var oldColor = "#a6b1e1";

var bestScore = localStorage.getItem("score");
var showScore = document.getElementById('score');
showScore.innerText = `Best score: ${bestScore}`;

//Lights up a square
function lightUp(sq){
    var square = document.getElementById(sq);
    audio.play();
    //Changes color
    square.style.backgroundColor = "#424874";
    //Resets color after certain time
    setTimeout(() => {
        square.style.backgroundColor = oldColor;
    }, 500);
}

//Starts the game when start button is clicked
var start = document.getElementById('start');
start.addEventListener("click", function(){
    sequence = [];
    inputSequence = [];
    round = 0;
    showSequence();
})

//Shows generated sequence at the start of every round
function showSequence(){
    round += 1;
    showRound.innerText = `Round: ${round}`;
    var number = Math.floor((Math.random() * 9)+ 1);
    sequence.push(number);

    sequence.forEach(function (el, index) {
        setTimeout(function () {
            if(inputSequence.length > 0){
                sequence = [];
                inputSequence = [];
                round = 0;
                showRound.innerText = "GAME OVER";
                return;
            } 
            lightUp(el);
            }, (index + 2) * 1000);
      });

}

//Checks users input values
function userInput(square){
    lightUp(square);
    inputSequence.push(square);

    inputSequence.forEach(function(element, index){
        if (element !== sequence[index]){
            if(round > bestScore){
                localStorage.clear();
                localStorage.setItem("score", round-1);
            }
            showScore.innerText = `Best score: ${bestScore}`;
            sequence = [];
            inputSequence = [];
            round = 0;
            showRound.innerText = "GAME OVER";
        } else if (inputSequence.length === sequence.length
            && inputSequence[inputSequence.length-1] === sequence[sequence.length-1]){
            inputSequence = [];
            showSequence();
        }
    })
}



