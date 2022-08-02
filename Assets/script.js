var quizBox = document.querySelector(".quiz-box");
var viewScore = document.getElementById("highscore");
var time = document.getElementById("timer");
var title = document.querySelector(".title");
var questionBox = document.querySelector(".question-box");
var startBtn = document.getElementById("start");
var messageEl = document.querySelector(".message");
var instructEl = document.getElementById("instructions");
//create dynamic elements to use later
var choice1 = document.createElement("button");
var choice2 = document.createElement("button");
var choice3 = document.createElement("button");
var choice4 = document.createElement("button");
var scoreInput = document.createElement("input");
var messageEl = document.createElement("div");
var logNameBtn = document.createElement("button");
var clearBtn = document.createElement("button");
var scoreBox = document.createElement("div");
var rightWrong = document.createElement("h3");
var finalScore = document.createElement("div");

//public timer and question count variables
var timerInterval = null;
var timeStart = 75;
//the clock is started and calls a check the time function checkClock()
function startClock() {
  //start the timer
  timerInterval = setInterval(function () {
    checkClock();
  }, 1000);
}
function stopClock() {
  clearInterval(timerInterval);
}
function checkClock() {
  if (timeStart > 0) {
    //call function to set game over
    timeStart--;
    time.textContent = "Time: " + timeStart;
  } else {
    stopClock();
    quiz.gameOver();
  }
}
//create a quiz object
let quiz = {
  score: 0,
  questions: [
    "Commonly used data types DO NOT include:?alerts",
    "Arrays in Javascript can be used to store ______.?Numbers&Arrays",
    "String values must be enclosed within ______ when being assigned to variables.?quotes",
    "The condition in an 'if/else' statement is enclosed within ______.?(parentheses)",
    "How can you write the logic for if/else statments?{curly braces}",
    "What does this code execute: Class Classname{ constructor(){} };?creating a class",
    "What does this code execute: let quiz = {};?creating an object",
    "Class Classname extends OtherClass {};?creating a heritage class",
  ],
  currQuestion: "",
  corrAnswer: "",
  startQuestion() {
    instructEl.remove();
    startBtn.remove();
    //create a random index out of 4 for the correct answer
    let four = quiz.fourQuestion();
    let randIndex = Math.floor(Math.random() * 4);
    let currPair = four[randIndex].split("?");
    //assign the question [0] to the title and update answer [1] to quiz answer property
    quiz.currQuestion = currPair[0];
    quiz.corrAnswer = currPair[1];
    //render the title and the answers with the new questions
    title.textContent = quiz.currQuestion;
    choice1.textContent = "1. " + four[0].split("?")[1];
    choice2.textContent = "2. " + four[1].split("?")[1];
    choice3.textContent = "3. " + four[2].split("?")[1];
    choice4.textContent = "4. " + four[3].split("?")[1];
    //assigning class .question to the choice buttons
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
  //when the choice buttons are clicked it will call this checkAnswer()
  //this accepts the event as the paramater to access which button was calling the function
  checkAnswer(event) {
    console.log("time", timeStart);
    if (timeStart < 0) {
      quiz.gameOver();
      return;
    }
    //create a "correct" and "wrong!" box to show on click
    // if the answer here is diff from guess subtract 10 from this.time
    if (event.target.textContent.split(".")[1].trim() === quiz.corrAnswer) {
      quiz.score += 15;
      rightWrong.textContent = "Correct!";
      setTimeout(function () {
        messageEl.style.visibility = "hidden";
        quiz.startQuestion();
      }, 2000);
    } else {
      rightWrong.textContent = "Wrong!";
      setTimeout(function () {
        messageEl.style.visibility = "hidden";
        quiz.startQuestion();
      }, 1000);
      timeStart -= 10;
      quiz.score -= 10;
    }
    viewScore.textContent = "View Highscores " + quiz.score;
    //render the right or wrong
    rightWrong.classList.add("message");
    messageEl.style.visibility = "visible";
    messageEl.appendChild(rightWrong);
    quizBox.appendChild(messageEl);
  },
  //helper method used by the fourQuestions() method before returning
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
    quiz.question = quiz.shuffleQuestion(quiz.questions); //shuffle questions and return
    return quiz.shuffleQuestion(four);
  },
  gameOver() {
    title.textContent = "All done!";
    //update the score and change the text on the screen
    quiz.score += timeStart;
    viewScore.textContent = "View Hisgscore " + quiz.score;
    //call the logScore() method'
    title.textContent = "Highscore";
    title.classList.remove("title");

    quiz.logScore();
  },
  logScore() {
    questionBox.remove();
    title.classList.add("score-title");
    scoreInput.setAttribute("type", "text");
    //clear the screen and add the initial box
    finalScore.textContent = quiz.score;
    finalScore.classList.add("jumbo-text");
    logNameBtn.textContent = "Log Initials";
    clearBtn.textContent = "Clear";
    clearBtn.classList.add("score-button");
    logNameBtn.classList.add("score-button");
    scoreBox.appendChild(scoreInput);
    scoreBox.appendChild(logNameBtn);
    scoreBox.appendChild(clearBtn);
    scoreBox.classList.add("score-box");
    quizBox.appendChild(finalScore);
    quizBox.appendChild(scoreBox);
    //render the recent users from local storage in messEl
  },

  saveLocal() {
    //quiz.score to be saved under highscore local storage key
  },
  clearLocal() {
    //remove the local highscores
  },
};

startBtn.addEventListener("click", quiz.startQuestion);
startBtn.addEventListener("click", startClock);
//button choices to use later
choice1.addEventListener("click", quiz.checkAnswer);
choice2.addEventListener("click", quiz.checkAnswer);
choice3.addEventListener("click", quiz.checkAnswer);
choice4.addEventListener("click", quiz.checkAnswer);
//log buttons
logNameBtn.addEventListener("click", quiz.saveLocal);
clearBtn.addEventListener("click", quiz.clearLocal);
