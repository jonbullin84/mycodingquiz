// timer
var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var secondsLeft = 75;

//buttons variable
const start = document.querySelector("#start");

// start variable
const intro = document.querySelector("#challenge-begins");

var question1 = document.querySelector(".all-question");

// locations
let question2 = document.querySelector("#question");
const correctWrong = document.querySelector("#right-wrong");
let questionCount = 0;


// final score
const final = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");

// highscore
const highScore1 = document.querySelector("#high-scores");
let scorelist1 = document.querySelector(".score-list");
let scoreList = [];


const ansBtn = document.querySelectorAll("button.answer-btn")

// submit variables
let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clearScores");
let viewScrBtn = document.querySelector("#view-scores");
let goBackBtn = document.querySelector("#goBack");


// answers variable
const ans1Btn = document.querySelector("#answer-1");
const ans2Btn = document.querySelector("#answer-2");
const ans3Btn = document.querySelector("#answer-3");
const ans4Btn = document.querySelector("#answer-4");



// questions 
const questions = [ 
    {
        question: "Commonly used data types DO Not include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"
    },
    {
        question: "The condition in an if / else statement is enclosed within _______.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "1"
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    }
];

// timer start function
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            question1.style.display = "none";
            final.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}

// quiz start function
function startQuiz() {
    intro.style.display = "none";
    question1.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// questions functions
function setQuestion(id) {
    if (id < questions.length) {
        question2.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

// event answers funtions
function checkAnswer(event) {
    event.preventDefault();

    //right or wrong element
    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

    // timer display element
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // if right
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } 
   
     // else if right/wrong
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    // else
    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    final.style.display = "none";
    highScore1.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // list for high score
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scorelist1.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scorelist1.append(li);
    }

    // internal storage 
    storeScores();
    displayScores();
}
// storage functions
function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// clearing the scoreboard
function clearScores() {
    localStorage.clear();
    scorelist1.innerHTML="";
}

// timer start after click
start.addEventListener("click", startQuiz);

// check answer
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// submit score button
submitScrBtn.addEventListener("click", addScore);

// go back button 
goBackBtn.addEventListener("click", function () {
    highScore1.style.display = "none";
    intro.style.display = "block";
    secondsLeft = 75;
    time.textContent = `Time:${secondsLeft}s`;
});

// clear scoreboard button
clearScrBtn.addEventListener("click", clearScores);

// button for high score
viewScrBtn.addEventListener("click", function () {
    if (highScore1.style.display === "none") {
        highScore1.style.display = "block";
    } 
    else if (highScore1.style.display === "block") {
        highScore1.style.display = "none";
    } 
    
    else {
        return alert("No High Score.");
    }
});