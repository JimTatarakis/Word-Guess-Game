// Variables
const names = ['harry','albus','hermoine','ron','minerva','hagrid','ginny','voldamort','newt',
'tina','grindelwald','cornelius','bellatrix','neville','luna','fred','george','sirius','lily',
'severus','james'];
let rightGuess = [];
let wrongGuess = [];
let underScore = [];
let winCount = 0;
let remGuess = 12;
let rndName = '';

// Displays variable values to HTML.
document.getElementById("guessesremaining").innerHTML = remGuess;
document.getElementById("rightguess").innerHTML = rightGuess;
document.getElementById("wrongguess").innerHTML = wrongGuess;
document.getElementById("wincounter").innerHTML = winCount;


// Recurring fxns
// Chooses a Random Name
let generateName = () => {
    rndName = names[Math.floor(Math.random() * names.length)];

    for (let i = 0; i < rndName.length; i++)
    {
        underScore.push('_');
    }
    document.getElementById("underscores").innerHTML = underScore;
};

// Reset Game
let resetGame = () => {
    rightGuess = [];
    document.getElementById("rightguess").innerHTML = rightGuess;
    wrongGuess  = [];
    document.getElementById("wrongguess").innerHTML = wrongGuess;
    underScore = [];
    remGuess = 12;
    document.getElementById("guessesremaining").innerHTML = remGuess;
    rndName = '';
    generateName();
    console.log(rndName);
}


// Recurring fxns end

// Game Begins

generateName();
console.log(rndName);


// Awaiting input(user keypress event).
document.addEventListener('keyup', (event) => {
    let keyCode = event.keyCode;
    let keyLetter = String.fromCharCode(keyCode);
    keyLetter = keyLetter.toLowerCase();

    // If guess is right...
    if (rndName.indexOf(keyLetter) > -1){
        console.log(rndName.indexOf(keyLetter));    //Test for accuracy of letter input.
        
        var letterLocale = rndName.indexOf(keyLetter);
        var letterLastLocale = rndName.lastIndexOf(keyLetter);

        underScore[letterLocale] = keyLetter;   //Places letter inside of underscore array.
        document.getElementById("underscores").innerHTML = underScore;  //Displays letter in the 'underscore' section of HTML.

        rightGuess.push(keyLetter);
        document.getElementById("rightguess").innerHTML = rightGuess;   //Displays letter in the 'right guess' section of HTML.
        if (letterLastLocale !== letterLocale){
            underScore[letterLastLocale] = keyLetter;   //Places duplicate letter inside of underscore array.
        document.getElementById("underscores").innerHTML = underScore;  //Displays duplicate letter in the 'underscore' section of HTML.

        rightGuess.push(keyLetter);
        document.getElementById("rightguess").innerHTML = rightGuess;   //Displays duplicate letter in the 'right guess' section of HTML.
        }
        
        if (underScore.join('') === rndName){   //Checks if game is won.
            winCount = winCount + 1;
            document.getElementById("wincounter").innerHTML = winCount;
            alert('You win! You must be quite avid in divination.');
            resetGame();
            console.log(rndName);
            keyLetter = ''
        }
    }
    // If guess is wrong...
    if (rndName.indexOf(keyLetter) < 0) {
        if (wrongGuess.indexOf(keyLetter) > -1){    //Checks if this guess has been made before and alerts.
            remGuess = remGuess + 1;    //Necessary to offset the -1 counter done by guessing a wrong letter, no duplicate guesses!
            alert('You already guessed that...');
        }
            remGuess = remGuess - 1;    //Reduces counter by 1.
            document.getElementById("guessesremaining").innerHTML = remGuess;
            
            if (remGuess === 0){    // When remaining guesses reaches 0...
                alert('You lose! Maybe next time muggle.')
                resetGame();
                console.log(rndName);
                keyLetter = '';
            }
            wrongGuess.push(keyLetter);
            document.getElementById("wrongguess").innerHTML = wrongGuess;
            console.log(remGuess);  //Testing for accuracy.
    }
});