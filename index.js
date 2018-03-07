let questionNumber = 0;
let quizScore = 0;


function generateQuestionAnswers(i) {
  return `
  <label class="answer-option option-1">
      <input type="radio" name="answer" value="${i}" required>
      <span>${STORE[questionNumber].answers[i]}</span>
    </label>
  `
}

function generateCurrentQuestion(questionList, questionNumber) {
  const currentQuestion = questionList[questionNumber];

  return `
  <form class="question-answer-form js-question-answer-form">
    <fieldset>
          <legend>${currentQuestion.question}</legend>
          <div class="answer-container">
        </div>
          <button class="js-submit-question" type="submit" name="submit answer" role="button" value="Submit Answer">Submit Answer</button>
      </fieldset>
  </form>`;
}

function renderQuizQuestion() {
  //This function will render the currect question
  $('.js-main-screen').html(generateCurrentQuestion(STORE, questionNumber));

  for(let i = 0; i < 4; i++) {
    $('.answer-container').append(generateQuestionAnswers(i));
  }
}

function renderQuestionCount() {
	//This will render the current question number the user is on
	$('.js-question-number').text((questionNumber) + 1);
}

function renderUserScore() {
	//This function renders the users score
	$('.js-current-score').text(quizScore);
}

function listenForBeginQuizClick() {
	$(".js-main-screen").on('click', '.js-begin-quiz', event => {
	renderQuizQuestion();
	renderUserScore();
	renderQuestionCount();
	});
}

function generateIntroduction() {
	return `
	<h2>Ready to test your Downton Abbey wit?</h2>
    <button class="begin-quiz js-begin-quiz" type="submit" name="begin quiz" role="button" value="Begin Quiz">Begin Quiz</button>`
}

function renderIntroduction() {
	$('.js-main-screen').html(generateIntroduction());
	listenForBeginQuizClick();
}

function addToCurrentScore() {
	quizScore++;
	renderUserScore();
}

function getSelectedAnswer() {
	return $('input[name=answer]:checked').val();
}

function evaluateUserAnswer() {
	const userAnswer = getSelectedAnswer();

	if(userAnswer == STORE[questionNumber].correctAnswerId) {
		addToCurrentScore();
		return generateAnswerCorrectFeedback();
	} else {
		return generateAnswerIncorrectFeedback();
	}
}

function listenForQuizAnswerSubmit() {
	//This function will submit the selected user answer
	$('.js-main-screen').on('submit', event => {
		event.preventDefault();
		renderAnswerFeedback();
	});
}

/* This function checks if the current question is the last question, 
if so, it sets the text to "Get Results"*/
function checkForLastQuestion() {
	return (questionNumber === 9) ? "Get Results" : "Next Question";
}

function generateAnswerCorrectFeedback() {
	return `
	<h3 class="answer-feedback">You got it!</h3>
    <img class="feedback-img" src="${STORE[questionNumber].correctImg}" alt="${STORE[questionNumber].correctImgAlt}">
    <p class="feedback-phrase">Keep up the good work!</p>
    <button class="js-next-question" type="submit" name="${checkForLastQuestion()}" role="button" value="${checkForLastQuestion()}">${checkForLastQuestion()}</button>`
}

function generateAnswerIncorrectFeedback() {
	const correctAnswer = STORE[questionNumber].correctAnswerId;

	return `
	<h3 class="answer-feedback">Nope, not quite!</h3>
    <img class="feedback-img" src="${STORE[questionNumber].incorrectImg}" alt="${STORE[questionNumber].incorrectImgAlt}">
    <p class="feedback-phrase">The correct answer was: ${STORE[questionNumber].answers[correctAnswer]}</p>
    <button class="js-next-question" type="submit" name="${checkForLastQuestion()}" role="button" value="${checkForLastQuestion()}">${checkForLastQuestion()}</button>`
}

function renderAnswerFeedback() {
	//This function will provide feedback about the users answser
	$('.js-main-screen').html(evaluateUserAnswer());
}

function addToQuestionNumber() {
	questionNumber++;
	renderQuestionCount();
}

function checkForNextQuestion() {
	if(questionNumber < 9) {
		addToQuestionNumber();
		renderQuizQuestion();
	} else {
		renderQuizResults();
	}
}

function listenForNextQuestion() {
	$(".js-main-screen").on('click', '.js-next-question', function(event) {
		event.preventDefault();
		checkForNextQuestion();
	});
}


/* This function determines which phrase is shown to the user 
based off of the score they received */
function generateGradePhrase() {
	if(quizScore <= 3) {
		return "Have you watched the show? Better luck next time.";
	} 
	else if (quizScore >= 4 && quizScore <= 6 ) {
		return "Good, but not great. Definitely room for improvement!";
	}
	else if(quizScore >= 7 && quizScore < 10) {
		return "Not too shabby. A quick Downton binge and you'll be all set!";
	}
	else if(quizScore == 10) {
		return "How splendid, you got them all right! You are a true Downton Abbey fan!"
	}
}

function generateQuizResultsElement() {
	return `
	<h3 class="quiz-result-title">Have some tea and take a break!</h3>
    <img class="result-img" src="https://tribzap2it.files.wordpress.com/2015/08/downton-abbey-season-6-cast-photo.jpg?w=900" alt="Downton Abbey Season 6 Family Portrait">
    <p class="final-score">You scored ${quizScore}/10</p>
    <p class="result-phrase">${generateGradePhrase()}</p>
    <button class="js-restart-quiz" type="submit" name="restart quiz" role="button" value="Restart Quiz">Restart Quiz</button>`
}

function renderQuizResults() {
	//This function will present the user will provide the quiz results
		$('.js-main-screen').html(generateQuizResultsElement());
		listenForRestartQuizClick();
}

function resetQuestionCount() {
	questionNumber = 0;
	renderQuestionCount();
}

function resetScore() {
	quizScore = 0;
	renderUserScore();
}


function listenForRestartQuizClick() {
	$('.js-main-screen').on('click', '.js-restart-quiz', function(event) {
		resetQuestionCount();
		resetScore();
		renderIntroduction();
	})
}

function runQuizApp() {
	//This function will be responsible for starting the quiz
	//when the user clicks the start
	renderIntroduction();
	listenForNextQuestion();
	listenForQuizAnswerSubmit();
}


$(runQuizApp());