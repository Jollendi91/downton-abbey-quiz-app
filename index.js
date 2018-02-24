let questionNumber = 0;
let quizScore = 0;



function generateCurrentQuestion(questionList, questionNumber) {
	const currentQuestion = questionList[questionNumber];

	return `
	<form class="question-answer-form js-question-answer-form">
		<fieldset>
	        <legend>Question ${questionNumber + 1}</legend>
	        <h3>${currentQuestion.question}</h3>
	        <label class="answer-option option-1">
	          <input type="radio" name="answer" value="${currentQuestion.answers[0]}" required>
	          <span>${currentQuestion.answers[0]}</span>
	        </label>
	        <label class="answer-option option-2">
	          <input type="radio" name="answer" value="${currentQuestion.answers[1]}" required>
	          <span>${currentQuestion.answers[1]}</span>
	        </label>
	        <label class="answer-option option-3">
	          <input type="radio" name="answer" value="${currentQuestion.answers[2]}" required>
	          <span>${currentQuestion.answers[2]}</span>
	        </label>
	        <label class="answer-option option-4">
	          <input type="radio" name="answer" value="${currentQuestion.answers[3]}" required>
	          <span>${currentQuestion.answers[3]}</span>
	        </label>
	        <button class="js-submit-question" type="submit" name="submit answer" role="button" value="Submit Answer">Submit Answer</button>
	    </fieldset>
	</form>`;
}

function renderQuizQuestion() {
	//This function will render the currect question
	$('.js-main-screen').html(generateCurrentQuestion(STORE, questionNumber));
}

function renderQuestionCount() {
	//This will render the current question number the user is on
	$('.js-question-number').text((questionNumber) + 1);
}

function renderUserScore() {
	//This function renders the users score
	$('.js-current-score').text(quizScore);
}

function beginQuiz() {
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
	beginQuiz();
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

	if(userAnswer === STORE[questionNumber].correctAnswer) {
		addToCurrentScore();
		return generateAnswerCorrectFeedback();
	} else {
		return generateAnswerIncorrectFeedback();
	}
}

function submitQuizAnswer() {
	//This function will submit the selected user answer
	$('.js-main-screen').on('submit', event => {
		event.preventDefault();
		renderAnswerFeedback();
	});
}

function generateAnswerCorrectFeedback() {
	return `
	<h3>You got it!</h3>
    <img src="${STORE[questionNumber].correctImg}" alt="${STORE[questionNumber].correctImgAlt}">
    <p>Keep up the good work!</p>
    <button class="js-next-question" type="submit" name="${questionNumber === 9 ? "get results" : "next question"}" role="button" value="${questionNumber === 9 ? "get results" : "next question"}">${questionNumber === 9 ? "Get Results" : "Next Question"}</button>`
}

function generateAnswerIncorrectFeedback() {
	return `
	<h3>Nope, not quite!</h3>
    <img src="${STORE[questionNumber].incorrectImg}" alt="${STORE[questionNumber].incorrectImgAlt}">
    <p>The correct answer was: ${STORE[questionNumber].correctAnswer}</p>
    <button class="js-next-question" type="submit" name="${questionNumber === 9 ? "get results" : "next question"}" role="button" value="${questionNumber === 9 ? "get results" : "next question"}">${questionNumber === 9 ? "Get Results" : "Next Question"}</button>`
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

function goToNextQuestion() {
	$(".js-main-screen").on('click', '.js-next-question', function(event) {
		event.preventDefault();
		checkForNextQuestion();
	});
}

function generateGradePhrase() {
	if(quizScore <= 3) {
		return "Have you watched the show? Better luck next time.";
	} 
	else if (quizScore >= 4 && quizScore <= 6 ) {
		return "Not too shabby. A quick Downton binge and you'll be all set!";
	}
	else if(quizScore >= 7) {
		return "Way to go! You are clearly a true Downton Abbey fan!";
	}
}

function generateQuizResultsElement() {
	return `
	<h3>Have some tea and take a break!</h3>
    <img src="https://tribzap2it.files.wordpress.com/2015/08/downton-abbey-season-6-cast-photo.jpg?w=900" alt="Downton Abbey Season 6 Family Portrait">
    <p>You scored ${quizScore}/10</p>
    <p>${generateGradePhrase()}</p>
    <button class="js-restart-quiz" type="submit" name="restart quiz" role="button" value="Restart Quiz">Restart Quiz</button>`
}

function renderQuizResults() {
	//This function will present the user will provide the quiz results
		$('.js-main-screen').html(generateQuizResultsElement());
		restartQuiz();
}

function resetQuestionCount() {
	questionNumber = 0;
	renderQuestionCount();
}

function resetScore() {
	quizScore = 0;
	renderUserScore();
}


function restartQuiz() {
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
	goToNextQuestion();
	submitQuizAnswer();
}


$(runQuizApp());