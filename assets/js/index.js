var questionData = [];
var quizAreaEl = document.querySelector(".quiz-area");
var optionButtons = [];
var startButton = document.querySelector(".start-button");
var footerEl = document.querySelector("footer");
var index = 0;
var score = 0;

function populateQuestions() {
  questionData[0] = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [],
    answer: 3,
  };
  questionData[0].options[0] = "JavaScript";
  questionData[0].options[1] = "terminal/bash";
  questionData[0].options[2] = "for loops";
  questionData[0].options[3] = "console.log";

  questionData[1] = {
    question: "The condition of an if/else statement is enclosed with ___________.",
    options: [],
    answer: 2,
  };
  questionData[1].options[0] = "quotes";
  questionData[1].options[1] = "curly brackets";
  questionData[1].options[2] = "parentheses";
  questionData[1].options[3] = "square brackets";

  questionData[2] = {
    question: "Arrays in JavaScript can be used to store:",
    options: [],
    answer: 3,
  };
  questionData[2].options[0] = "numbers and strings";
  questionData[2].options[1] = "other arrays";
  questionData[2].options[2] = "booleans";
  questionData[2].options[3] = "all of the above";

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


function calcScore() {
    let scoreString = Math.floor((score / index) * 100) + "%";
    return(scoreString);
}


function displayEnterName() {
    let headerTag = document.createElement("h1");
    let scoreTag = document.createElement("div");
    let formTag = document.createElement("form");
    let labelTag = document.createElement("label");
    let textInputTag = document.createElement("input");
    let submitTag = document.createElement("input");

    clearElement(quizAreaEl);

    headerTag.textContent = "All done!";
    scoreTag.textContent = "Your final score is " + score + " (" + calcScore() + ").";
    labelTag.textContent = "Enter name: ";

    headerTag.setAttribute("class", "game-over-header");
    scoreTag.setAttribute("class", "game-over-text");
    formTag.setAttribute("class", "enter-name");
    labelTag.setAttribute("for", "userName");
    textInputTag.setAttribute("type", "game-over-header");
    textInputTag.setAttribute("id", "user-name");
    submitTag.setAttribute("type", "submit");
    submitTag.setAttribute("value", "Submit");


    quizAreaEl.appendChild(headerTag);
    quizAreaEl.appendChild(scoreTag);
    quizAreaEl.appendChild(formTag);

    let formEl = document.querySelector(".enter-name");
    formEl.appendChild(labelTag);
    formEl.appendChild(textInputTag);
    formEl.appendChild(submitTag);  
}


function updateFooter() {
    let qNumEl = document.querySelector("#question-number");
    let scoreEl = document.querySelector("#current-score");
    let qNum;

    qNum = index;
    if (index < questionData.length) {
        qNum++
    }
    qNumEl.textContent = "Question " + qNum + " of " + questionData.length;
    scoreEl.textContent = "Current Score: " + calcScore();
}


function evalAnswer(event) {
    let element = event.target;
    let userIndex = element.getAttribute("data-index");
    let realIndex = questionData[index].answer;
    let resultTag = document.createElement("div");

    if (userIndex == realIndex) {
        resultTag.textContent = "Correct!";
        score++
    } else {
        resultTag.textContent = "Wrong!";
    }

    index++
    if (index < questionData.length) {
        displayQuestion(index);
    } else {
        displayEnterName();
    }

    resultTag.setAttribute("class", "answer-result");
    quizAreaEl.appendChild(resultTag);
    updateFooter();
}


function displayQuestion() {
  let oTag;
  let qTag = document.createElement("div");

  clearElement(quizAreaEl);

  //add the question
  qTag.textContent = questionData[index].question;
  qTag.setAttribute("class", "question");
  quizAreaEl.appendChild(qTag);

  //add all the potential answers
  for (let i = 0; i < questionData[index].options.length; i++) {
    oTag = document.createElement("button");
    oTag.textContent = i + 1 + ". " + questionData[index].options[i];
    oTag.setAttribute("class", "option-button");
    oTag.setAttribute("data-index", i);
    quizAreaEl.appendChild(oTag);

  }
  optionButtons = document.querySelectorAll(".option-button");

  for (let i = 0; i < questionData[index].options.length; i++) {
    optionButtons[i].addEventListener("click", evalAnswer);
  }
}


function makeFooter() {
    let qTag = document.createElement("div");
    let sTag = document.createElement("div");

    qTag.textContent = "Question 1 of " + questionData.length;
    qTag.setAttribute("id", "question-number");
    sTag.textContent = "";
    sTag.setAttribute("id", "current-score");

    footerEl.appendChild(qTag);
    footerEl.appendChild(sTag);
}


function playQuiz() {
  displayQuestion(index);
  makeFooter();
}


populateQuestions();
optionButtons = document.querySelectorAll(".option-button");
startButton.addEventListener("click", function () {
  playQuiz();
});
