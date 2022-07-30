var quizBox = document.querySelector(".quiz-box");
var viewScore = document.getElementById("highscore");
var time = document.getElementById("timer");
var title = document.querySelector(".title");
var questionBox = document.querySelector(".question-box");
var startBtn = document.getElementById("start");

//create choice buttons to use later
var choice1 = document.createElement("button");
var choice2 = document.createElement("button");
var choice3 = document.createElement("button");
var choice4 = document.createElement("button");

var timeStart = 75;
function startClock() {
  //start the timer
  if (!quiz.isGameOver) {
    var timerInterval = setInterval(function () {
      timeStart--;
      time.textContent = "Time: " + timeStart;

      if (timeStart == 0) {
        // Stops the game at the said var name
        clearInterval(timerInterval);
        // call function to set game over
        quiz.gameOver();
      }
    }, 1000);
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
  currPair: "",

  startQuestion() {
    if (this.isGameOver === true) {
      quiz.gameOver();
      return;
    }

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
    // create a "correct" and "wrong!" box to show on click
    let rightWrong = document.createElement("h3");

    // ** TODO: if the answer matches the guess then set text to correct
    // if  **TODO: the answer here is diff from guess subtract 10 from this.time
    console.log(
      "is" +
        event.target.textContent.split(".")[1].trim() +
        "=" +
        quiz.corrAnswer
    );
    if (
      (event.target.textContent.split(".")[1].trim() === quiz.corrAnswer) &
      (timeStart != 0)
    ) {
      quiz.score += 10;
      rightWrong.textContent = "Correct!";
      setTimeout(function () {
        quiz.startQuestion();
      }, 5000);
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
    rightWrong.classList.add("answer");
    quizBox.appendChild(rightWrong);
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
    //shuffle questions and return
    return quiz.shuffleQuestion(four);
  },
  gameOver() {
    title.textContent = "Game Over";
    quiz.isGameOver = true;
    quiz.score += quiz.timeStart;
    viewScore.textContent = quiz.score;
  },
  logScore() {},
};

startBtn.addEventListener("click", quiz.startQuestion);

// button choices
choice1.addEventListener("click", quiz.checkAnswer);
choice2.addEventListener("click", quiz.checkAnswer);
choice3.addEventListener("click", quiz.checkAnswer);
choice4.addEventListener("click", quiz.checkAnswer);
