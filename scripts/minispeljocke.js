//////////////////////////////////////Deklarationer//////////////////////////////

const list = [
  ['svärd', 'fantasy', 'dvärg', 'mördare', 'orcher', 'hobbit', 'hammare', 'demon', 'balrog',
    'ödla', 'svampar', 'spjut', 'barbar', 'bard', 'munk', 'stjärnor', 'måne', 'örter', 'spöke', 'båt'
  ],
  ['transkribera', 'trollstav', 'trollkarl', 'häxmästare', 'analysera', 'alkemist',
    'xenofob', 'lärling', 'dödsjuk', 'spännande', 'pervers', 'excentrisk'
  ],
  ['hackerattackerna', 'mahognyskrivbord', 'ödesstämningarna', 'ölbuteljsetikett', 'tablettmissbruk',
    'pixelfebersyptom', 'rabarberpajerna', 'narkolepsifallen', 'packningsapparat', 'yrkesdemonstrant'
  ]
];
let randomVal, word, newGameOr, list2 = [],
  avatar, player1Score, player2Score, player3Score,
  inputBox, timer = 10,
  playThrough = 0,
  newGameBtn, hiList = [{}, {}, {}],
  backpack,
  tickTock, theDifficulty, status = true,
  music = new Audio('../jbildmusik/backmusic.mp3');
  castle = new Audio('../jbildmusik/castleDoor.mp3');
  gameOverSound = new Audio('../jbildmusik/gameover.mp3');
  fanfare = new Audio('../jbildmusik/fanfare.mp3');

avatar = localStorage.getItem('userName');
backpack = localStorage.getItem('backIcon');



let player = {
  avatar: `${avatar}`,
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
  if (backpack == 'true') {
    timer = 20;
    alert('Gytt du har väskan, +10 sek till på tiden.');
  }
}

function enterTheCastle() { //sätter igång vindbryggan och musiken startar.

  playCastle();
  playTheMusic();
  event.stopPropagation()
  $('#gate').animate({
    top: '-100%'
  }, 4500);

}

function wordStart() { //gömmer porten.

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

function uppdateHiScore() { //ger information till highscorelistan.

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


function playTheMusic() { //sätter på backgrundsmusiken
  music.play();
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

function hideAndShow() { //togglar mellan den spleade rundan och highscorelistan
  $('#stats').hide();
  $('#hiScore').show();
}

function showAndHide() {
  $('#stats').show();
  $('#hiScore').hide();
}

function paintIt(event) { //3 nästkommande ger färg om man hovrar på knapparna i slutet.

  event.target.style.backgroundColor = 'green';

}

function paintIt2(event) {

  event.target.style.backgroundColor = 'red';

}

function paintIt3(event) {

  event.target.style.backgroundColor = 'orange';

}

function paintItNot(event) { //revertar färgen på knapparna i slutet.

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

function goAgain() { //ny spelrunda om man kört igenom spelet 3 gånger med start på noll så skickas man till startsidan.

  if (playThrough == 2) {

    alert('Du klarade det tyvärr inte, lycka till nästa gång!')
    window.location = '../index.html';

  } else {

    showAndHide();
    $('#endScreen').hide();
    $('#hideIt').show(); //tvärtemot endscreen om man vill köra igen visas allt igen.
    player.score = 0; // resetar score för ny runda.
    scoreBoard.innerHTML = 'Poäng:0'; //rensar scoreBoard för nästa runda, annars syns den gamla tills man fått nytt poäng.
    clearInput(); //clearar för ny runda.
    playThrough++; //plussar på rundan så att highscore listan får ny entry.
    timer = 11; // sätter tid så att intervalen inte stoppar spelet.
    playTheMusic(); //sätter igång backgrundmusiken igen.
    status = true //togglar highscore listan så att den inte är öppen vid nästa playThrough
    startThegame();

  }
}

function winOrNotMusic() { //broende på vilken poäng man fick spelas ett visst ljud.
  if (player.score >= 30) {
    fanfare.play();
  }

  if (player.score < 30) {
    gameOverSound.play();
  }
}

function pauseMusic() { //pausa backgrundsmusiken
  music.pause();
}

function clearIt() { //clearar local storage
  localStorage.clear();
}

function nextScreen() { //bestämmer om man får gå vidare till slutet.

  if (player.score >= 30) {

    clearIt();
    clearAllInterval();
    alert(`Yerr a wizard ${avatar}!`);
    window.location = '../html/gameover.html';

  } else if (player.score < 30 && playThrough == 2) {

    clearIt();
    clearAllInterval();
    alert('3 försök gjorda, Gör om gör rätt.');
    window.location = '../index.html';
  } else {
    alert('du måste få minst 30 poäng för att komma vidare');

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

  if (list2.length <= 0 && theDifficulty == 'trollkarl') { // game over.

    pauseMusic();
    winOrNotMusic();
    copyToHighScore();
    clearAllInterval();
    endScreen();

  }

  if (timer <= 0) { //game over.

    pauseMusic();
    winOrNotMusic();
    copyToHighScore();
    clearAllInterval();
    endScreen();

  }
}

function levelup() { // om man kommer upp till satt poäng levlar man upp och det blir svårare

  if (list2.length == 3 && theDifficulty == 'novis') {

    while (list2.length > 0) {
      list2.pop();
    }

    for (let i = 0; i < list[1].length; i++) {
      list2.push(list[1][i]);

    }

    level.innerHTML = 'Nivå: 2';
    theDifficulty = 'lärjunge';

  }

  if (list2.length == 3 && theDifficulty == 'lärjunge') {


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
  if (theDifficulty != 'trollkarl') {
    player.score++;
    scoreBoard.innerHTML = `Poäng:${Object.values(player)[4]}`;
  } else {
    player.score += 3;
    scoreBoard.innerHTML = `Poäng:${Object.values(player)[4]}`;
  }
}

function checkVal() { //själva spelet.

  focusInputBox();
  word.innerHTML = list2[randomVal];
  if (word.innerHTML === inputBox.value) {
    levelup();
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

    timer += 2;

  }
  if (theDifficulty == 'lärjunge') {

    timer += 3;

  }

  if (theDifficulty == 'trollkarl') {
    timer += 4;

  }
}


// ge focus till inpotbox, så att man är redo att spela.
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

  checkBackPack(); //om man valde backpack i början får man plus 10 sek.

  list2 = []; // clearar listan så att ett ny ramlar in.

  theDifficulty = prompt('Välj svårighetsgrad, skriv novis, lärjunge eller trollkarl 10,20,5(trollkarlar är hardcore) sekunders starttid. om man väljer nån av dom lägre kommer man eventuellt till trollkarl.Om du får 30 poäng eller över kan du avsluta spelet! Du har 3 försök. Var beredd på att börja skriva när du stänger denna.');



  switch (theDifficulty) { // väljer svårighetsgrad.



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
      timer += 5;

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

  alert(`Hej, ${avatar}`);
  player.name = prompt('Namn'); // lite information om spelaren som sparas i ett objekt.
  player.lName = prompt('Efternamn');
  player.age = prompt('skriv in ålder');

  difficulty(); //skickar till svårighetsgrad.

}
