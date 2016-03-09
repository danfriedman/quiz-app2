// Questions for Joe:
// How to think about where to separate functions, for example function checkCorrect could further break down
// TODO
// false answers should be an array
// Add finishing state

var question0 = {
	ask:"Default question",
	correctAnswer:"Correct",
	falseAnswers:["False", "False", "False",],
	init: function(ask, correctAnswer, falseAnswers) {
		this.ask = ask;
		this.correctAnswer = correctAnswer;
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

var questionNumber = 0;
var currentQuestion = "";
var correctCount = 0;
var incorrectCount = 0;

function setNewQuestion() {
	questionNumber++;
	currentQuestion = "question" + questionNumber;
	eval(currentQuestion).printQuestion();
	$('.question-tracker').html("Question " + questionNumber);
	$('.btn-primary').addClass("answer");
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
	$('.answer').removeClass("answer");
});

function checkCorrect(selectedAnswer) {
	var currentCorrect = eval(currentQuestion).correctAnswer;
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