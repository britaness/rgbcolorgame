var colors = [];
var displayText;
var n;
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var guessedRightDisplay = document.querySelector("#guessedRight");
var header = document.querySelector("#header");
var playAgain = document.querySelector("#playAgain");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var tabBar = document.querySelector("#tabBar");

//ON PAGE LOAD
init();

//EASY SETTING
easyButton.addEventListener("click", function(){
  for (i = 2; i<6; i++){
    squares[i].style.backgroundColor = "#232323";
  }
  n = 3;
  easyButton.style.boxShadow = "0px 0px 0px 0px rgba(0, 0, 0, 0)";
  hardButton.style.boxShadow = "inset 0px 0px 20px rgba(0,0,0,0.4)";
  hardButton.style.color = "rgba(255,255,255,0.7)";
  easyButton.style.color = "white";
  tabBar.style.backgroundColor = "green";
  fix();
})

//HARD SETTING
hardButton.addEventListener("click", function(){
  n = 6;
  hardButton.style.boxShadow = "0px 0px 0px 0px rgba(0, 0, 0, 0)";
  easyButton.style.boxShadow = "inset 0px 0px 20px rgba(0,0,0,0.4)";
  easyButton.style.color = "rgba(255,255,255,0.7)";
  hardButton.style.color = "white";
  tabBar.style.backgroundColor = "red";
  fix();
})

//PLAY AGAIN / NEW COLORS BUTTON
playAgain.addEventListener("click", function(){
  colors = generateRandomColors(n);
  pickedColor = colors[pickOneColor(n)];
  if (n===3) {
    easySetting();
  }
  //change color display to match picked color
  changeDisplay();
  //assign colors to squares
  assignColorsToSquares();
  header.style.backgroundColor = "#232323";
  playAgain.textContent = "New Colors";
  guessedRightDisplay.textContent = "What is the correct color?";
})


//FUNCTIONS
function init() {
  n=6;
  colors = generateRandomColors(n);
  pickedColor = colors[pickOneColor(n)];
  assignColorsToSquares();
  changeDisplay();
}

function fix() {
  header.style.backgroundColor = "#232323";
  squares.length = n;
  colors = generateRandomColors(n);
  assignColorsToSquares();
  pickedColor = colors[pickOneColor(n)];
  changeDisplay();
  playAgain.textContent = "New Colors";
  guessedRightDisplay.textContent = "What is the correct color?";
}

function pickOneColor(x){
  var num = Math.floor(Math.random()*x);
  return num;
}

function changeDisplay(){
  colorDisplay.textContent = pickedColor;
  displayText = String.prototype.toUpperCase(pickedColor);
}

function generateRandomColors(n) {
  var arr = [];
  for (i=0; i<n; i++){
    arr.push(pickColor());
  }
  return arr;
}

function assignColorsToSquares() {
  for (var i = 0; i<squares.length; i++){
    //add colors to squares
    squares[i].style.backgroundColor = colors[i];
    //assign colors of squares to colors array
    colors[i]=squares[i].style.backgroundColor;
    //add click listeners to squares
    squares[i].addEventListener("click", function(){
    //grab color of clicked squares
    var clickedColor = this.style.backgroundColor;
    //compare color of square to picked color
      if (clickedColor === pickedColor){
        guessedRightDisplay.textContent = "Correct!";
        header.style.backgroundColor = pickedColor;
        correctColor(clickedColor);
        playAgain.textContent = "Play Again?"
      }
      else {
        this.style.backgroundColor = "#232323";
        guessedRightDisplay.textContent = "Try Again";
      }
    });
  }
}

function correctColor(color){
  if (n===6){
    for (var i=0; i<squares.length; i++){
    squares[i].style.backgroundColor = color;
    }
  }
  if (n===3){
    for (var i=0; i<3; i++){
    squares[i].style.backgroundColor = color;
    }
    easySetting();
  }
}

function pickColor(){
  var randomColor = "rgb(" + randomNum() + ", " + randomNum()  + ", " + randomNum() + ")";
  return randomColor
}

function randomNum(){
  var num = Math.floor(Math.random()*256);
  return num;
}

function easySetting() {
  for (var i=3; i<6; i++){
    squares[i].style.backgroundColor = "#232323";
  }
}
