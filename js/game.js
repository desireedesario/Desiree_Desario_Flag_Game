/* script.js
   Desiree Desario
   May 2015
*/
				////GLOBAL VARIABLES////

var score;

var remaining;				//number are the flags left to answer in the game

var totalwrong;				//number of times the user answers incorrectly

var remainingCountries;		//array of objects containing country code and flags

var currCountry;			//currentCountry

var alternatives = [];		//alternative answers/countries array

var playPause;        //play and pause buttons

var $play = $('<img src="img/play.png" style="width:50%;padding-bottom:10%;margin-bottom:5%;">');

var $pause = $('<img src="img/pause.png" style="width:50%;padding-bottom:10%;margin-bottom:5%;">');

				//// GAME INITIALIZE /////
	var playing = true;
function initGame() {

	remainingCountries = countries.slice(0);	// Make a copy of the countries array
	remaining = remainingCountries.length;	//reset total about of counties
	totalwrong = 0;					//reset answers wrong
	score = 0;
}

				////GAME LOOP////

function newGame(){										//pretend game loop for rinse and repeating flag and game

	if (remainingCountries.length != 0) {

		currCountry = getRandomCountry(remainingCountries);		//return the random country from the countries variable

		var alternativesCopy = countries.slice(0);	//create a temporary copy of the countries
		alternatives = [];

		//will only loop to number less than three in array
		//retrieve alternative country answers
		for (var i = 0; i < 3; i++) {
			var alternative = getRandomCountry(alternativesCopy);

			if (alternative["code2"] == currCountry["code2"]) {
				--i;
				alternativesCopy.push(alternative);
				continue;
			}

			alternatives[i] = alternative;
		}

		alternatives.push(currCountry);
		alternatives = _.shuffle(alternatives);

					////HTML/////


		// Update the HTML
		$("#togo").html("Flags Remaining: " + remaining); //remaining number in togo div
		$("#incorrect").html("Wrong Guesses: " + totalwrong); //number wrong in incorrectdiv
		$("#score").html("Score: " + score);
		$("#flags").html('<div class="flag ' + currCountry['code2'] + '"><img src="img/flags/' + currCountry['code2lower'] + '.png" code="' + currCountry['code2'] + '" /></div>');



		$("#countries").html("");
		alternatives.forEach(function(item, index) {
			$("#countries").append('<div class="infocard" ccode="' + item['code2'] + '"><ul><li><h3>' + item['country'] + '</li><li>(' + item['code2'] + ')</h3></li></ul></div>');

		});
	} else {
		alert("Do you have a map, because I just got lost in your knowledge! You won the game!!");
		$(".theme").get(0).pause();
	}
}


function getRandomCountry(array){
	//pick a random country number
	var idx = Math.floor((Math.random() * array.length-1));
	return array.splice(idx, 1)[0];
}



//(how to find where the randomized selected country is)

function getCurrentCountryIndex() {
	for (var i = 0; i < remainingCountries.length; i++) {	//for loop for legnth of countries
		if (remainingCountries[i]["country"] == currCountry["country"])			//if the index of country is the selected country answer
			return i;								//return the index of the sleected country answer
	}

	return null;		//if country is not in array, return nothing
}


$(document).ready(function(){
	////ACTION JQUERY////

	//Sound start playing
	$('.playPause').append($play)

	$("#countries").on('click', '.infocard', function(){
		var selectedCountryCode = $(this).attr("ccode");

		if (currCountry.code2 == selectedCountryCode){
			remaining--;
			score += 10;
			$("#results").html("You're right! Did you know that " + currCountry['country'] + " has a population of " + currCountry['population'] + " and its capital is " + currCountry['capital'] + "? Can you guess " + remaining + " more?");
			if (currCountry.code2 == "EC"){
				$("#ecuador").get(0).play();
			} else {
				$("#correct").get(0).play();	//gets the first element of the sound
			}
		} else {
			remainingCountries.push(currCountry);
			totalwrong++;
			score -= 5;
			$("#error").get(0).play();
			$("#results").html("You have gotten " + totalwrong + " wrong, keep going!");
		}
		newGame();
	});

	initGame();
	newGame();


				////SOUND EFFECTS////
function PlaySound(soundObj) {
  var sound = document.getElementById(soundObj);
  sound.Play();
}

	//Update the sound
	$(".playPause").on('click',
		function() {
		$('.playPause').empty()
		if (playing == true){
			$('.playPause').append($pause)
			$(".theme").get(0).pause();
				playing = false;
		} else {
			$('.playPause').append($play)
			$(".theme").get(0).play();
				playing = true
		}
	});

});
