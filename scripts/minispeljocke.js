//////////////////////////////////////Deklarationer//////////////////////////////

const list = [
  ['svärd', 'fantasy', 'dvärg', 'mördare', 'orcher', 'hobbit', 'hammare', 'demon', 'balrog',
    'ödla', 'svampar', 'spjut', 'barbar', 'bard', 'munk', 'stjärnor', 'måne', 'örter', 'spöke', 'båt'
  ],
  ['transkribera', 'trollstav', 'trollkarl', 'häxmästare', 'analysera', 'alkemist',
    'xenofob', 'lärling', 'dödsjuk', 'spännande', 'pervers', 'excentrisk'
  ],
  ['hackerattackerna', 'mahognyskrivbord', 'ödesstämningarna', 'ölbuteljsetikett', 'tablettmissbruk',
    'överljudshastighet', 'rabarberpajerna', 'narkolepsifallen', 'packningsapparat', 'yrkesdemonstrant'
  ]
];
let randomVal, word, newGameOr, list2 = [],
  avatar, player1Score, player2Score, player3Score,
  inputBox, timer = 11,
  playThrough = 0,
  newGameBtn, hiList = [{}, {}, {}],
  backpack,
  tickTock, theDifficulty, status = true,
  ding = new Audio('../jbildmusik/ding.wav'),
  music = new Audio('../jbildmusik/backmusic.mp3');
castle = new Audio('../jbildmusik/castleDoor.mp3');
gameOverSound = new Audio('../jbildmusik/gameover.mp3');
fanfare = new Audio('../jbildmusik/fanfare.mp3');

avatar = localStorage.getItem('userName');
backpack = localStorage.backIcon;



let player = {
  avatar: avatar,
  name: '',
  lName: '',
  age: 0,
  score: 0,
  fullName: function() {
    return `${this.name} ${this.lName}`
  }
};

////////////////////////////////////dom element//////////////////////////////
$('#endScreen').hide();
$('#hiScore').hide();
level = document.querySelector('#level');
level.innerHTML = 'Nivå:';
tickTock = document.querySelector('#time');
tickTock.innerHTML = timer;
playerInfo = document.querySelector('#player');
word = document.querySelector('#word');
word.innerHTML = '-Start-';
inputBox = document.querySelector('#inputBox');
scoreBoard = document.querySelector('#score');
scoreBoard.innerHTML = 'Poäng:0'
newGameBtn = document.querySelector('#btn');
endGameBtn = document.querySelector('#btn2');
scoreGameBtn = document.querySelector('#btn3');
avatarPlace = document.querySelector('#playAvatar');
avatarPlace.innerHTML = `${avatar}`
gate = document.querySelector('#gate');
/////////////////////////////////Event lyssnare ////////////////////////////

// kollar varje gång man trycker på en tangent om ordet i word är samma somm input boxen.
inputBox.addEventListener('input', checkVal);
newGameBtn.addEventListener('click', goAgain);
endGameBtn.addEventListener('click', nextScreen);
scoreGameBtn.addEventListener('click', showHighScore);
newGameBtn.addEventListener('mouseenter', paintIt);
endGameBtn.addEventListener('mouseover', paintIt2);
scoreGameBtn.addEventListener('mouseover', paintIt3);
newGameBtn.addEventListener('mouseleave', paintItNot);
endGameBtn.addEventListener('mouseleave', paintItNot);
scoreGameBtn.addEventListener('mouseleave', paintItNot);
word.addEventListener('click', wordStart);
gate.addEventListener('click', enterTheCastle)


////////////////////////////////////////////////////////////////////////

function checkBackPack() { //om man valde backpack i början får man plus 10 sek.
  if (backpack = true) {
    timer += 10;
  }
}

function enterTheCastle() {

  playCastle();
  music.play();
  event.stopPropagation()
  $('#gate').animate({
    top: '-100%'
  }, 4500);

}

function wordStart() {

  $('#gate').hide();
  startThegame();
  document.querySelector('#word').removeEventListener('click', wordStart);
}

//matar in information till min end screen.
function updateEndScreen() {

  document.querySelector('#playAvatar').innerHTML = `Avatar: ${player.avatar}`;
  document.querySelector('#playName').innerHTML = `Namn: ${player.fullName()}`;
  document.querySelector('#playAge').innerHTML = `Ålder: ${player.age}`;
  document.querySelector('#playScore').innerHTML = `Poäng: ${player.score}`;

}

