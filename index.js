let qNum = 0;
let score = 0;

function generateQuestion () {
  if (qNum < STORE.length) {
    return `<div class="question-${qNum}">
    <form>
    <fieldset>
    <legend>
      <h2>${STORE[qNum].question}</h2>
    </legend>
    <label class="answerOption">
    <input type="radio" value="${STORE[qNum].answers[0]}" name="answer" required>
    <span>${STORE[qNum].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[qNum].answers[1]}" name="answer" required>
    <span>${STORE[qNum].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[qNum].answers[2]}" name="answer" required>
    <span>${STORE[qNum].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[qNum].answers[3]}" name="answer" required>
    <span>${STORE[qNum].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.qNum').html(10)
  }
}

//increment question number
function changeqNum () {
  qNum++;
  $('.qNum').text(qNum+1);
}

//increment score
function changeScore () {
  score++;
}

//start quiz
//on startButton click hide start div
//unhide quiz form div
function startQuiz () {
  $('.quiz-start').on('click', '.startButton', function (event) {
    $('.quiz-start').remove();
    $('.js-quiz-form').css('display', 'block');
    $('.qNum').text(1);
    $('.col-1').removeClass('hide');
});
}

// render question in DOM
function renderQuizQuestion () {
  $('.js-quiz-form').html(generateQuestion());
}


function ifCorrectAnswer () {
  correctAnswerFeedback();
  updateScore();
}

function ifWrongAnswer () {
  wrongAnswerFeedback();
}

//user feedback for correct answer
function correctAnswerFeedback () {
  let correctAnswer = `${STORE[qNum].correctAnswer}`;
  $('.js-quiz-form').html(`<div class="correct-feedback"><p><b>You got it right!</b></p><button type=button class="next-button">Next</button></div>`);
}

//user feedback for wrong answer
function wrongAnswerFeedback () {
  let correctAnswer = `${STORE[qNum].correctAnswer}`;
  $('.js-quiz-form').html(`<div class="correct-feedback"><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="next-button">Next</button></div>`);
}

//user selects answer on submit run user feedback
function handleQuizFeedback() {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[qNum].correctAnswer}`;
    if (answer === correctAnswer) {
      ifCorrectAnswer();
    } else {
      ifWrongAnswer();
    }
  });
}


//update score text
function updateScore () {
  changeScore();
  $('.score').text(score);
}


function renderResults() {
  if (score >= 8) {
    $('.js-quiz-form').html(`<div class="results correct-feedback"><p>You got ${score} / 10</p><p>Great job! But don\'t get proud. God will exalt you at the right time.</p><button class="restart-button">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.js-quiz-form').html(`<div class="results correct-feedback"><p>You got ${score} / 10</p><p>Good job, you\'re at least upperclassman level.</p><button class="restart-button">Restart Quiz</button></div>`);
  } else {
    $('.js-quiz-form').html(`<div class="results correct-feedback"><p>You got ${score} / 10</p><p>Do you even focus during DT\'s?</p><button class="restart-button">Restart Quiz</button></div>`);
  }
}

//what happens when the user clicks next
function renderNextQuestion() {
  $('main').on('click', '.next-button', function (event) {
    changeqNum();
    renderQuizQuestion();
    handleQuizFeedback();
  });
}


function restartQuiz () {
  $('main').on('click', '.restart-button', function (event) {
    qNum=0; // resets qNum
    score=0; // resets score
    $('.qNum').html('1');
    $('.score').html('0');
    renderQuizQuestion(); // goes back to q1
  });
}

// this function will be the callback for when the page loads. 
function handleQuizForm () {
  startQuiz();
  renderQuizQuestion();
  handleQuizFeedback();
  renderNextQuestion();
}

$(handleQuizForm);
