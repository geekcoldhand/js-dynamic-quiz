var quizBox = document.querySelector(".quiz-box");
var viewScore = document.getElementById("highscore");
var time = document.getElementById("timer");
var title = document.querySelector(".title");
var questionBox = document.querySelector(".question-box");
var startBtn = document.getElementById("start");
var messageEl = document.querySelector(".message");

//create choice buttons to use later
var choice1 = document.createElement("button");
var choice2 = document.createElement("button");
var choice3 = document.createElement("button");
var choice4 = document.createElement("button");

var enterInit;

var messageEl = document.createElement("div");
//public timer variable
var timerInterval = null;
var timeStart = 75;

function startClock() {
  //start the timer
  timerInterval = setInterval(function () {
    checkClock();
  }, 1000);
}

function checkClock() {
  if (timeStart > 0) {
    // call function to set game over
    console.log("check startClock function");
    timeStart--;
    time.textContent = "Time: " + timeStart;
  } else {
    quiz.gameOver();
  }
}

let quiz = {
  score: 0,
  length: 0,
  isGameOver: false,
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

  startQuestion() {
    if (timeStart < 0) {
      quiz.gameOver();
      return;
    }

    startClock(quiz.isGameOver);

    //clear question box of all elements
    quizBox.lastElementChild.remove();
    questionBox.lastElementChild.remove();

    // create a random index out of 4 for the correct answer
    let four = quiz.fourQuestion();
    let randIndex = Math.floor(Math.random() * 4);

    let currPair = four[randIndex].split("?");
    quiz.currQuestion = currPair[0];
    quiz.corrAnswer = currPair[1];

    title.textContent = quiz.currQuestion;
    //populate choices  ***
    choice1.textContent = "1. " + four[0].split("?")[1];
    choice2.textContent = "2. " + four[1].split("?")[1];
    choice3.textContent = "3. " + four[2].split("?")[1];
    choice4.textContent = "4. " + four[3].split("?")[1];

    choice1.classList.add("questions");
    choice2.classList.add("questions");
    choice3.classList.add("questions");
    choice4.classList.add("questions");

    //add children to the box
    questionBox.appendChild(choice1);
    questionBox.appendChild(choice2);
    questionBox.appendChild(choice3);
    questionBox.appendChild(choice4);
  },

  //this accepts the event as the paramater to access which button was calling the function
  checkAnswer(event) {
    if (timeStart < 0) {
      console.log("here in checkAnswer");
      quiz.gameOver();
      return;
    }
    // create a "correct" and "wrong!" box to show on click
    let rightWrong = document.createElement("h3");

    //  if the answer matches the guess then set text to correct
    // if the answer here is diff from guess subtract 10 from this.time

    if (event.target.textContent.split(".")[1].trim() === quiz.corrAnswer) {
      quiz.score += 20;
      rightWrong.textContent = "Correct!";
      setTimeout(function () {
        quiz.startQuestion();
      }, 2000);
    } else {
      rightWrong.textContent = "Wrong!";
      setTimeout(function () {
        rightWrong.remove();
      }, 2000);
      timeStart -= 10;
      quiz.score -= 10;
    }
    viewScore.textContent = "View Highscores " + quiz.score;
    //render the right or wrong

    rightWrong.classList.add("message");
    messageEl.appendChild(rightWrong);
    quizBox.appendChild(messageEl);
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
    //shuffle questions and return
    return quiz.shuffleQuestion(four);
  },
  gameOver() {
    console.log("here in game over");
    //clearInterval(timerInterval);
    //stop the timer by updating quiz.isGameOver
    quiz.isGameOver = true;
    //startClock(quiz.isGameOver);
    title.textContent = "All done!";
    //update the score and change the text on the screen
    console.log("score is ", quiz.score);
    quiz.score += timeStart;
    viewScore.textContent = "View Hisgscore " + quiz.score;
    //call the logScore() method
  },
  logScore() {
    //clear the screen and add the initial box
    // set the initial variable to log in local storage
    // create a element to render the score element
    console.log("log score here");
  },
};

startBtn.addEventListener("click", quiz.startQuestion);

// button choices
choice1.addEventListener("click", quiz.checkAnswer);
choice2.addEventListener("click", quiz.checkAnswer);
choice3.addEventListener("click", quiz.checkAnswer);
choice4.addEventListener("click", quiz.checkAnswer);
