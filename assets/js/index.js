let quizAreaEl = document.querySelector(".quiz-area");
let startButton = document.querySelector(".start-button");
let headerEl = document.querySelector("header");
let footerEl = document.querySelector("footer");
let questionData = [];
let highScoreData = [];
let index = 0;  // question number
let score = 0;
let timeLeft;
let timeBonus;

/* === calcScore ===
Calculates score % during quiz accounting for the number of questions seen.
=== calcScore ===*/
function calcScore() {
  let scoreString = Math.floor((score / index) * 100) + "%";
  return scoreString;
}

/* === calcFinalScore ===
Calculates score % using all questions count as denominator.
=== calcFinalScore ===*/
function calcFinalScore() {
  let scoreString = Math.floor((score / questionData.length) * 100) + "%";
  return scoreString;
}

/* === addHighScore ===
Adds latest score to the high score list and stores locally.
=== addHighScore ===*/
function addHighScore(event) {
  event.preventDefault();

  let userNameInput = document.querySelector("#user-name");
  // Get high scores from local storage
  getHighScores();
  // ensures that list is capped by removing lowest score
  if (highScoreData.length >= 20) {
    highScoreData.pop();
  }
  // sets existing scores as not new
  for (let i = 0; i < highScoreData.length; i++) {
    highScoreData[i].isNew = false;
  }
  // adds new score to the array
  highScoreData.push({
    name: userNameInput.value.trim(),
    score: score + timeBonus,
    scorePct: calcFinalScore(),
    isNew: true,
  });
  // sorts the high score array based on scores
  highScoreData.sort((p1, p2) =>
    p1.score < p2.score ? 1 : p1.score > p2.score ? -1 : 0
  );
  // updates high scores to local storage 
  localStorage.setItem("highScores", JSON.stringify(highScoreData));
  // populate high scores to HTML
  displayHighScores();
}

/* === countdown ===
Game timer.
=== countdown ===*/
function countdown() {
  let timerEl = document.querySelector(".timer");  

  let timeInterval = setInterval(function () {
    // display current time
    timerEl.textContent = "Time: " + timeLeft;
    // decrement timer until it hits zero
    if (timeLeft > 0) {
      timeLeft--;
    } else {
      // end timer and clear timer display
      clearInterval(timeInterval);
      timerEl.textContent = "";
      // handles enter high score info only if the user did not finish
      if (index < questionData.length) {
        displayEnterName();
      }
    }
  }, 1000);
}

/* === populateQuestions ===
Adds questions, possible answers, and correct answer number to array of questions.
=== populateQuestions ===*/
function populateQuestions() {
  // Question 0
  questionData[0] = {
    question:
      "If you want to compare 12 and '12' and return, which operator should you use?",
    options: [],
    answer: 1,
  };
  questionData[0].options[0] = "=";
  questionData[0].options[1] = "==";
  questionData[0].options[2] = "===";
  questionData[0].options[3] = "equals";

  // Question 1
  questionData[1] = {
    question:
      "'var foo;' is an example of what kind of variable?",
    options: [],
    answer: 2,
  };
  questionData[1].options[0] = "undeclared";
  questionData[1].options[1] = "null";
  questionData[1].options[2] = "undefined";
  questionData[1].options[3] = "constant";

  // Question 2
  questionData[2] = {
    question: "'fooBar' is an example of:",
    options: [],
    answer: 0,
  };
  questionData[2].options[0] = "camel case";
  questionData[2].options[1] = "snake case";
  questionData[2].options[2] = "kebab case";
  questionData[2].options[3] = "Pascal case";

  // Question 3
  questionData[3] = {
    question: "Local storage holds what variable types?",
    options: [],
    answer: 4,
  };
  questionData[3].options[0] = "numbers";
  questionData[3].options[1] = "booleans";
  questionData[3].options[2] = "objects";
  questionData[3].options[3] = "arrays";
  questionData[3].options[4] = "strings";
  questionData[3].options[5] = "all of the above";

  // Question 4
  questionData[4] = {
    question: "In web development, DOM is an acronym that stands for?",
    options: [],
    answer: 1,
  };
  questionData[4].options[0] = "Divided Ordered Modules";
  questionData[4].options[1] = "Document Object Model";
  questionData[4].options[2] = "Deranged Orangutan Mobs";
  questionData[4].options[3] = "Department of Management";

  // Question 5
  questionData[5] = {
    question: "When an event triggers on an element that has a listener attached, the event is handled by the parent and so on all the way up to the document.  This is known as: ",
    options: [],
    answer: 0,
  };
  questionData[5].options[0] = "bubbling";
  questionData[5].options[1] = "inheritance";
  questionData[5].options[2] = "propagation";
  questionData[5].options[3] = "hoisting";  

  // Question 6
  questionData[6] = {
    question: "In JavaScript, strings can be created using:",
    options: [],
    answer: 3,
  };
  questionData[6].options[0] = "single quotes ('')";
  questionData[6].options[1] = 'double quotes ("")';
  questionData[6].options[2] = "back ticks (``)";
  questionData[6].options[3] = "all of the above";  

  // Question 7
  questionData[7] = {
    question: "In GIT, what is the difference between 'fetch' and 'pull'",
    options: [],
    answer: 1,
  };
  questionData[7].options[0] = "they are essentially equivalent";
  questionData[7].options[1] = "fetch does not try to merge";
  questionData[7].options[2] = "fetch is not a valid GIT command";
  questionData[7].options[3] = "none of the above";    
}

