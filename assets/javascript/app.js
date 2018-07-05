$(document).ready(function() {
    var options = [
      
        {
            question: " What is Rihanna's real name? ",
            choice: ["Ryder", "Rain", "Rachel", "Robyn"],
            answer: 3,
            photo: "assets/images/"
            
        },
        {
            question: " What island is Rihanna from?",
            choice: ["Jamaica", "Barbados", "Puerto Rico ", "Dominican Repubic"],
            answer: 1,
            photo: "assets/images/"
        },
        {
            question: " What is Rihanna's first studio album titled?",
            choice: ["Anti", "Good Girl Gone Bad", "Unapologetic", "Music Of The Sun"],
            answer: 3,
            photo: "assets/images/"
        },
        {
            question: " Which artist has Rihanna NOT collaborated with? ",
            choice: ["Beyonce", "Calvin Harris", "Jay-Z", "Coldplay"],
            answer: 0,
            photo: "assets/images/"
        },
        {
            question: " What is Rihanna's makeup line named?",
            choice: ["Rihanna Beauty", "Makeup by Rihanna", "Fenty Beauty", "Beauty by Rihanna"],
            answer: 2,
            photo: "assets/images/"
        },
        {
            question: " Which shoe brand is Rihanna the creative director of? ",
            choice: ["Adidas", "Puma", "Nike", "Skechers"],
            answer: 1,
            photo: "assets/images/"
        },
        {
            question: " How many Grammy awards has Rihanna won? ",
            choice: ["3", "6", "9", "8"],
            answer: 2,
            photo: "assets/images/"
        
  
    
        }];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 10;
var intervalId;
var userGuess = "";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];

$("#reset").hide();
//start button to start 
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//starts timer
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//countdown for timer
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stops time when reaches 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//stop timer
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);

}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 10;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})