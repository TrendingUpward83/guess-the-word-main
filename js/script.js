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
const guessInput = document.querySelector(".letter");
const wordProg = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const guessMsgs = document.querySelector(".message");
const playAgainBtn =document.querySelector(".play-again"); 
const word = "magnolia"; 
const guessedLetters = []; 

const dotifyWord = function(word){

    for (const letter in word){
        wordProg.innerHTML+= `&#9679`;  //supposedly supposed to use join() here. 
        
    }

};

dotifyWord(word); 

guessBtn.addEventListener("click", function(e){
    e.preventDefault(); //prevent default reloading behavior
    guessMsgs.innerText=""; 
    let guessLtr = guessInput.value; 
    //console.log(guessLtr); 
   
    validateInput(guessLtr); 
   

});

const validateInput = function(input){
    const acceptedLetter = /[a-zA-Z]/
    guessInput.value=""; //clear input
    if(input ==="" ){
        guessMsgs.innerText= `You must submit a letter to guess!`;
    }
    else if (input.length >1 ){
        guessMsgs.innerText = `Only one character allowed at a time!`;
    }
    else if (input.match(acceptedLetter)){
        //if accepted letter, then have to compare against the word. 
        //console.log(input); 
        makeGuess(input);  
    }
    else if (!input.match(acceptedLetter)){
        guessMsgs.innerText = `Must enter a letter, not a number or symbol please!!`;
    }

};
const updateWordProg = function(guessedLetterArray){
        const wordUpper = word.toUpperCase(); 
        const wordArray = wordUpper.split(""); //wordArray is word split into an array
        const revealWord = [];
        for (const letter of wordArray) {
          if (guessedLetterArray.includes(letter)) {
            revealWord.push(letter.toUpperCase());
          } else {
            revealWord.push("●"); //push to keep building the word in the new array
          }
        }
       
        const guessedWord = revealWord.join(""); 
        wordProg.innerHTML = guessedWord;
        checkWinStatus(guessedWord);
        
}; 
const showGuessedLetters = function(letter){
    guessedLtrList.innerHTML = ""; 
    for (let letter of guessedLetters){
        const guessedLetterLI = document.createElement("li"); 
        guessedLetterLI.innerHTML= `<li>${letter.toUpperCase()}</li>`;
        guessedLtrList.append(guessedLetterLI); 

    }

};

const makeGuess = function(letter){
    const clean = letter.toUpperCase(); 
    if (guessedLetters.includes(clean)){
        guessMsgs.innerText = `You already guessed that one!`
    }
    else (guessedLetters.push(clean)); 
    showGuessedLetters(clean);
    updateWordProg(guessedLetters); 
    
};

const checkWinStatus = function (guessedWord){
    if(guessedWord===word.toUpperCase()){
        guessMsgs.classList.add("win");
        guessMsgs.innerHTML= `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    };
   
};


