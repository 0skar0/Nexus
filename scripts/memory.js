
/* jshint esversion: 6 */
/*
let canvas = document.getElementById("canvas");
let parent = document.getElementById("container");
let ctx = canvas.getContext("2d");
canvas.width = parent.offsetWidth;
canvas.height = parent.offsetHeight;

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
*/



//Användaren måste klicka på start the game då läggs eventlyssnarna på.
document.querySelector(".startButton").addEventListener("click", addListeners);

var card = document.getElementsByClassName("card");
var cards = [...card];

//variabler för meddelande om man klarat/inte klarat spelet.
var displayMessage;
var whichMessageToDisplay;

// Kolla vilket item användaren valt. Fördel om hen valt "kniv (0)".
var userChoice = 0;
if (userChoice === 1) {
  var advantage = document.querySelector(".deathCard");
  advantage.classList.add("disabled", "open", "match");
}

//Ser vilka dom öppnade korten är
var openedCards = [];

//Råkar man klicka på detta kort får man en nackdel...
var deathCard = document.querySelector(".deathCard");

//antal försök
var moves = [];
var moveCounter = document.querySelector(".moves");

//poängräknare
var score = [];
var scoreCounter = document.querySelector(".score");


//Ett objekt till försök och hur många poäng som behövs för att vinna.
var triesAndScore = {
  tries: 8,
  win: 4
};

document.querySelector(".numberOfMoves").innerHTML = Object.values(triesAndScore)[0];
document.querySelector(".winningPoints").innerHTML = Object.values(triesAndScore)[1];


//vilka kort matchar
var matchedCard = document.getElementsByClassName("match");

//hämtar kortleken.
const deck = document.getElementById("container");
deck.style.margin = "50px";

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", revealCard);
}

function addListeners() {
  var showBoard = document.querySelector('#container');
  showBoard.style.display = "flex";
  startGame();
  for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", revealCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", winner);
  }
}

$(".card").hover(function(){
  $(this).css("background-color", "#3b3b3c");
},function(){
  $(this).css("background-color", "#252529");
});


//blanda om korten
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


function startGame() {
  var shuffledCards = shuffle(cards);
  for (var i = 0; i < shuffledCards.length; i++) {
    [].forEach.call(shuffledCards, function(item) {
      deck.appendChild(item);
    });
  }
}

var revealCard = function() {
  this.classList.add("open");
  this.classList.add("show");
  this.classList.add("disabled");
};


// Kolla om korten matchar.
function cardOpen() {
  openedCards.push(this);
  openedCards[0].classList.add("disabled");
  var length = openedCards.length;
  if (length === 2) {
    moveFunction();
    if (openedCards[0].dataset.name === openedCards[1].dataset.name) {
      scoreFunction();
      matched();
    } else {
      unmatched();
    }
  }
}


//Om korten matchar
function matched() {
  openedCards[0].classList.add("match");
  openedCards[1].classList.add("match");
  openedCards[0].classList.remove("show", "open");
  openedCards[1].classList.remove("show", "open");
  openedCards = [];
}

//Om korten inte matchar visas korten i en sekund och vänds sedan tillbaka igen.
function unmatched() {
  disable();
  setTimeout(function() {
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    enable();
    openedCards = [];
  }, 1000);
}

//avvaktiverar korten tillfälligt
function disable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.add("disabled");
  });
}

//aktiverar kort som inte matchar och avvaktiverar kort som matchar.
function enable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.remove("disabled");
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}

//räknar hur många försök man gjort och om man vänt upp "deathCard".
function moveFunction() {
  moves.push([1]);
  if (openedCards[0] == deathCard || openedCards[1] == deathCard) {
    var badCard = document.querySelector(".deathCard");
    badCard.classList.add("open", "disabled", "match");
    moves.push(1);
  }
  moveCounter.innerHTML = "Antal försök: " + moves.length;
  keepOnGoingOrNot();
}

// kollar om man vunnit eller gjort för många försök
function keepOnGoingOrNot() {
  whichMessageToDisplay = moves.length;
  switch (whichMessageToDisplay) {
    case 4:
      displayMessage = "Du klarade det på 4 försök, utmärkt!";
      break;
    case 5:
      displayMessage = "Du klarade det på 5 försök, mycket bra!";
      break;
    case 6:
      displayMessage = "Du klarade det på 6 försök, bra jobbat!";
      break;
    case 7:
      displayMessage = "Du klarade det på 7 försök, helt okej!";
      break;
    case 8:
      displayMessage = "Du klarade det på 8 försök, puh!";
      break;
  }

  if (score.length == 4) {
    winner();
    var getTryAgainButton = document.querySelector(".startButton");
    getTryAgainButton.remove();
  }
  if (moves.length >= 8 && score.length != 4) {
    displayMessage = "Du klarade inte det. Försök igen!";
    tryAgain();
    removeListeners();
  }
}

//poängräknarfunktion
function scoreFunction() {
  score.unshift(1);
  var sum = score.reduce((total, value) => total + value, 0);
  scoreCounter.innerHTML = "Poäng: " + sum;
  keepOnGoingOrNot();
}

// om man klarat spelet körs denna funktion
function winner() {
  if (matchedCard.length >= 8) {
    localStorage.clear();
    removeListeners();
    var getContainer = document.querySelector("#container");
    getContainer.remove();
    var getWinnerBox = document.querySelector(".winner-box");
    getWinnerBox.innerHTML = "<h1> Congratulations! You made it! </h1>" + displayMessage;
    var button = document.createElement("BUTTON");
    button.setAttribute("class", "finalButton");
    var buttonText = document.createTextNode("Move on!");
    button.appendChild(buttonText);
    document.body.appendChild(button);
    document.querySelector(".finalButton").addEventListener("click", function() {
      location.href = "../minispeljocke.html";
    });
  }
}

// om man inte klarat spelet körs denna.
function tryAgain() {
  localStorage.clear();
  var getStartButton = document.querySelector(".startButton");
  getStartButton.innerHTML = "Try Again!";
  var getLoserBox = document.querySelector(".winner-box");
  getLoserBox.innerHTML = "<h1>Pyttsan!</h1>" + displayMessage;
  document.querySelector(".startButton").addEventListener("click", reloadGame);

  function reloadGame() {
    location.href = "../html/memory.html";
  }
}

// tar bort eventlyssnarna och visar upp korten (om man inte klarat spelet)
function removeListeners() {
  for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.removeEventListener("click", revealCard);
    card.removeEventListener("click", cardOpen);
    card.removeEventListener("click", winner);
    card.classList.add("open", "disabled", "match");
  }
}









// END
