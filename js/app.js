var question0 = {
	ask:"Default question",
	correctAnswer:"Correct",
	falseAnswers:["False", "False", "False",],
	init: function(ask, correctAnswer, falseAnswers) {
		this.ask = ask;
		this.correctAnswer = correctAnswer;
		this.falseAnswers = [];
		this.falseAnswers[0] = falseAnswers[0];
		this.falseAnswers[1] = falseAnswers[1];
		this.falseAnswers[2] = falseAnswers[2];
	},
	printQuestion:function() {
		$('.question-text').html(this.ask);
		$('.answer1').html(this.correctAnswer);
		$('.answer2').html(this.falseAnswers[0]);
		$('.answer3').html(this.falseAnswers[1]);
		$('.answer4').html(this.falseAnswers[2]);
	}
};

var question1 = Object.create(question0);
question1.init("What year did Bernie Williams retire?", "2006", ["2009", "1999", "1993"]);

var question2 = Object.create(question0);
question2.init("What number did Bernie Williams wear?", "51", ["13", "17", "4"]);

var question3 = Object.create(question0);
question3.init("How many world series did Bernie Williams win with the Yankees?", "4", ["0", "8", "2"]);

var question4 = Object.create(question0);
question4.init("Which awards has Bernie been nominated for but not won?", "Latin Grammy", ["Silver Slugger", "Gold Glove", "ALCS MVP"]);

var questionList = [question0, question1, question2, question3, question4];

var questionNumber = 0;
var currentQuestion = "";
var correctCount = 0;
var incorrectCount = 0;

function setNewQuestion() {
	questionNumber++;
	currentQuestion = questionList[questionNumber];
	currentQuestion.printQuestion();
	$('.question-tracker').html("Question " + questionNumber);
	$('.answer').attr("disabled", false);
}

// Set first question on load
setNewQuestion();

$('.next').on('click', function() {
	setNewQuestion();
	$('.correct').addClass('hidden');
	$('.incorrect').addClass('hidden');
	$('.next').addClass('hidden');
});

$('.question').on('click', '.answer', function(){
	var selectedAnswer = $(this).html();
	checkCorrect(selectedAnswer);
	$('.answer').attr("disabled", true);
});

function checkCorrect(selectedAnswer) {
	var currentCorrect = questionList[questionNumber].correctAnswer;
	if (currentCorrect == selectedAnswer) {
		$('.correct').toggleClass('hidden');
		correctCount++;
	} else {
		$('.incorrect').toggleClass('hidden');
		$('.prev-answer').html(currentCorrect);
		incorrectCount++;
	}

	$('.correct-count').html(correctCount);
	var totalCount = correctCount + incorrectCount;
	$('.total-count').html(totalCount);
	$('.next').toggleClass('hidden');
}