// create variables that target elements on HTML
var startBtn = document.getElementById("start");
var questionEl = document.getElementById("questions");
var timer = document.getElementById("time");
var choices = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var initial = document.getElementById("initials");

// variable to track the state of the quiz
var questionIndex = 0;
var timerId;
var time = 20;

// start function goes here

function start() {
  // need to hide start container when button is clicked
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "hide");

  // show the questions container
  questionEl.removeAttribute("class");

  // start the clock setInterval(function to run, amount of time to run)
  timerId = setInterval(clock, 1000);

  // show the timer on the page
  timer.textContent = time;

  // start the questions function
  startQuestions();
}

function startQuestions() {
  // get the question from this array
  var currentQuestion = questions[questionIndex];

  // update the question in the question container on the HTML
  var title = document.getElementById("question-title");
  title.textContent = currentQuestion.title;

  // // clear out the old choices from the element
  choices.innerHTML = "";

  // // loop through the choices
  currentQuestion.choices.forEach(function (choice, i) {
    // create new button choices for each choice
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);

    choiceBtn.textContent = i + 1 + ". " + choice;

  //   // add onclick
    choiceBtn.onclick = questionClick;

  //   // display on the HTML page
    choices.appendChild(choiceBtn);
  });
}

function questionClick() {
  // check if the answer the user selected is wrong
  if(this.value !== questions[questionIndex.answer]){

    //   if question is wrong take certain time away
    time -= 2;
    //keep time at 0 if the time goes into negatives
    if(time < 0){
      time = 0;
    }

    //Display the new time
    timer.textContent = time

  }
// move to the next question
questionIndex++;

// check if we have ran out of questions
if(questionIndex === questions.length){
  // lets end the quiz
  endGame();
  
}else{
  // run the start questions function
  startQuestions();
}
}

function clock() {
  // update the clock
  time--;
  timer.textContent = time;
  // check if the clock has run out if clock hits 0 the game is over.
  if (time <= 0) {
    // alert("game over");
    endGame();
  }
}

function endGame(){
  // stop the clock
  clearInterval(timerId);

  // will display the end screen
  var endScreen = document.getElementById("end-screen");
  endScreen.removeAttribute("class");

  // show the final score on the page
  var finalScore = document.getElementById("final-score");
  finalScore.textContent = time

  // hide the question section
  questionEl.setAttribute("class", "hide")
}

// function to save initials and high score
function saveScore(){
  // get content of initals box
  var initialValue = initial.value.trim(); 
  // make sure the intials arent empty
  if(initialValue !== ""){
    // get the saved scores from local storage
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format the score and the initals as an object

    var object = {
      score: time,
      initials: initialValue
    }
    // set score in local storage
    highscores.push(object);
    window.localStorage.setItem("highscores",JSON.stringify(highscores))

    // lets redirect to index.html
    window.location.href = "index.html";
  }




}

// button click to start the game
startBtn.onclick = start;

// add button click to save the highscores
submitBtn.onclick = saveScore;
