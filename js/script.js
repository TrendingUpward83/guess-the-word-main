/*TODO: I did this when I was extremely tired from a period of not sleeping. It needs looked over and likely refactored
Refactor, clean up and remove the entry text box when clicking the play again */
const guessedLtrList = document.querySelector(".guessed-letters");
const guessBtn= document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordProg = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining span");
const remainingGuessP = document.querySelector(".remaining");
const guessMsgs = document.querySelector(".message");
const playAgainBtn =document.querySelector(".play-again"); 
let word = "magnolia"; 
let guessedLetters = []; 
let numRemainingGuesses = 8; 

const getWord = async function(){
    const res = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
    data = await res.text(); 
    const wordArray = data.split("\n");
    const randIndex = Math.floor(Math.random() * (wordArray.length - 1) + 1); 
    word = wordArray[randIndex].trim();
    
};

getWord(); 

const dotifyWord = function(word){

    for (const letter in word){
        wordProg.innerHTML+= `&#9679`;  //supposedly supposed to use join() here. 
        
    }
    return word;
};

dotifyWord(word); 

guessBtn.addEventListener("click", function(e){
    e.preventDefault(); //prevent default reloading behavior
    guessMsgs.innerText=""; 
    let guessLtr = guessInput.value; 
    //console.log(guessLtr); 
   
    validateInput(guessLtr); 
   

});

playAgainBtn.addEventListener("click", function(e){
    e.preventDefault(); 
    guessInput.classList.remove("hide");
    guessMsgs.classList.remove("win");
    guessBtn.classList.remove("hide");
    remainingGuessP.classList.remove("hide");
    guessedLtrList.classList.remove("hide"); 
    playAgainBtn.classList.add("hide"); 
    numRemainingGuesses = 8;
    guessedLetters = []; 
    remainingGuesses.innerText = `${numRemainingGuesses} guesses`
    guessMsgs.innerText=``; 
    wordProg.innerHTML=``;
    getWord();
    dotifyWord(word); 
    guessedLtrList.innerHTML=``;



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
const showGuessedLetters = function(guessedLetters){
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
        return;
    }
    else (guessedLetters.push(clean)); 
    showGuessedLetters(guessedLetters);
    countGuesses(clean); 
    updateWordProg(guessedLetters); 
    
    
};

const countGuesses = function(guess){
    const upWord = word.toUpperCase();
    if(upWord.includes(guess)){
        guessMsgs.innerText=`Good guess! Word does have letter ${guess}. `;  
    }
    else{
        guessMsgs.innerText=`Sorry, the word has no ${guess}. `; 
        numRemainingGuesses-=1;
        remainingGuesses.innerText = `${numRemainingGuesses} guesses`
    
            if(numRemainingGuesses==0)
            {
                guessMsgs.innerText=`Game Over! Word is ${word}.`;
                startOver(); 

    }
    };
};
    

const checkWinStatus = function (guessedWord){
    if(guessedWord===word.toUpperCase()){
        guessMsgs.classList.add("win");
        guessInput.classList.add("hide");
        guessMsgs.innerHTML= `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    };
   
};


const startOver = function(){


    guessBtn.classList.add("hide");
    remainingGuessP.classList.add("hide");
    guessedLtrList.classList.add("hide"); 
    playAgainBtn.classList.remove("hide"); 
    
};

