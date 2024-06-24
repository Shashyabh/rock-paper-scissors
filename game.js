let playerScore = localStorage.getItem("player_score")
	? Number(localStorage.getItem("playerScore"))
	: 0;
let computerScore = localStorage.getItem("computer_score")
	? Number(localStorage.getItem("computerScore"))
	: 0;

function computerPlay() {
	const choices = ["rock", "paper", "scissors"];
	return choices[Math.floor(Math.random() * 3)];
}

if (playerScore === 0 && computerScore === 0) {
	document.getElementById("next").style.display = "none";
}

const computer_style = [
	{
		rock: "cicle1",
		paper: "cicle2",
		scissors: "cicle3",
	},
];

function clickHandler(event) {
	var ele = event.target;
	let computerChoice = computerPlay();
	document.getElementById("next").style.display = "block";

	var playerChoice = ele.name;
	if (playerChoice == undefined) {
		alert("Please click on Middle of Box Image");
	} else {
		let result = playGame(playerChoice, computerChoice);
		// console.log(result);
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
		newScoreAfterPlay();

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

		if (computerChoice == "rock") {
			var divElement = document.getElementById("cicle1");
			var styles = window.getComputedStyle(divElement);
			var border = styles.getPropertyValue("border");
			var imgElement =
				divElement.tagName === "IMG" ? divElement : divElement.querySelector("img");
			img.src = imgElement.src;
			ele1.style.border = border;
		} else if (computerChoice == "paper") {
			var divElement = document.getElementById("cicle3");
			var styles = window.getComputedStyle(divElement);
			var border = styles.getPropertyValue("border");
			var imgElement =
				divElement.tagName === "IMG" ? divElement : divElement.querySelector("img");
			img.src = imgElement.src;
			ele1.style.border = border;
		} else {
			var divElement = document.getElementById("cicle2");
			var styles = window.getComputedStyle(divElement);
			var border = styles.getPropertyValue("border");
			var imgElement =
				divElement.tagName === "IMG" ? divElement : divElement.querySelector("img");
			img.src = imgElement.src;
			ele1.style.border = border;
		}

		document.getElementById("playingDiv").style.display = "flex";

		if (playerScore === 15 || computerScore === 15) {
			showWinner(playerScore === 15 ? "YOU" : "COMPUTER");
		}
	}
}

function showWinner(winner) {
	document.getElementById("resultPage").style.display = "block";
	document.getElementById("mainPage").style.display = "none";
	document.getElementById("youWonGame").innerHTML = `${winner} WON THE GAME!`;
	// document.getElementById("youWonGame").style.marginLeft = "70px";
	document.getElementById("next").style.display = "none";
	playerScore = 0;
	computerScore = 0;
	localStorage.removeItem("playerScore");
	localStorage.removeItem("computerScore");
	newScoreAfterPlay();
}

function handleCancelRuleCard() {
	// alert("clicked");
	var ele = document.getElementById("mainRuleCard");

	if (ele.style.display == "block" || ele.style.display == "flex") {
		ele.style.display = "none";
	} else {
		ele.style.display = "flex";
	}
}

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
newScoreAfterPlay();

function newScoreAfterPlay() {
	document.getElementById("player_score").innerText = `${playerScore}`;
	document.getElementById("computer_score").innerText = `${computerScore}`;
}

document.getElementById("playAgain").addEventListener("click", function () {
	//console.log("clicked");
	document.getElementById("resultPage").style.display = "none";
	document.getElementById("maiddleDiv").style.display = "flex";
	document.getElementById("playingDiv").style.display = "none";
	document.getElementById("concentricCircleMywin").style.display = "none";
	document.getElementById("concentricCircleComputerWin").style.display = "none";
});

document.getElementById("playAgainLower").addEventListener("click", function () {
	document.getElementById("resultPage").style.display = "none";
	document.getElementById("maiddleDiv").style.display = "flex";
	document.getElementById("mainPage").style.display = "block";
	document.getElementById("concentricCircleMywin").style.display = "none";
	document.getElementById("concentricCircleComputerWin").style.display = "none";
	document.getElementById("playingDiv").style.display = "none";
	document.getElementById("next").style.display = "block";
	document.getElementById("next").style.display = "none";
});

function handleNextPage() {
	showWinner(playerScore > computerScore ? "YOU" : "COMPUTER");
}