function uppdateHiScore() {

  if (playThrough == 0) {

    document.querySelector('#player1').innerHTML = `Namn: ${hiList[playThrough].fullName()}, ${hiList[playThrough].age} poäng: ${hiList[playThrough].score}`;

  }

  if (playThrough == 1) {

    document.querySelector('#player2').innerHTML = `Namn: ${hiList[playThrough].fullName()}, ${hiList[playThrough].age} poäng: ${hiList[playThrough].score}`;

  }

  if (playThrough == 2) {

    document.querySelector('#player3').innerHTML = `Namn: ${hiList[playThrough].fullName()} Ålder: ${hiList[playThrough].age} poäng: ${hiList[playThrough].score}`;

  }


}


function showHighScore() { // uppdaterar beroende på vilken playthrough man är

  if (status == true) { //togglar mellan rundan som gick och highscorelistan

    hideAndShow();
    status = false;

  } else if (status == false) {

    showAndHide()
    status = true;

  }
}

function hideAndShow() {
  $('#stats').hide();
  $('#hiScore').show();
}

function showAndHide() {
  $('#stats').show();
  $('#hiScore').hide();
}

function paintIt(event) {

  event.target.style.backgroundColor = 'green';

}

function paintIt2(event) {

  event.target.style.backgroundColor = 'red';

}

function paintIt3(event) {

  event.target.style.backgroundColor = 'orange';

}

function paintItNot(event) {

  event.target.style.backgroundColor = '#b37700';

}

//functionen för att stoppa musiken och clearar intervallen.
function stopCastle() {

  castle.pause();
  clearInterval(stopCastleSound);

}
//starta vinbryggemusiken. och sätter en interval som stoppar den efter 5 sekunder
function playCastle() {

  castle.play();
  stopCastleSound = setInterval('stopCastle()', 5000);

}

//clearar boxen för nya ord.
function clearInput() {

  inputBox.value = '';

}

//sätter igång timrarna som kollar om spelet är slut eller om det ska fortsätta.
function setAllInterval() {

  checkStatusTime = setInterval(checkStatus, 50);
  timerTime = setInterval(time, 999); // sätter tiden lite under en sekund, annars stannar den på ett.

}
//clearar timrarna så att dom inte dubbelklickar om man startar om spelet.
function clearAllInterval() {

  clearInterval(checkStatusTime);
  clearInterval(timerTime);

}

function goAgain() {

  if (playThrough == 2) {

    alert('Du har spelat nog nu, jag skickar vidare dig. Bye Bye.')
    window.location = 'js\minspeljocke\minispeljocke.html';

  } else {

    showAndHide();
    $('#endScreen').hide();
    $('#hideIt').show(); //tvärtemot endscreen om man vill köra igen visas allt igen.
    player.score = 0; // resetar score för ny runda.
    scoreBoard.innerHTML = 'Poäng:0'; //rensar scoreBoard för nästa runda, annars syns den gamla tills man fått nytt poäng.
    clearInput(); //clearar för ny runda.
    playThrough++; //plussar på rundan så att highscore listan får ny entry.
    timer = 10; // sätter tid så att intervalen inte stoppar spelet.
    music.play(); //sätter igång backgrundmusiken igen.
    status = true //togglar highscore listan så att den inte är öppen vid nästa playThrough
    startThegame();

  }
}



function nextScreen() {
  if (player.score >= 20) {
    alert('Du klarade spelet!');
    window.location = '../html/gameover.html';
  } else if (player.score < 20 && playThrough == 2) {
    alert('Du klarade det inte...börjar om');
    window.location = '../index.html';
  } else {
    alert('du måste få minst 20 poäng för att komma vidare');
  }
}

function endScreen() {

  $('#hideIt').hide(); //gömmer all information så att jag kan ha winscreen
  updateEndScreen(); //ger informationen till ul listan
  uppdateHiScore() //uppdaterar highscorelistan.
  $('#endScreen').show(); // visar stats och knappar för att avsluta eller starta nytt spel
}


function copyToHighScore() { // kopierar player info till en array med objekt

  hiList[playThrough] = Object.assign({}, player);

}


