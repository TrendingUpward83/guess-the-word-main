/*TODO: I did this when I was extremely tired from a period of not sleeping. It needs looked over and likely refactored */

const guessedLtrList = document.querySelector(".guessed-letters");
const guessBtn= document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordProg = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining span");
const guessMsgs = document.querySelector(".message");
const playAgainBtn =document.querySelector(".play-again"); 
let word = "magnolia"; 
const guessedLetters = []; 
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

    }
    };
};
    
    


const checkWinStatus = function (guessedWord){
    if(guessedWord===word.toUpperCase()){
        guessMsgs.classList.add("win");
        guessMsgs.innerHTML= `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    };
   
};


