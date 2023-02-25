import text from './text.json' assert {type: 'json'}

document.addEventListener('DOMContentLoaded',() =>{

let answer;
let userWord = [];
const resetButton = document.querySelector('#reset-button');
const cells = document.querySelectorAll('.line div');
const keyboard = document.querySelectorAll('.keyboard div');
const keyboardLetters = [];

keyboard.forEach(cell => {
    keyboardLetters.push(cell.innerHTML);
})

const wordList = text["fiveLetterWords"];
const messageBoard = document.querySelector('#message-board');
let isGameWon = false;
let message = document.createElement('div');
let i = 0;


function getWord() {
    let word = wordList[Math.floor(Math.random()*wordList.length)];
    answer = word.toUpperCase().split("");
}

// function checks if word is in the word list
function isWord() {
    if (wordList.includes(userWord.join('').toLowerCase())) {
        isWordCorrect();
        userWord = [];
    }
    else {
        messageBoard.innerHTML = 'Not a word';
        setTimeout(() => {
            messageBoard.innerHTML = ''
            },3000);
    }
}

// function checks if word is an answer
function isWordCorrect() {
    let cloneAnswer = [...answer];
    for (let j = 0; j < 5; j++) {
        if (userWord[j] == answer[j]) {
            cells[j+i-5].classList.add('correct');
            keyboard[keyboardLetters.indexOf(userWord[j])].classList.add('correct');
            cloneAnswer[j] = '_' ;   
        }}
    if (cloneAnswer.every(letter => letter === '_')) {
        isGameWon = true;
        gameOver();
    }
    for (let j = 0; j < 5; j++) {
            if (cloneAnswer.indexOf(userWord[j]) != -1) {
                cells[j+i-5].classList.add('misplaced');
                keyboard[keyboardLetters.indexOf(userWord[j])].classList.add('misplaced');
                cloneAnswer[cloneAnswer.indexOf(userWord[j])] = '_';
            }}
     userWord.forEach(letter => {
        if (keyboard[keyboardLetters.indexOf(letter)].classList.contains('misplaced') == false && 
        keyboard[keyboardLetters.indexOf(letter)].classList.contains('correct') == false) {
            keyboard[keyboardLetters.indexOf(letter)].classList.add('wrong');
        }
    })
}

function gameOver() {
    document.removeEventListener('keydown', typeLetters);
    message.setAttribute('class', 'message');
    document.body.appendChild(message);
    if (isGameWon) {
        message.style.backgroundColor = 'green';
        message.innerHTML = 'YOU WON!';
    } else {
        message.style.backgroundColor = 'orange';
        message.innerHTML = 'ANSWER WAS ' + answer.join('');
    }
}

function typeLetters(e) {
    if (e.keyCode === 8 && userWord.length != 0) {
        userWord.pop();
        i -= 1;
        cells[i].innerHTML = '';
    }     
    else if (e.keyCode >= 65 && e.keyCode <= 90  && userWord.length < 5) {
        userWord.push(e.key.toUpperCase());
        cells[i].innerHTML = e.key.toUpperCase();
        i += 1;
    }
    else if (e.keyCode === 13 && userWord.length == 5) {
        isWord();
        if (i == cells.length) {
            gameOver();
        }
}}

function resetGame() {
    if (document.body.contains(message)) {
        document.body.removeChild(message);
    }
    cells.forEach(cell => {
        cell.classList.remove('correct');
        cell.classList.remove('misplaced');
        cell.innerHTML = '';
    })

    keyboard.forEach(cell => {
        cell.classList.remove('correct');
        cell.classList.remove('misplaced');
        cell.classList.remove('wrong');
    })
    isGameWon = false;
    i = 0;
    playGame();
}

resetButton.addEventListener('click', resetGame)

function playGame() {
    getWord();
    document.addEventListener('keydown', typeLetters);
}

playGame();

})
