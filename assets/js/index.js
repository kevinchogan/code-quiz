var quizAreaEl = document.querySelector(".quiz-area");
var startButton = document.querySelector(".start-button");
var headerEl = document.querySelector("header");
var footerEl = document.querySelector("footer");
var questionData = [];
var optionButtons = [];
var highScoreData = [];
var index = 0;
var score = 0;
let timeLeft;

function calcScore() {
  let scoreString = Math.floor((score / index) * 100) + "%";
  return scoreString;
}

function calcFinalScore() {
  let scoreString = Math.floor((score / questionData.length) * 100) + "%";
  return scoreString;
}

function addHighScore() {
  var userNameInput = document.querySelector("#user-name");

  getHighScores();

  if (highScoreData.length >= 20) {
    highScoreData.pop();
  }

  for (let i = 0; i < highScoreData.length; i++) {
    highScoreData[i].isNew = false;
  }

  highScoreData.push({
    name: userNameInput.value.trim(),
    score: score,
    scorePct: calcFinalScore(),
    isNew: true,
  });

  highScoreData.sort((p1, p2) =>
    p1.score < p2.score ? 1 : p1.score > p2.score ? -1 : 0
  );
  localStorage.setItem("highScores", JSON.stringify(highScoreData));
  displayHighScores();
}

function countdown() {
  let timerEl = document.querySelector(".timer");  

  var timeInterval = setInterval(function () {
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft > 0) {
      timeLeft--;
    } else {
      clearInterval(timeInterval);
      timerEl.textContent = "";
      if (index < questionData.length) {
        displayEnterName();
      }
    }
  }, 1000);
}

function populateQuestions() {
  // Question 0
  questionData[0] = {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [],
    answer: 3,
  };
  questionData[0].options[0] = "JavaScript";
  questionData[0].options[1] = "terminal/bash";
  questionData[0].options[2] = "for loops";
  questionData[0].options[3] = "console.log";

  // Question 1
  questionData[1] = {
    question:
      "The condition of an if/else statement is enclosed with ___________.",
    options: [],
    answer: 2,
  };
  questionData[1].options[0] = "quotes";
  questionData[1].options[1] = "curly brackets";
  questionData[1].options[2] = "parentheses";
  questionData[1].options[3] = "square brackets";

  // Question 2
  questionData[2] = {
    question: "Arrays in JavaScript can be used to store:",
    options: [],
    answer: 3,
  };
  questionData[2].options[0] = "numbers and strings";
  questionData[2].options[1] = "other arrays";
  questionData[2].options[2] = "booleans";
  questionData[2].options[3] = "all of the above";

  // Question 3
  questionData[3] = {
    question: "Semicolons (;) are required at the end of every statement.",
    options: [],
    answer: 1,
  };
  questionData[3].options[0] = "true";
  questionData[3].options[1] = "false";
}

