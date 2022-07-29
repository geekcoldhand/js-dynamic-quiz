var quizBox = document.querySelector(".quiz-box");
var viewScore = document.getElementById("highscore");
var time = document.getElementById("timer");
var title = document.querySelector(".title");
var questionBox = document.querySelector(".question-box");
var startBtn = document.getElementById("start");

let quiz = {
  time: 75,
  score: 0,
  length: 0,

  startTimer() {
    setInterval(this.startQuiz, 1000)
    // this.startQuiz
  },

  startQuiz() {
    questions = [
      "question1",
      "question2",
      "question3",
      "question4",
      "question5",
      "question6",
    ];

    answers = [
      "answer1",
      "answer2",
      "answer3",
      "answer4",
      "answer5",
      "answer6",
      "answer7",
      "answer8",
      "answer9",
    ];
    //clear question box of all elements
    quizBox.lastElementChild.remove();
    questionBox.lastElementChild.remove();

    //**TODO: create question title***
    console.log(questions[1], "before ");
    title.textContent = questions[0];
    console.log(2, "after ");

    //***TODO: create choice buttons and set the answer from array ***
    var choice1 = document.createElement("button");
    var choice2 = document.createElement("button");
    var choice3 = document.createElement("button");
    var choice4 = document.createElement("button");

    choice1.textContent = answers[3];
    choice2.textContent = answers[2];
    choice3.textContent = answers[1];
    choice4.textContent = answers[0];

    //add choice text to the buttons
    questionBox.appendChild(choice1);
    questionBox.appendChild(choice2);
    questionBox.appendChild(choice3);
    questionBox.appendChild(choice4);

    // button choices
    choice1.addEventListener("click", this.checkAnswer(choice1));
    choice2.addEventListener("click", this.checkAnswer(choice2));
    choice3.addEventListener("click", this.checkAnswer(choice3));
    choice4.addEventListener("click", this.checkAnswer(choice4));
  },
  checkAnswer(guess) {
    // create a "correct" and "wrong!" box to show on click
    var rightWrong = document.createElement("h3");

    // ** TODO: if the answer matches the guess then set text to correct
    // if  **TODO: the answer here is diff from guess subtract 10 from this.time
    if (guess.value === answers[0]) {
      rightWrong.textContent = "Correct!";
    } else {
      rightWrong.textContent = "Wrong!";
      this.time -= 10;
    }

    //check the time on the clock and if out of time call gameOver()
  },
  gameOver() {},
  logScore() {},
};

startBtn.addEventListener("click", quiz.startQuiz);
// TODO startBtn.addEventListener("click", quiz.startTimer);