function clearElement(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

/* === displayIntro ===
Displays quiz introduction.
=== displayIntro ===*/
function displayIntro() {
  let headerTag = document.createElement("h1");
  let itTag = document.createElement("div");
  let sbTag = document.createElement("button");

  clearElement(quizAreaEl);
  clearElement(footerEl);
  makeHeader();
  index = 0;
  score = 0;

  // text content for each element
  headerTag.textContent = "Coding Quiz Challenge";
  itTag.textContent =
    "Try to answer the following web development-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
  sbTag.textContent = "Start Quiz";

  //attributes for each element
  headerTag.setAttribute("class", "intro-header");
  itTag.setAttribute("class", "intro-text");
  sbTag.setAttribute("class", "start-button");

  // adds elements to HTML
  quizAreaEl.appendChild(headerTag);
  quizAreaEl.appendChild(itTag);
  quizAreaEl.appendChild(sbTag);

  // listener for start button
  sbTag.addEventListener("click", playQuiz);
}

/* === getHighScores ===
Pulls high score data from local storage.
=== getHighScores ===*/
function getHighScores() {
  let storedData = JSON.parse(localStorage.getItem("highScores"));

  // If stored data exists add to array otherwise clear array
  if (!!storedData) {
    highScoreData = storedData;
  } else {
    highScoreData = [];
  }
}

/* === displayHighScores ===
Creates and displays high score HTML.
=== displayHighScores ===*/
function displayHighScores() {
  let headerTag = document.createElement("h1"); //header tag
  let hslTag = document.createElement("ol");    //high score list tag
  let hslLineTag;                               //tag for high score entry
  let hsbTag = document.createElement("div");   //wrapper for high score buttons
  let gbbTag = document.createElement("button");//go back button
  let cbTag = document.createElement("button"); //clear button

  // get high scores from local storage
  getHighScores();
  // clear main quiz area and footer
  clearElement(quizAreaEl);
  clearElement(footerEl);

  // creates text content for each element
  headerTag.textContent = "High Scores";
  gbbTag.textContent = "Go back";
  cbTag.textContent = "Clear high scores";

  // creates attributes for each element
  hslTag.setAttribute("class", "high-score-list");
  hsbTag.setAttribute("class", "high-score-buttons");
  gbbTag.setAttribute("class", "go-back-button");
  cbTag.setAttribute("class", "clear-button");

  // adds elements to HTML
  quizAreaEl.appendChild(headerTag);
  quizAreaEl.appendChild(hslTag);
  quizAreaEl.appendChild(hsbTag);

  // adds lines of scores to the high score list
  for (let i = 0; i < highScoreData.length; i++) {
    hslLineTag = document.createElement("li");
    // adds attribute only to new score for distinct formatting
    if (highScoreData[i].isNew) {
      hslLineTag.setAttribute("class", "new-line");
    }
    // line text
    hslLineTag.textContent =
      highScoreData[i].name + " - " + highScoreData[i].score + " (" + highScoreData[i].scorePct + ")";
    // adds to HTML
    hslTag.appendChild(hslLineTag);
  }

  // adds "go back" and "clear" buttons 
  hsbTag.appendChild(gbbTag);
  hsbTag.appendChild(cbTag);

  // if game is still active "go back" returns to current question
  if (timeLeft > 0) {
    gbbTag.addEventListener("click", displayQuestion);
  // otherwise it goes to the game intro
  } else {
    gbbTag.addEventListener("click", displayIntro);
  }
  // listener for "clear" button
  cbTag.addEventListener("click", clearHighScores);
}

/* === clearHighScores ===
Clears the list of high scores and displays empty high score list.
=== clearHighScores ===*/
function clearHighScores() {
  localStorage.removeItem("highScores");
  displayHighScores();
}

/* === displayEnterName ===
Creates HTML for entering high score info.
=== displayEnterName ===*/
function displayEnterName() {
  let headerTag = document.createElement("h1");
  let scoreTag = document.createElement("div");
  let formTag = document.createElement("form");
  let labelTag = document.createElement("label");
  let textInputTag = document.createElement("input");
  let submitTag = document.createElement("button");
  let finalScore;

  clearElement(quizAreaEl);
  clearElement(headerEl);
  clearElement(footerEl);
  // add portion of time remaining as a score bonus
  timeBonus = Math.floor(timeLeft * 0.2);
  finalScore = score + timeBonus
  timeLeft = 0;

  // Add text to tags
  headerTag.textContent = "All done!";
  scoreTag.textContent =
    "Your final score is " + finalScore + " (" + calcFinalScore() + ").";
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

/* === evalAnswer ===
Evaluates the user's answer, displays next question and answer result.
=== evalAnswer ===*/
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
    // removes 10 seconds if the answer is wrong
    if (timeLeft > 10) {
      timeLeft-=10;
      timerEl.textContent = "Time: " + timeLeft;
    } else {
      timeLeft = 0;
    }
    resultTag.textContent = "Wrong!";
  }

  // Move onto the next question or if last question show score entry form
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

/* === displayQuestion ===
Creates HTML for the current question.
=== displayQuestion ===*/
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

/* === makeHeader ===
Creates HTML for the header including high score button and timer.
=== makeHeader ===*/
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

/* === makeFooter ===
Creates HTML for the footer including question counter and current score.
=== makeFooter ===*/
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

/* === playQuiz ===
Sets timer length, starts countdown, and displays first question.
=== playQuiz ===*/
function playQuiz() {
  // timer length
  timeLeft = 60;
  // start countdown
  countdown();
  // display first question
  displayQuestion(index);
  // create footer
  makeFooter();
}

/* === Main ===
Populates question array and shows the quiz intro.
=== Main ===*/
populateQuestions();
displayIntro();
