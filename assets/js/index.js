var questionData = [];

function populateQuestions() {
    questionData[0] = {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [],
        answer: 3
    }
    questionData[0].options[0] = "JavaScript";
    questionData[0].options[1] = "terminal/bash";
    questionData[0].options[2] = "for loops";
    questionData[0].options[3] = "console.log";

    questionData[1] = {
        question: "The condition of an if/else statement is enclosed with ___________.",
        options: [],
        answer: 2
    }
    questionData[1].options[0] = "quotes";
    questionData[1].options[1] = "curly brackets";
    questionData[1].options[2] = "parentheses";
    questionData[1].options[3] = "square brackets";

    questionData[2] = {
        question: "Arrays in JavaScript can be used to store:",
        options: [],
        answer: 3
    }
    questionData[2].options[0] = "numbers and strings";
    questionData[2].options[1] = "other arrays";
    questionData[2].options[2] = "booleans";
    questionData[2].options[3] = "all of the above";
}

populateQuestions();
console.log(questionData);