function clearElement(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

function displayIntro() {
  let headerTag = document.createElement("h1");
  let itTag = document.createElement("div");
  let sbTag = document.createElement("button");

  clearElement(quizAreaEl);
  clearElement(footerEl);
  makeHeader();
  index = 0;
  score = 0;

  headerTag.textContent = "Coding Quiz Challenge";
  itTag.textContent =
    "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
  sbTag.textContent = "Start Quiz";

  headerTag.setAttribute("class", "intro-header");
  itTag.setAttribute("class", "intro-text");
  sbTag.setAttribute("class", "start-button");

  quizAreaEl.appendChild(headerTag);
  quizAreaEl.appendChild(itTag);
  quizAreaEl.appendChild(sbTag);

  sbTag.addEventListener("click", playQuiz);
}

function getHighScores() {
  let storedData = JSON.parse(localStorage.getItem("highScores"));

  if (!!storedData) {
    highScoreData = storedData;
  } else {
    highScoreData = [];
  }
}

function displayHighScores() {
  let headerTag = document.createElement("h1");
  let hslTag = document.createElement("ol");
  let hslLineTag;
  let hsbTag = document.createElement("div");
  let gbbTag = document.createElement("button");
  let cbTag = document.createElement("button");

  getHighScores();
  clearElement(quizAreaEl);
  clearElement(footerEl);

  headerTag.textContent = "High Scores";
  gbbTag.textContent = "Go back";
  cbTag.textContent = "Clear high scores";

  hslTag.setAttribute("class", "high-score-list");
  hsbTag.setAttribute("class", "high-score-buttons");
  gbbTag.setAttribute("class", "go-back-button");
  cbTag.setAttribute("class", "clear-button");

  quizAreaEl.appendChild(headerTag);
  quizAreaEl.appendChild(hslTag);
  quizAreaEl.appendChild(hsbTag);

  for (let i = 0; i < highScoreData.length; i++) {
    hslLineTag = document.createElement("li");
    if (highScoreData[i].isNew) {
      hslLineTag.setAttribute("class", "new-line");
    }
    hslLineTag.textContent =
      highScoreData[i].name + " - " + highScoreData[i].score + " (" + highScoreData[i].scorePct + ")";
    hslTag.appendChild(hslLineTag);
  }

  hsbTag.appendChild(gbbTag);
  hsbTag.appendChild(cbTag);

  if (timeLeft > 0) {
    gbbTag.addEventListener("click", displayQuestion);
  } else {
    gbbTag.addEventListener("click", displayIntro);
  }

  cbTag.addEventListener("click", clearHighScores);
}

function clearHighScores() {
  localStorage.removeItem("highScores");

  displayHighScores();
}

function displayEnterName() {
  let headerTag = document.createElement("h1");
  let scoreTag = document.createElement("div");
  let formTag = document.createElement("form");
  let labelTag = document.createElement("label");
  let textInputTag = document.createElement("input");
  let submitTag = document.createElement("button");

  clearElement(quizAreaEl);
  clearElement(headerEl);
  clearElement(footerEl);
  timeLeft = 0;

  // Add text to tags
  headerTag.textContent = "All done!";
  scoreTag.textContent =
    "Your final score is " + score + " (" + calcFinalScore() + ").";
  labelTag.textContent = "Enter name: ";
  submitTag.textContent = "Submit";

  // Set up attributes for tags
  headerTag.setAttribute("class", "game-over-header");
  scoreTag.setAttribute("class", "game-over-text");
  formTag.setAttribute("class", "enter-name");
  labelTag.setAttribute("for", "user-name");
  textInputTag.setAttribute("type", "game-over-header");
  textInputTag.setAttribute("id", "user-name");
  submitTag.setAttribute("id", "submit-button");

  // Add major tags to HTML
  quizAreaEl.appendChild(headerTag);
  quizAreaEl.appendChild(scoreTag);
  quizAreaEl.appendChild(formTag);

  // Add form sub-tags
  formTag.appendChild(labelTag);
  formTag.appendChild(textInputTag);
  formTag.appendChild(submitTag);

  submitTag.addEventListener("click", addHighScore);
}

function evalAnswer(event) {
  let element = event.target;
  let userIndex = element.getAttribute("data-index");
  let realIndex = questionData[index].answer;
  let resultTag = document.createElement("div");
  let timerEl = document.querySelector(".timer"); 

  // Evaluate if question is correct or not
  if (userIndex == realIndex) {
    resultTag.textContent = "Correct!";
    score++;
  } else {
    if (timeLeft > 10) {
      timeLeft-=10;
      timerEl.textContent = "Time: " + timeLeft;
    } else {
      timeLeft = 0;
    }
    resultTag.textContent = "Wrong!";
  }

  // Move onto the next question or show score entry form
  index++;
  if (index < questionData.length) {
    displayQuestion(index);
  } else {
    displayEnterName();
  }

  // Show results of last answer
  resultTag.setAttribute("class", "answer-result");
  quizAreaEl.appendChild(resultTag);
}

function displayQuestion() {
  let oTag;
  let qTag = document.createElement("div");

  clearElement(quizAreaEl);
  makeFooter();

  // Add the question
  qTag.textContent = questionData[index].question;
  qTag.setAttribute("class", "question");
  quizAreaEl.appendChild(qTag);

  // Add all the potential answers
  for (let i = 0; i < questionData[index].options.length; i++) {
    oTag = document.createElement("button");
    oTag.textContent = i + 1 + ". " + questionData[index].options[i];
    oTag.setAttribute("class", "option-button");
    oTag.setAttribute("data-index", i);
    quizAreaEl.appendChild(oTag);
    oTag.addEventListener("click", evalAnswer);
  }
}

function makeHeader() {
  let hsbTag = document.createElement("button");
  let timerTag = document.createElement("div");

  clearElement(headerEl);

  hsbTag.textContent = "View high scores";

  hsbTag.setAttribute("class", "high-score-button");
  timerTag.setAttribute("class", "timer");

  headerEl.appendChild(hsbTag);
  headerEl.appendChild(timerTag);

  hsbTag.addEventListener("click", displayHighScores);
}

function makeFooter() {
  let qTag = document.createElement("div");
  let sTag = document.createElement("div");
  let curQuestion = index + 1;

  clearElement(footerEl);

  // Set up text for question counter
  qTag.textContent = "Question " + curQuestion + " of " + questionData.length;
  if (index > 0) {
    sTag.textContent = "Current Score: " + calcScore();
  }

  // Set attributes for each tag
  qTag.setAttribute("id", "question-number");
  sTag.setAttribute("id", "current-score");

  // Add tags to footer
  footerEl.appendChild(qTag);
  footerEl.appendChild(sTag);
}

function playQuiz() {
  timeLeft = 60;
  countdown();
  displayQuestion(index);
  makeFooter();
}

populateQuestions();
displayIntro();
