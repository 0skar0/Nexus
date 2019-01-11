let mapIcon,
  var1,
  userChoice,
  var3;

document.getElementsByClassName("startbutton")[0].addEventListener("click", function() {
  document.getElementsByClassName("header")[0].style.display = "block";
  document.getElementsByTagName("section")[0].style.display = "flex";
  document.getElementsByClassName("startscreen")[0].style.display = "none";
});

document.getElementsByTagName("img")[0].addEventListener("click", function() {
  document.getElementsByTagName("div")[0].style.display = "none";
  document.getElementsByTagName("section")[0].style.display = "none";
  mapIcon = true;
});

document.getElementsByTagName("img")[1].addEventListener("click", function() {
  document.getElementsByTagName("div")[0].style.display = "none";
  document.getElementsByTagName("section")[0].style.display = "none";
  var1 = true;
});

document.getElementsByTagName("img")[2].addEventListener("click", function() {
  document.getElementsByTagName("div")[0].style.display = "none";
  document.getElementsByTagName("section")[0].style.display = "none";
  userChoice = 0;
});

document.getElementsByTagName("img")[3].addEventListener("click", function() {
  document.getElementsByTagName("div")[0].style.display = "none";
  document.getElementsByTagName("section")[0].style.display = "none";
  var3 = true;
});