function checkStatus() {

  if (list2.length <= 0 && theDifficulty == 'trollkarl') { // game over men man vinner.
    music.pause();
    fanfare.play();
    copyToHighScore();
    clearAllInterval();
    endScreen();

  }

  if (timer <= 0) { //game over.

    music.pause();
    gameOverSound.play();
    copyToHighScore();
    clearAllInterval();
    endScreen();

  }
}

function levelup() { // om man kommer upp till satt poäng levlar man upp och det blir svårare

  if (player.score >= 10 && theDifficulty == 'novis') {

    while (list2.length > 0) {
      list2.pop();
    }

    for (let i = 0; i < list[1].length; i++) {
      list2.push(list[1][i]);

    }

    level.innerHTML = 'Nivå: 2';
    theDifficulty = 'lärjunge';

  }

  if (player.score >= 20 && theDifficulty == 'lärjunge') {


    while (list2.length > 0) {
      list2.shift();

    }

    for (let i = 0; i < list[2].length; i++) {
      list2.push(list[2][i]);

    }

    level.innerHTML = 'Nivå: 3';
    theDifficulty = 'trollkarl';

  }

}

function scoreUp() { //plussar på poäng.
  player.score++;
  scoreBoard.innerHTML = `Poäng:${Object.values(player)[4]}`;
}

function checkVal() { //själva spelet.

  focusInputBox();
  word.innerHTML = list2[randomVal];
  if (word.innerHTML === inputBox.value) {
    levelup();
    ding.play(); //trevligt litet ljud när man skrivit rätt.
    list2.splice(randomVal, 1);
    getRandomNum(); //randomiza nästa ord.
    word.innerHTML = list2[randomVal];
    clearInput(); //tar bort text så att man kan skriva nytt
    scoreUp();
    plusTime(); // mer tid vid rätt.
  }
}

function plusTime() { //om man gissar rätt får man mer tid beroende på svårighetsgrad.
  if (theDifficulty == 'novis') {

    timer += 3;

  }
  if (theDifficulty == 'lärjunge') {

    timer += 4;

  }

  if (theDifficulty == 'trollkarl') {
    timer += 6;

  }
}


// ge focis till inpotbox, så att man är redo att spela.
function focusInputBox() {

  inputBox.focus();

}

// ger en random siffra för att få fram ett random or ur min array
function getRandomNum() {

  randomVal = Math.floor(Math.random() * list2.length);

}

function time() { // den här räknar och går på intervall

  timer--;
  tickTock.innerHTML = timer;

}


function difficulty() { // återavnvändbar för att få välja sin svårighetsgrad om man vill spela igen eller nåt.


  list2 = []; // clearar listan så att ett ny ramlar in.

  theDifficulty = prompt('Välj svårighetsgrad, skriv novis, lärjunge eller trollkarl 10,20,30 sekunders starttid. om man väljer nån av dom lägre kommer man eventuellt till trollkarl. Jag rekommenderar novis. Om du valde ryggsäcken i början så får du extra tid.');

  checkBackPack(); //om man valde backpack i början får man plus 10 sek.

  switch (theDifficulty) {



    case 'novis':
      level.innerHTML = 'Nivå: Novis';
      novice = true;
      for (let i = 0; i < list[0].length; i++) {
        list2.unshift(list[0][i]);
      }

      break;

    case 'lärjunge':
      level.innerHTML = 'Nivå: Lärjunge';
      for (let i = 0; i < list[1].length; i++) {
        list2.push(list[1][i]);
      }
      timer += 10;

      break;

    case 'trollkarl':
      level.innerHTML = 'Nivå: Trollkarl';
      for (let i = 0; i < list[2].length; i++) {
        list2.push(list[2][i]);
      }
      timer += 20;

      break;

    default:

      alert('Någonting gick fel');

      difficulty(); //skickar till svårighetsgrad. eftersom ingen blev vald, fortsätter kalla på sig själv tills det blir rätt.
  }

  getRandomNum(); //får första random numret här annars börjar listan alltid på samma.

  setAllInterval(); //sätter igång tidräkning, och cheken om det är gameover eller ej.

  checkVal(); //kickstartar igång spelet, sen går det på intervall.
}


function startThegame() { // spelet startar här användaren får knappra in sitt namn ålder och svårighetsgrad

  alert(`Hej, ${avatar}`)
  player.name = prompt('Namn'); // lite information om spelaren som sparas i ett objekt.
  player.lName = prompt('Efternamn');
  player.age = prompt('skriv in ålder');

  difficulty(); //skickar till svårighetsgrad.

}
