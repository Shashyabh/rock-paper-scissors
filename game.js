// Initialize scores from localStorage or default to 0
let playerScore = localStorage.getItem("player_score")
	? Number(localStorage.getItem("player_score"))
	: 0;
let computerScore = localStorage.getItem("computer_score")
	? Number(localStorage.getItem("computer_score"))
	: 0;

// Function to generate computer's choice
function computerPlay() {
	const choices = ["rock", "paper", "scissors"];
	return choices[Math.floor(Math.random() * 3)];
}

// Hide 'Next' button if scores are both 0 initially
if (playerScore === 0 && computerScore === 0) {
	document.getElementById("next").style.display = "none";
}

// Handle click events on player's choice
function clickHandler(event) {
	var ele = event.target;
	let computerChoice = computerPlay();
	document.getElementById("next").style.display = "block";

	var playerChoice = ele.name;
	if (playerChoice == undefined) {
		alert("Please click on Middle of Box Image");
	} else {
		let result = playGame(playerChoice, computerChoice);

		// Update UI based on game result
		if (result === "win") {
			playerScore++;
			document.getElementById("youWin").innerText = "YOU WIN";
			document.getElementById("againstPC").innerText = "AGAINST PC";
			document.getElementById("concentricCircleMywin").style.display = "block";
			document.getElementById("concentricCircleComputerWin").style.display = "none";
			document.getElementById("playAgain").innerText = "PLAY AGAIN";
		} else if (result === "lose") {
			computerScore++;
			document.getElementById("youWin").innerText = "YOU LOSE";
			document.getElementById("againstPC").innerText = "AGAINST PC";
			document.getElementById("concentricCircleMywin").style.display = "none";
			document.getElementById("concentricCircleComputerWin").style.display = "block";
			document.getElementById("playAgain").innerText = "PLAY AGAIN";
		} else {
			document.getElementById("youWin").innerText = "TIE UP";
			document.getElementById("againstPC").innerText = "";
			document.getElementById("playAgain").innerText = "REPLAY";
			document.getElementById("concentricCircleMywin").style.display = "none";
			document.getElementById("concentricCircleComputerWin").style.display = "none";
		}

		// Update scores and UI
		newScoreAfterPlay();

		// Update player and computer choices displayed
		document.getElementById("maiddleDiv").style.display = "none";
		if (ele.id === "imageIcons") {
			ele = ele.parentNode;
		}
		var img = document.getElementById("firstPlayingDivImage");
		var ele1 = document.getElementById("firstPlayingDiv");
		var styles = window.getComputedStyle(ele);
		var border = styles.getPropertyValue("border");
		var imgElement = ele.tagName === "IMG" ? ele : ele.querySelector("img");
		img.src = imgElement.src;
		ele1.style.border = border;

		var img = document.getElementById("thirdPlayingDivImage");
		var ele1 = document.getElementById("thirdPlayingDiv");

		// Display computer's choice
		if (computerChoice == "rock") {
			var divElement = document.getElementById("cicle1");
		} else if (computerChoice == "paper") {
			var divElement = document.getElementById("cicle3");
		} else {
			var divElement = document.getElementById("cicle2");
		}
		var styles = window.getComputedStyle(divElement);
		var border = styles.getPropertyValue("border");
		var imgElement = divElement.tagName === "IMG" ? divElement : divElement.querySelector("img");
		img.src = imgElement.src;
		ele1.style.border = border;

		document.getElementById("playingDiv").style.display = "flex";

		// Check if either player or computer has won
		if (playerScore === 15 || computerScore === 15) {
			showWinner(playerScore === 15 ? "YOU" : "COMPUTER");
		}
	}
}

// Function to display winner on result page
function showWinner(winner) {
	document.getElementById("resultPage").style.display = "block";
	document.getElementById("mainPage").style.display = "none";
	document.getElementById("youWonGame").innerHTML = `${winner} WON THE GAME!`;
	document.getElementById("next").style.display = "none";

	// Reset scores and remove from localStorage
	playerScore = 0;
	computerScore = 0;
	localStorage.removeItem("player_score");
	localStorage.removeItem("computer_score");
	newScoreAfterPlay();
}

// Function to handle 'Next' button click
function handleNextPage() {
	showWinner(playerScore > computerScore ? "YOU" : "COMPUTER");
}

// Function to update scores displayed on UI and in localStorage
function newScoreAfterPlay() {
	document.getElementById("player_score").innerText = `${playerScore}`;
	document.getElementById("computer_score").innerText = `${computerScore}`;
	localStorage.setItem("player_score", playerScore);
	localStorage.setItem("computer_score", computerScore);
}

// Event listener for 'Play Again' button on result page
document.getElementById("playAgain").addEventListener("click", function () {
	document.getElementById("resultPage").style.display = "none";
	document.getElementById("maiddleDiv").style.display = "flex";
	document.getElementById("playingDiv").style.display = "none";
	document.getElementById("concentricCircleMywin").style.display = "none";
	document.getElementById("concentricCircleComputerWin").style.display = "none";
});

// Event listener for 'Play Again' button on result page (lower button)
document.getElementById("playAgainLower").addEventListener("click", function () {
	document.getElementById("resultPage").style.display = "none";
	document.getElementById("maiddleDiv").style.display = "flex";
	document.getElementById("mainPage").style.display = "block";
	document.getElementById("concentricCircleMywin").style.display = "none";
	document.getElementById("concentricCircleComputerWin").style.display = "none";
	document.getElementById("playingDiv").style.display = "none";
	document.getElementById("next").style.display = "block";
});

// Function to toggle display of rules card
function handleCancelRuleCard() {
	var ele = document.getElementById("mainRuleCard");
	if (ele.style.display == "block" || ele.style.display == "flex") {
		ele.style.display = "none";
	} else {
		ele.style.display = "flex";
	}
}

// Function to determine game outcome based on player and computer choices
function playGame(playerSelection, computerSelection) {
	if (playerSelection === computerSelection) {
		return "draw";
	}
	if (
		(playerSelection === "rock" && computerSelection === "scissors") ||
		(playerSelection === "paper" && computerSelection === "rock") ||
		(playerSelection === "scissors" && computerSelection === "paper")
	) {
		return "win";
	}
	return "lose";
}

// Initial call to update scores on UI
newScoreAfterPlay();
