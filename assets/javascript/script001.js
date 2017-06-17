// document.addEventListener(“DOMContentLoaded”, function(){ }
// Initialize Variables
var wordList = ["attended","avoid","brother","busy","celebrated","civility","considered","could","course","delicate","delight","dinner","earnestly","exquisite","figure","first","from","garrets","however","improve","improving","incommode","letter","meant","mention","mile","neglected","nothing","paid","pasture","possession","prevailed","pursuit","reasonable","required","servants","shutters","sitting","solid","stairs","still","strictly","suspected","talking","they","unpacked","vicinity","whole","wrote","abilities","acceptance","account","active","addition","affection","again","against","against","agreed","answered","appearance","applauded","arranging","arrival","asked","assistance","attention","balls","become","behaved","behaviour","believe","believed","believing","blessing","brother","building","busy","cause","chamber","chief","child","child","collected","companions","conveying","convinced","cottage","court","dare","dear","death","departure","departure","determine","direction","discovery","dissimilar","distant","distrusts","does","door","doors","doubt","draw","dull","elderly","enable","enabled","enjoyment","entire","even","ever","exertion","exeter","extensive","ferrars","fine","forbade","former","formerly","fortune","friend","friends","fruit","full","garrets","girl","give","graceful","hardly","help","hence","herself","home","hoped","hoped","horses","house","household","hundred","imagine","impossible","improved","incommode","innate","instantly","invitation","invited","john","judgment","kept","kindness","ladies","ladyship","like","like","listening","manners","margaret","marianne","marry","mention","mind","minuter","moonlight","moreover","music","mutual","myself","name","nature","necessary","neither","never","nothing","numerous","occasional","offering","opinion","others","ourselves","outlived","overcame","paid","passage","peculiar","people","perceive","perfectly","perhaps","period","pleased","pleasure","position","possible","preferred","prepare","principle","projection","propriety","prosperous","provided","purse","quitting","raillery","raising","raptures","regular","related","relation","remarkably","rent","repeated","replying","request","required","reserved","resources","rich","screened","seems","sense","sensible","sentiments","sentiments","settled","simplicity","since","sincerity","small","smallness","smart","smiling","sociable","sons","sorry","speaking","sportsmen","started","style","subject","suffer","sufficient","supposing","surprise","suspicion","sweetness","sympathize","talent","tell","tended","there","these","they","think","totally","unaffected","uncommonly","understood","understood","unfeeling","venture","very","vicinity","view","visit","weather","welcome","whatever","while","whose","world","worthy","wound","written","wrote","wrote","yourself","zealously"];
var word = wordList[Math.floor(Math.random() * wordList.length)];
var underline = [];
var correct = document.getElementById("correct");
var guess = [];
var guessed = document.getElementById("guessed");
var tries = 12;
var remains = document.getElementById("remains");
var win = 0;
var wins = document.getElementById("wins");
var hiScore = win;
var highScore = document.getElementById("highScore");
var hits = [false, false, false, false, false, false, false, false, false, false, false, false];
var gameOverState = false;
var gameOverReady = false;
var shooterScale = 0.083;
var shooterX = -220;
var shooterY = -220;
// setWord() gets a random word from wordList[], reinitializes variables, and updates HTML
setWord = function() {
	word = wordList[Math.floor(Math.random() * wordList.length)];
	underline = [];
	correct.innerHTML = "";
	for( i = 0; i < word.length; i ++) {
		underline[i] = "_";
		correct.innerHTML += underline[i] + " ";
	}
	guess = [];
	guessed.innerHTML = guess;	
}
// Event Listener triggers this function
function keyPress(keyRegister) {
	var keyValue = keyRegister.keyCode;
	// Tests keyCode value for alphabet characters ONLY
	if(keyValue >= 65 && keyValue <= 90 && !gameOverState) {
		// Sets keyValue to lower case characters
		keyValue = keyRegister.key.toLowerCase();
		// Tests for duplicate inputs, adds input to guess[], and updates HTML
		if(!guess.includes(keyValue)) {
			guess.push(keyValue);
			guessed.innerHTML = "";
			guess.forEach(function(el, idx, arr) {
				guessed.innerHTML += " " + guess[idx];
			});
			// Tests for matching input and updates HTML
			if(word.includes(keyValue)) {
				correct.innerHTML = "";
				underline.forEach(function(el, idx, arr) {
					if(word.charAt(idx) === keyValue) {
						underline[idx] = keyValue;
					}
					correct.innerHTML += underline[idx] + " ";
				});
				// Tests for win condition and runs next()
				if(!underline.includes("_")) { 

					next();
				}
			} else {
				tries --;
				remains.innerHTML = tries;
				// Tests for lose condition and runs gameOver()
				if(!tries) {
					gameOverState = true;
					gameOverReady = false;
					gameOver();
				} else {
					document.getElementById("shooter").style.opacity = 1;
					document.getElementById("shooter").style.transform = "scaleX(-1) scale(" + shooterScale + ")";
					shooterY += 20;
					document.getElementById("shooter").style.top = shooterY + "px";					
					shooterX += 20;
					document.getElementById("shooter").style.right = shooterX + "px";
					shooterScale += 0.083;
					bulletHole();
				}
			}
		}

	} else {
		if(keyValue === 32 && gameOverState && gameOverReady) {
			tries = 12;
			remains.innerHTML = tries;
			win = 0;
			wins.innerHTML = win;
			gameOverState = false;
			document.getElementById("glass1").style.opacity = 0;
			document.getElementById("glass2").style.opacity = 0;
			document.getElementById("glass3").style.opacity = 0;
			document.getElementById("gameOver").style.opacity = 0;
			document.getElementById("shooter").style.opacity = 0;
			setWord();
			reset();
		}
	}
}
// Incriments win and hiScore, updates HTML, and reruns setWord()
function next() {
	win ++;
	if(win > hiScore) {
		hiScore = win;
		highScore.innerHTML = hiScore;	
	}
	wins.innerHTML = win;
	setWord();
}
// Reinitializes tries and win, updates HTML, and reruns setWord()
function gameOver() {
	playSound("finale");
	document.getElementById("gameOver").style.opacity = 1;
	window.setTimeout(function() {
		document.getElementById("glass1").style.opacity = .9;
		window.setTimeout(function() {
			document.getElementById("glass2").style.opacity = .9;
			window.setTimeout(function() {
				document.getElementById("glass3").style.opacity = .9;
				window.setTimeout(function() {
					gameOverReady = true;
				} , 3500);
			} , 2250);
		} , 500);
	} , 1750);
}
function bulletHole() {
	var index = Math.floor(Math.random() * 2);
	playSound("hit" + (index + 1));
	index = Math.floor(Math.random() * hits.length);
	if(!hits[index]) {
		hits[index] = true;
		var hitValue = "bulletHit" + (index + 1);
		document.getElementById(hitValue).style.opacity = .90;
		index = Math.random() * 360;
		transX = (Math.random() * 835) - 445; // -445 to 390
		console.log("transX " + transX);
		transY = (Math.random() * 330) - 75; // -75 to 255
		console.log("transY " + transY);
		document.getElementById(hitValue).style.transform = "translateX(" + transX + "px) " +
															"translateY(" + transY + "px) " + 
															"rotate(" + index + "deg) ";
	} else {
		bulletHole();
	}
}
function reset() {
	hits = [false, false, false, false, false, false, false, false, false, false, false, false];
	hits.forEach(function(itm, idx) {
		var hitValue = "bulletHit" + (idx + 1);
		document.getElementById(hitValue).style.opacity = 0;
	});
	shooterScale = 0.083;
	shooterX = -220;
	shooterY = -220;
	document.getElementById("shooter").style.transform = "scaleX(-1) scale(" + shooterScale + ")";
	document.getElementById("shooter").style.top = shooterY + "px";					
	document.getElementById("shooter").style.right = shooterX + "px";
}
function playSound(sound) {
	var bang = document.getElementById(sound);
	bang.play();
}
// Runs setWord() and initializes Event Listener
playSound("music");
setWord();
document.addEventListener("keyup", keyPress);