// alla variabler
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2.5;
var dy = -2.5;

var paddleHeight = 8;
var paddleWidth = 90;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 4;
var brickColumnCount = 5;
var brickWidth = 85;
var brickHeight = 25;
var brickPadding = 8;
var brickOffsetTop = 40;
var brickOffsetLeft = 110;

var paused = false;

var score = 0;
var endScore = score;
var livesArr = [];
var livesW = 3;
var livesArrTwo;


// kollar ifall man har valt mitt item
var bowIcon = localStorage.getItem("bowIcon");
switch (bowIcon) {
case "true":
  livesP = 4; //om man väljer mitt item så får man ett extra liv
  break;
default:
  livesP = 3;
  break;
}
var lives = livesP;


/*gjorde såhär för att använda while, men det låste signär jag la till switch-satsen med items,
så var tvungen att göra en "fejk" variabel med liv, som jag sedan kör i while-loopen */
while (livesW != 1 || livesW != 2 || livesW != 3 || livesW !=4) {
  if (livesW == 1 || livesW == 2 || livesW == 3) {
    for (i = livesW; i > 0; i--) {
      livesArr.push(livesP);
    }
    break;
  }
}
livesArrTwo = livesArr.length;


var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1
    };
  }
}


// så att man kan styra brädan och pausa spelet
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener('keydown', pauseGameKeyHandler, false);


// för piltangenterna
function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}

// för piltangenterna
function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
}


// så att man kan pausa spelet
function pauseGameKeyHandler(e) {
  var keyCode = e.keyCode;
  switch(keyCode) {
    case 80: //för P tangenten
    togglePause();
    break;
  }
}

// toggle för paus
function togglePause() {
  paused = !paused;
  draw();
}


// här skapar vi bollen
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#eebf1b";
  ctx.fill();
  ctx.closePath();
}


// här skapar vi brädan
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#1c8210";
  ctx.fill();
  ctx.closePath();
}


// här ritar vi upp brickorna
function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#df5353";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}


// ritar upp startvyn
function drawStart() {
  ctx.font = "20px Charm";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Tryck på 'Start' för att starta ett nytt spel!", 140, 200);
}


// för att dölja canvas
function hideCanvas() {
  var x = document.getElementById("spel");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  window.setTimeout(function () {
		canvas.remove();
	}, 1000);
}


//för att dölja next
function hideNext() {
  var k = document.getElementById("next");
  if (k.style.display === "none") {
    k.style.display = "block";
  } else {
    k.style.display = "none";
  }
}


//för att dölja restart
function hideRestart() {
  var k = document.getElementById("restart");
  if (k.style.display === "none") {
    k.style.display = "block";
  } else {
    k.style.display = "none";
  }
}


//för att visa next
function showNext() {
  var l = document.getElementById("next");
  if (l.style.display === "none") {
    l.style.display = "inline";
  } else {
    l.style.display = "block";
  }
}


//för att visa restart
function showRestart() {
  var l = document.getElementById("restart");
  if (l.style.display === "none") {
    l.style.display = "inline";
  } else {
    l.style.display = "block";
  }
}


// ritar upp ens poäng på canvasen
function drawScore() {
  ctx.font = "18px Charm";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Poäng: "+score, 210, 22);
}


// ritar upp ens liv på canvasen
function drawLives() {
  ctx.font = "18px Charm";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Liv: "+lives, 340, 22);
}


//för att få in array metoderna
function scoreArr(){
var points = [];
points.push(score);
var newScore = points.pop();
console.log(newScore);
};


// funktion för när bollen träffar brickorna
function collisionDetection() {
  for(var c=0; c<bricks.length; c++) {
    for(var r=0; r<bricks[c].length; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            scoreArr();
            hideCanvas();
            togglePause();
            var div = document.querySelector(".next");
            var finalScore = document.createElement("p");
            finalScore.textContent = "Grattis, du klarade spelet! Du fick " + score + " poäng.\nNu kan du gå vidare till nästa del i det här äventyret!";
            document.body.appendChild(finalScore);
            finalScore.style.fontFamily = "Charm, cursive";
            finalScore.style.fontSize = "25px";
            finalScore.style.textAlign = "center";
            showNext();
            localStorage.removeItem("bowIcon");
          }
        }
      }
    }
  }
}


hideNext();
hideRestart();
drawStart();


// huvudfunktionen med alla andra funktioner som ritar upp allting
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      lives--;
      if(lives == 0) {
        scoreArr();
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        hideCanvas();
        var div = document.querySelector(".next");
        var endScore = document.createElement("p");
        endScore.textContent = "Du förlorade! Du fick " + score + " poäng. Bättre lycka nästa gång!";
        document.body.appendChild(endScore);
        endScore.style.fontFamily = "Charm, cursive";
        endScore.style.fontSize = "25px";
        endScore.style.textAlign = "center";
        showRestart();
        localStorage.removeItem("bowIcon");
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;

  if (!paused) {
    requestAnimationFrame(draw);
  }
}


//2d array som skriver ut vem som har gjort spelet
var creator = [
  ["Marcus Andersson"],
  ["17/1-2019"]
];
console.log(""+creator[0][0]+" la den sista pusselbiten till det här spelet "+creator[1][0]+".");
