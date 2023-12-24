var questionData = [];
var quizAreaEl = document.querySelector(".quiz-area");
var optionButtons = [];
var startButton = document.querySelector(".start-button");
var index = 0;

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
}


function evalAnswer(event) {
    let element = event.target;
    let userIndex = element.getAttribute("data-index");
    let realIndex = questionData[index].answer;
    let resultTag = document.createElement("div");

    index++
    if (index < questionData.length) {
        displayQuestion(index);
    }

    if (userIndex == realIndex) {
        resultTag.textContent = "Correct!";
    } else {
        resultTag.textContent = "Wrong!";
    }
    resultTag.setAttribute("class", "answer-result");
    quizAreaEl.appendChild(resultTag);         
}


function displayQuestion() {
  let oTag;
  let qTag = document.createElement("div");

  //remove all elements from the quiz area
  while (quizAreaEl.hasChildNodes()) {
    quizAreaEl.removeChild(quizAreaEl.firstChild);
  }

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


function playQuiz() {
  displayQuestion(index);
}


populateQuestions();
optionButtons = document.querySelectorAll(".option-button");
startButton.addEventListener("click", function () {
  playQuiz();
});
