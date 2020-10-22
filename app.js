console.log("inside app.js");

/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Set the variables
let min = 1,
    max = 10,
    winningNum = findRandom(min, max),
    guessesLeft = 3;

// Calculate random number
function findRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create UI variables    
const guess = document.querySelector(".game"),
      guessInput = document.querySelector("#guess-input"),
      guessBtn = document.querySelector("#guess-submit"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      message = document.querySelector(".message");

// Assign min and max and display on screen
minNum.textContent = min;
maxNum.textContent = max;

// Listern for the entered guessed number
guessBtn.addEventListener("click", function() {
    // Store user guess in variable
    let userGuess = parseInt(guessInput.value);

    // Validate the input - has to be an integer between given range
    if(isNaN(userGuess) || userGuess < min || userGuess > max){
        guessInput.value = "";
        sendMessage(`Please enter the integer between given range`, "red")
    } else {
        // Check if win
        if(userGuess === winningNum) {
            // Game over = you won
            gameOver(true, `Congratulations, you won! ${winningNum} is the right quess!`);
        } else {
            // 1 attempt is lost
            guessesLeft -= 1;

            // Check if any attempts left
            if(guessesLeft === 0){
                // Game over = you lost
                gameOver(false, `Sorry, you lost, the number was ${winningNum}`);
            } else {
                // Clear the input
                guessInput.value = "";

                guessInput.style.borderColor = "red";
                // Game continue = wrong guess
                sendMessage(`Your guess is wrong, you have left ${guessesLeft} guesses left.`, "red");
            }
        }

    }

})

// End of the game
function gameOver(win, message){
    let color;
    win === true ? color = "green" : color = "red";

    // Disable input and change input border color
    guessInput.disabled = true;
    guessInput.style.borderColor = color;

    // Empty the input field
    guessInput.value = "";

    sendMessage(message, color);

    // Play again?
    guessBtn.value = "Play Again";
    guessBtn.className += "play-again";

    playAgain();
}

// Play again function
function playAgain(){
    console.log("playing again");
    // Play again btn event listener
    guessBtn.addEventListener("mousedown", function(e){
        if(e.target.className === "play-again"){
            window.location.reload();
        }
    })
}

// Send message function
function sendMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
