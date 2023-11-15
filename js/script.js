/*The unordered list where the player’s guessed letters will appear.
The button with the text “Guess!” in it.
The text input where the player will guess a letter.
The empty paragraph where the word in progress will appear.
The paragraph where the remaining guesses will display.
The span inside the paragraph where the remaining guesses will display.
The empty paragraph where messages will appear when the player guesses a letter.
The hidden button that will appear prompting the player to play again.*/

const guessedLtrList = document.querySelector(".guessed-letters")
const guessBtn= document.querySelector(".guess");
const guessInput = document.querySelector("#letter");
const wordProg = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const guessMsgs = document.querySelector(".message");
const playAgainBtn =document.querySelector(".play-again"); 
const word = "magnolia"; 

const dotifyWord = function(word){

    for (const letter in word){
        wordProg.innerHTML+= `&#9679`;  //supposedly supposed to use join() here. 
        
    }

};

guessBtn.addEventListener("click", function(e){
    e.preventDefault(); //prevent default reloading behavior
    const guessLtr = guessInput.value; 
    console.log(guessLtr); 
    guessLtr = ""; //clear input

});

dotifyWord(word); 