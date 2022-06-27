// Picking element IDs for showing Display in HTML file
const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')

// Picking all buttons from HTML
const possibleChoices = document.querySelectorAll('button')

// variables
let userChoice
let computerChoice
let result

// For Each loop listening for possible click on "possibleChoices" button list
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    getResult()
}))

// Function for generating computer Choices
function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1
    
    if (randomNumber === 1) {
        computerChoice = 'rock'
        console.log('Trueeeee')
    }
    if (randomNumber === 2) {
        computerChoice = 'scissors'
    }
    if (randomNumber === 3) {
        computerChoice = 'paper'
    }
    computerChoiceDisplay.innerHTML = computerChoice
    console.log(randomNumber, computerChoice)
}

function getResult() {
    if (computerChoice === userChoice) {
        result = "It's a draw!"
    }
    if (computerChoice === 'rock' && userChoice === 'paper'){
        result = 'you win!'
    }
    if (computerChoice === 'rock' && userChoice === 'scissors'){
        result = 'you lost!'
    }
    if (computerChoice === 'paper' && userChoice === 'scissors'){
        result = 'you win!'
    }
    if (computerChoice === 'paper' && userChoice === 'rock'){
        result = 'you lost!'
    }
    if (computerChoice === 'scissors' && userChoice === 'rock'){
        result = 'you win!'
    }
    if (computerChoice === 'scissors' && userChoice === 'paper'){
        result = 'you lost!'
    }
    resultDisplay.innerHTML = result
}