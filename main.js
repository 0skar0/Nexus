function startButton() {
  document.getElementsByClassName("header")[0].style.display = "block";
  document.getElementsByTagName("section")[0].style.display = "flex";
  document.getElementsByClassName("startscreen")[0].style.display = "none";
  nameInput = prompt("Välj namn på din hjälte: ");
  localStorage.userName = nameInput;
}

function mapFunction() {
  document.getElementsByTagName("div")[0].style.display = "none";
  document.getElementsByTagName("section")[0].style.display = "none";
  localStorage.mapIcon = true;
}

function bowFunction() {
  document.getElementsByTagName("div")[0].style.display = "none";
  document.getElementsByTagName("section")[0].style.display = "none";
  localStorage.bowIcon = true;
}

function wandFunction() {
  document.getElementsByTagName("div")[0].style.display = "none";
  document.getElementsByTagName("section")[0].style.display = "none";
  localStorage.userChoice = true;
}

function backFunction() {
  document.getElementsByTagName("div")[0].style.display = "none";
  document.getElementsByTagName("section")[0].style.display = "none";
  localStorage.backIcon = true;
}
