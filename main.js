function startButton() {
  document.getElementsByClassName("header")[0].style.display = "block";
  document.getElementsByTagName("section")[0].style.display = "flex";
  document.getElementsByClassName("startscreen")[0].style.display = "none";
  nameInput = prompt("Enter your username: ");
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
}

function wandFunction() {
  document.getElementsByTagName("div")[0].style.display = "none";
  document.getElementsByTagName("section")[0].style.display = "none";


}

function backFunction() {
  document.getElementsByTagName("div")[0].style.display = "none";
  document.getElementsByTagName("section")[0].style.display = "none";

}
