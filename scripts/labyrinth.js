// Viktor Svensson - Labyrinth Game
function init() {

  // 2D array template for drawing labyrinth
  let arrayLabyrinth = [
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
    [-1, 1, 0, 1, 0, 0, 1, 1, 0, 0],
    [1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 1, 1, 0, 1],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 1]
  ];

  // Array methods
  arrayLabyrinth[9].splice(8, 2);
  arrayLabyrinth[9].push(0, 1);
  arrayLabyrinth[9].pop();
  arrayLabyrinth[9].push(0, 1);
  arrayLabyrinth[9].shift();
  arrayLabyrinth[9].unshift(0);

  // Coordinates for player position
  let firstObject = {
    x: 0
  };

  let secondObject = {
    y: 0
  };

  // Merge objects
  let playerCoordinates = Object.assign(firstObject, secondObject);

  // Set canvas size
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  // Clear and draw background canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw cross
  let exitImage = new Image();
  exitImage.onload = function() {
    ctx.drawImage(exitImage, 300, 540, 60, 60);
  };
  exitImage.src = "../images/64/x.png";

  // Draw hammer
  let hammerImage = new Image();
  hammerImage.onload = function() {
    ctx.drawImage(hammerImage, 0, 360, 60, 60);
  };
  hammerImage.src = "../images/64/hammer.png";

  // Draw poison
  let greenImage = new Image();
  greenImage.onload = function() {
    ctx.drawImage(greenImage, 300, 360, 60, 60);
  };
  greenImage.src = "../images/64/potionGreen.png";

  // Function for checking player coordinates and draw player and walls
  function labyrinthGame() {
    // Loop over object and add values to string
    let playerPosition = "";
    for (let inProperty in playerCoordinates) {
      playerPosition += playerCoordinates[inProperty];
    }

    // Check timer and coordinates
    if ((seconds == 0) && (playerPosition != "59")) {
      gameOver();
    }

    // Check poison
    if (playerPosition == "56") {
      ctx.clearRect(300, 360, 60, 60);
      ctx.fillStyle = "black";
      ctx.fillRect(300, 360, 60, 60);
      poisonImage();
    }

    // Check hammer
    if ((playerPosition == "06") && (seconds > 0) && (o == 0)) {
      ctx.clearRect(0, 360, 60, 60);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 360, 60, 60);
      arrayLabyrinth[6][0] = 0;
      foundHammer();
    }

    // Check exit
    if ((playerPosition == "59") && (arrayLabyrinth[6][0] == 0) && (seconds >= 0)) {
      ctx.clearRect(300, 540, 60, 60);
      ctx.fillStyle = "black";
      ctx.fillRect(300, 540, 60, 60);
      finishedGame();
    } else if ((playerPosition == "59") && (seconds > 0)) {
      needHammer();
    }
    drawPlayer();
  }

  // Draw walls and player
  function drawPlayer() {
    for (let i = 0; i < arrayLabyrinth.length; i++) {
      for (let x = 0; x < arrayLabyrinth[i].length; x++) {
        if (arrayLabyrinth[i][x] === 1) {
          ctx.fillStyle = "white";
          ctx.fillRect(x * 60, i * 60, 60, 60);
        } else {
          // Draw player
          let playerImage = new Image();
          playerImage.onload = function() {
            ctx.drawImage(playerImage, playerCoordinates.x * 60, playerCoordinates.y * 60, 60, 60);
          };
          playerImage.src = "../images/64/helmet.png";
        }
      }
    }
  }

  // Change coordinates based on keys pressed
  function movePlayer(event) {
    if ((event.which == 38) && checkWalls(playerCoordinates.x, playerCoordinates.y - 1)) {
      clearPlayer();
      playerCoordinates.y--;
    } else if ((event.which == 40) && checkWalls(playerCoordinates.x, playerCoordinates.y + 1)) {
      clearPlayer();
      playerCoordinates.y++;
    } else if ((event.which == 37) && checkWalls(playerCoordinates.x - 1, playerCoordinates.y)) {
      clearPlayer();
      playerCoordinates.x--;
    } else if ((event.which == 39) && checkWalls(playerCoordinates.x + 1, playerCoordinates.y)) {
      clearPlayer();
      playerCoordinates.x++;
    }
    labyrinthGame();
    event.preventDefault();
  }

  // Check walls
  function checkWalls(x, y) {
    return (y >= 0) && (y < arrayLabyrinth.length) && (x >= 0) && (x < arrayLabyrinth[y].length) && (arrayLabyrinth[y][x] != 1);
  }

  // Clear image from previous player position
  function clearPlayer() {
    ctx.clearRect(playerCoordinates.x * 60, playerCoordinates.y * 60, 60, 60);
    ctx.fillStyle = "black";
    ctx.fillRect(playerCoordinates.x * 60, playerCoordinates.y * 60, 60, 60);
    if ((playerCoordinates.x == 5 && playerCoordinates.y == 9) && (arrayLabyrinth[6][0] != 0)) {
      let exitImage = new Image();
      exitImage.onload = function() {
        ctx.drawImage(exitImage, 300, 540, 60, 60);
      };
      exitImage.src = "../images/64/x.png";
    }
  }

  // Game over event
  function gameOver() {
    document.getElementById("timer").style.display = "none";
    document.querySelector("#gameover").style.display = "inline";
    seconds--;
    setTimeout(function() {
      hideGame();
      document.getElementsByTagName("a")[1].style.display = "block";
    }, 3000);
    document.removeEventListener("keydown", movePlayer);
    Object.seal(playerCoordinates);
    localStorage.clear();
  }

  // Poison event
  function poisonImage() {
    document.getElementById("timer").style.display = "none";
    document.querySelector("#gameover").style.display = "inline";
    setTimeout(function() {
      hideGame();
      document.getElementsByTagName("a")[1].style.display = "block";
    }, 3000);
    document.removeEventListener("keydown", movePlayer);
    localStorage.clear();
  }

  // Found hammer feedback
  let o = 0;

  function foundHammer() {
    document.querySelector("#foundhammer").style.display = "inline";
    setTimeout(function() {
      document.querySelector("#foundhammer").style.display = "none";
    }, 3000);
    o++;
  }

  // Need hammer feedback
  function needHammer() {
    document.querySelector("#needhammer").style.display = "inline";
    setTimeout(function() {
      document.querySelector("#needhammer").style.display = "none";
    }, 3000);
  }

  // Finished game event
  function finishedGame() {
    document.getElementById("timer").style.display = "none";
    document.querySelector("#finished").style.display = "inline";
    setTimeout(function() {
      hideGame();
    }, 3000);
    document.removeEventListener("keydown", movePlayer);
    setTimeout(function() {
      document.getElementsByTagName("a")[0].style.display = "block";
    }, 3000);
    localStorage.removeItem("mapIcon");
  }

  let mapIcon = localStorage.getItem("mapIcon");

  // Special item for countdown
  switch (mapIcon) {
  case "true":
    var seconds = 16;
    break;
  default:
    seconds = 12;
    break;
  }

  // Start countdown
  document.getElementById("startbutton").addEventListener("click", countdownFunction);

  // Countdown function
  function countdownFunction() {
    let setCountdown = setInterval(countdownTimer, 1000);

    function countdownTimer() {
      document.getElementById("timer").innerHTML = --seconds;
      if (seconds == 0) {
        clearInterval(setCountdown);
        setTimeout(function() {
          document.getElementById("timer").style.display = "none";
        }, 1500);
        while (seconds == 0 && playerCoordinates.x != 5 && playerCoordinates.y != 9) {
          gameOver();
        }
      }
    }
  }

  // Creating title with callback
  function createTitle(name) {
    document.getElementById("gametitle").innerHTML = "Labyrinth" + name[0].firstChar + name[1].secondChar + name[2].thirdChar + name[2].fourthChar;
  }

  function callbackFunction(callback) {
    // Objects in 2D array and object literal
    let name = [{
      firstChar: " G"
    },
    {
      secondChar: "a"
    },
    {
      thirdChar: "m",
      fourthChar: "e"
    }
    ];
    callback(name);
  }

  callbackFunction(createTitle);

  // Event listener for styling countdown
  document.getElementById("canvas").addEventListener("mouseover", styleFunction);

  function styleFunction() {
    document.querySelector("#timer").style.color = "#0d0d0d";
  }

  // Hide start screen and show game
  document.getElementById("startbutton").onclick = function() {
    // Event listener for moving player
    document.addEventListener("keydown", movePlayer);
    document.getElementById("startscreen").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("wrapper").style.display = "block";
  };

  // Hide game
  function hideGame() {
    document.getElementById("gametitle").style.display = "none";
    document.getElementById("canvas").style.display = "none";
    document.getElementById("timer").style.display = "none";
    Object.freeze(playerCoordinates);
    document.removeEventListener("keydown", movePlayer);
    document.removeEventListener("mouseover", styleFunction);
  }

  // Start labyrinth game
  labyrinthGame();
}

init();