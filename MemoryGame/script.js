const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },

    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
]

// Sorting array randomly
cardArray.sort(() => 0.5 - Math.random())

// Searching for element with ID "grid" in the document and stores it in "gridDisplay"
const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
const notificationDisplay = document.querySelector('#notification')
const playBtn = document.querySelector('#playBtn')
const timerDisplay = document.querySelector('#timer')
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []

// Timer vars
let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let int = null;

function createBoard() {

    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img') // Add img element and store it in card constant.
        setTimeout(function(){
            card.setAttribute('src', 'images/blank.png')
        }, 1000);
        card.setAttribute('src', cardArray[i].img) // Add attribute src = link
        
        card.setAttribute('data-id', i) // Add attribute data-id that equals to loop i element.
        card.addEventListener('click', flipCard) // Listen if image is clicked (and if clicked run "flipCard" function)
        gridDisplay.appendChild(card) // Append card element to gridDisplay

    }
}

// Start timer function
function startTimer() {
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(displayTimer,10);
}

// Timer counting function
function displayTimer(){
    milliseconds+=10;

    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;

        if(seconds == 60){
            seconds = 0;
            minutes++;

            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

    timerDisplay.innerHTML = ` ${h}:${m}:${s}:${ms}`
}

// Checking if player pressed play button...
playBtn.addEventListener('click', PlayerPlaying)

function PlayerPlaying() {
        playBtn.remove();
        startTimer();
        createBoard();
}


function checkMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    if (optionOneId == optionTwoId) {
        notificationDisplay.textContent = 'You have clicked the same image!';
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
    } else if (cardsChosen[0] == cardsChosen[1]) {
        notificationDisplay.textContent = 'You found a match!';
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        notificationDisplay.textContent = 'Sorry try again!';
    }

    resultDisplay.textContent = cardsWon.length

    cardsChosen = []
    cardsChosenIds = []

    if (cardsWon.length == cardArray.length/2) {
        //resultDisplay.textContent = 'Congrats, you found them all!'
        notificationDisplay.textContent = 'Congrats, you found them all!';
        clearInterval(int);
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id') // get this element attribute "data-id"
    cardsChosen.push(cardArray[cardId].name) // pushing clicked card.name to cardsChosen array
    cardsChosenIds.push(cardId)
    this.setAttribute('src', cardArray[cardId].img) // change clicked blank img to another img

    if (cardsChosen.length === 2){
        setTimeout(checkMatch, 500)
    }
}