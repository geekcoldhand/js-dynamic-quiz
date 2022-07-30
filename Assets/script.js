var quizBox = document.querySelector(".quiz-box");
var viewScore = document.getElementById("highscore");
var time = document.getElementById("timer");
var title = document.querySelector(".title");
var questionBox = document.querySelector(".question-box");
var startBtn = document.getElementById("start");

//create choice buttons
var choice1 = document.createElement("button");
var choice2 = document.createElement("button");
var choice3 = document.createElement("button");
var choice4 = document.createElement("button");

var timeStart = 75;
function startClock() {
  //start the timer
  setInterval(timer(), 1000);
}

function timer() {
  this.timeStart--;
  time.textContent = "Time: " + timeStart;
}

let quiz = {
  score: 0,
  length: 0,
  questions: [
    "question1?an",
    "question2?ans",
    "question3?answ",
    "question4?answe",
    "question5?answer",
    "question6?answerr",
  ],
  currQuestion: "",
  corrAnswer: "",
  currPair: "",

  startQuestion() {
    startClock();
    //clear question box of all elements
    quizBox.lastElementChild.remove();
    questionBox.lastElementChild.remove();

    // create a random index out of 4 for the correct answer
    let four = quiz.fourQuestion();
    let randIndex = Math.floor(Math.random() * 4);

    quiz.currPair = four[randIndex].split("?");

    quiz.currQuestion = quiz.currPair[0];
    quiz.corrAnswer = quiz.currPair[1];
    console.log("answer in start", quiz.corrAnswer);

    title.textContent = quiz.currQuestion;
    //populate choices  ***
    choice1.textContent = four[0].split("?")[1];
    choice2.textContent = four[1].split("?")[1];
    choice3.textContent = four[2].split("?")[1];
    choice4.textContent = four[3].split("?")[1];

    //add children to the box
    questionBox.appendChild(choice1);
    questionBox.appendChild(choice2);
    questionBox.appendChild(choice3);
    questionBox.appendChild(choice4);
  },

  checkAnswer(event) {
    // create a "correct" and "wrong!" box to show on click
    let rightWrong = document.createElement("h3");
    console.log("event", event.target.textContent);
    console.log("answer in check", quiz.corrAnswer);

    // ** TODO: if the answer matches the guess then set text to correct
    // if  **TODO: the answer here is diff from guess subtract 10 from this.time
    if (event.target.textContent === quiz.corrAnswer) {
      rightWrong.textContent = "Correct!";
    } else {
      rightWrong.textContent = "Wrong!";
      this.time -= 10;
    }

    questionBox.appendChild(rightWrong);

    quiz.startQuestion();
    // check the time on the clock and if out of time call gameOver()
  },

  shuffleQuestion(choices) {
    let currIndex = choices.length;
    let randIndex = 0;

    while (currIndex) {
      randIndex = Math.floor(Math.random() * currIndex);
      currIndex--;

      //swapping the value assigned to both index positions
      [choices[currIndex], choices[randIndex]] = [
        choices[randIndex],
        choices[currIndex],
      ];
    }
    return choices;
  },
  fourQuestion() {
    let four = [];

    //populate four random values in our array from questions property
    for (var i = 0; i < 4; i++) {
      four[i] = this.questions[i];
    }
    quiz.questions.splice(0, 3);
    console.log("four", four);

    //shuffle questions and return
    return quiz.shuffleQuestion(four);
  },
  gameOver() {},
  logScore() {},
};

startBtn.addEventListener("click", quiz.startQuestion);

// button choices
choice1.addEventListener("click", quiz.checkAnswer);
choice2.addEventListener("click", quiz.checkAnswer);
choice3.addEventListener("click", quiz.checkAnswer);
choice4.addEventListener("click", quiz.checkAnswer);
