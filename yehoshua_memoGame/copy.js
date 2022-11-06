//the fundamental structual variables
let body = document.getElementById("body");
let theBorad = document.getElementById("board");
let theCards = ["פרח", "פרח", "שועל", "שועל", "שמש", "שמש"];
let firstCard = null;
// Players info
let playerOne = "";
let playerTwo = "";
let currentPlayerName;
let playerOnePoints = 0;
let playerTwoPoints = 0;
let currentPlayer = playerOne;

let finishCounter = 0;
// interactive alert for the user
let alerting = document.getElementById("results");

function cardClicked(e) {
  //flipping the card
  e.target.style.backgroundColor = "#ff0000";
  e.target.innerText = theCards[e.target.id];

  if (firstCard == null) {
    firstCard = e.target;
    return;
  }
  if (theCards[e.target.id] !== theCards[firstCard.id]) faild(e);

  if (
    theCards[e.target.id] == theCards[firstCard.id] &&
    e.target.id !== firstCard.id
  )
    succeed(e);
  if (theCards.length / 2 == finishCounter) endGame();
}

function shuffel(cards) {
  temp = [];
  while (cards.length >= 1) {
    tempNum = Math.floor(Math.random() * cards.length);
    temp.push(cards.splice(tempNum, 1).toString());
  }
  theCards = temp;
  return theCards;
}

function creatcard(crd, idx) {
  let newElement = document.createElement("div");
  newElement.className = "card";
  newElement.id = idx;
  newElement.addEventListener("click", cardClicked);
  return newElement;
}

function insertCards(cardDeck) {
  shuffel(cardDeck);
  for (card in theCards) {
    tempDiv = creatcard(theCards[card], card);
    console.log(tempDiv);
    theBorad.appendChild(tempDiv);
  }
}
function startgame() {
  //setting the players names
  playerOne = document.getElementById("p1").value;
  playerTwo = document.getElementById("p2").value;
  if (playerOne == playerTwo) {
    alert("you need to enter 2 defferent names");
    return;
  }
  //removing the excisting elements
  body.removeChild(document.getElementById("h1"));
  theBorad.removeChild(document.getElementById("playersNames"));

  //creating the current player alerts
  currentPlayerName = document.createElement("p");
  currentPlayerName.id = "currentPlayer";
  currentPlayerName.innerText = "current player: " + playerOne;
  body.prepend(currentPlayerName);

  currentPlayer = playerOne;
  insertCards(theCards);
}

function faild(e) {
  if (currentPlayer == playerOne) {
    currentPlayerName.innerText = "current player: " + playerTwo;
    currentPlayer = playerTwo;
  } else {
    currentPlayerName.innerText = "current player: " + playerOne;
    currentPlayer = playerOne;
  }

  setTimeout(() => {
    e.target.style.backgroundColor = "#0ca60cc9";
    firstCard.style.backgroundColor = "#0ca60cc9";
    e.target.innerText = "";
    firstCard.innerText = "";
    firstCard = null;
  }, 1000);
}
function succeed(e) {
  if (alerting.innerText == "Crazy!!") alerting.innerText = "Unbelivable!!";
  else alerting.innerText = "Crazy!!";
  // scoring the currrent player
  if (currentPlayer == playerOne) playerOnePoints++;
  else playerTwoPoints++;
  finishCounter++;

  setTimeout(() => {
    //erasing all styling
    e.target.style.backgroundColor = "#0ca60c00";
    firstCard.style.backgroundColor = "#0ca60c00";
    e.target.style.border = "0px";
    firstCard.style.border = "0px";
    e.target.innerText = "";
    //erasing listners
    e.target.removeEventListener("click", cardClicked);
    firstCard.removeEventListener("click", cardClicked);
    //resetting the variables & card text
    firstCard.innerText = "";
    firstCard = null;
  }, 300);
}

function endGame() {
  body.removeChild(document.getElementById("currentPlayer"));
  body.removeChild(theBorad);
  alerting.innerText =
    "End game! \n " +
    playerOne +
    " got " +
    playerOnePoints +
    " points! \n" +
    playerTwo +
    " got " +
    playerTwoPoints +
    " points! \n";

  let br = document.createElement("br");
  let newElement = document.createElement("button");
  newElement.id = "playagain";
  newElement.innerText = "New game";
  newElement.addEventListener("click", refresh);
  alerting.appendChild(br);
  alerting.appendChild(newElement);

  alerting.appendChild(br);
  let newElement2 = document.createElement("button");
  newElement2.id = "playagain";
  newElement2.innerText = "Play again";
  newElement2.addEventListener("click", playAgain);
  alerting.appendChild(br);
  alerting.appendChild(newElement2);
}

function refresh() {
  document.location.reload();
}

function playAgain() {
  theBorad = document.createElement("div");
  theBorad.id = "board";
  currentPlayerName = document.createElement("p");
  currentPlayerName.id = "currentPlayer";
  currentPlayerName.innerText = "current player: " + playerOne;
  body.prepend(currentPlayerName);

  currentPlayer = playerOne;
  debugger;
  insertCards(theCards);
}
