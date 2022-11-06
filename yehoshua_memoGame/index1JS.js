//the fundamental structual variables
let body = document.getElementById("body");
let theBorad = document.getElementById("board");
let numOfCards = 10;
let theCards = [];
const fruits = {
  0: "https://cdn.pixabay.com/photo/2012/04/18/12/54/strawberry-36949__340.png",
  1: "https://cdn.pixabay.com/photo/2012/04/18/12/54/strawberry-36949__340.png",
  2: "https://cdn.pixabay.com/photo/2014/12/21/23/39/bananas-575773__340.png",
  3: "https://cdn.pixabay.com/photo/2014/12/21/23/39/bananas-575773__340.png",
  4: "https://cdn.pixabay.com/photo/2013/07/13/13/53/kiwi-161728__340.png",
  5: "https://cdn.pixabay.com/photo/2013/07/13/13/53/kiwi-161728__340.png",
  6: "https://cdn.pixabay.com/photo/2012/04/15/20/53/cherries-35288__340.png",
  7: "https://cdn.pixabay.com/photo/2012/04/15/20/53/cherries-35288__340.png",
  8: "https://cdn.pixabay.com/photo/2013/07/12/19/16/lemon-154449__340.png",
  9: "https://cdn.pixabay.com/photo/2013/07/12/19/16/lemon-154449__340.png",
  10: "https://cdn.pixabay.com/photo/2013/07/12/19/18/watermelon-154510__340.png",
  11: "https://cdn.pixabay.com/photo/2013/07/12/19/18/watermelon-154510__340.png",
  12: "https://cdn.pixabay.com/photo/2014/03/28/11/49/pineapple-300038__340.png",
  13: "https://cdn.pixabay.com/photo/2014/03/28/11/49/pineapple-300038__340.png",
  14: "https://cdn.pixabay.com/photo/2013/07/12/16/59/tangerine-151616__340.png",
  15: "https://cdn.pixabay.com/photo/2013/07/12/16/59/tangerine-151616__340.png",
  16: "https://cdn.pixabay.com/photo/2012/04/24/23/39/peach-41169__340.png",
  17: "https://cdn.pixabay.com/photo/2012/04/24/23/39/peach-41169__340.png",
  18: "https://cdn.pixabay.com/photo/2012/04/12/20/35/grapes-30550__340.png",
  19: "https://cdn.pixabay.com/photo/2012/04/12/20/35/grapes-30550__340.png",
  20: "https://cdn.pixabay.com/photo/2020/03/25/12/33/apple-4967157__340.png",
  21: "https://cdn.pixabay.com/photo/2020/03/25/12/33/apple-4967157__340.png",
  22: "https://cdn.pixabay.com/photo/2012/04/26/18/11/dragon-42696__340.png",
  23: "https://cdn.pixabay.com/photo/2012/04/26/18/11/dragon-42696__340.png",
  24: "https://cdn.pixabay.com/photo/2017/01/19/14/37/ameixoa-1992438__340.png",
  25: "https://cdn.pixabay.com/photo/2017/01/19/14/37/ameixoa-1992438__340.png",
  26: "https://cdn.pixabay.com/photo/2014/04/02/10/43/mango-304315__340.png",
  27: "https://cdn.pixabay.com/photo/2014/04/02/10/43/mango-304315__340.png",
  28: "https://cdn.pixabay.com/photo/2018/02/06/13/50/orange-3134781__340.png",
  29: "https://cdn.pixabay.com/photo/2018/02/06/13/50/orange-3134781__340.png",
};

//game diffeculty
let gameLevel = document.createElement("select");
gameLevel.id = "gamelevel";
gameLevel.onchange = () => {
  if (gameLevel.value == "easy") numOfCards = 10;
  if (gameLevel.value == "midium") numOfCards = 20;
  if (gameLevel.value == "hard") numOfCards = 30;
};
//number of players
let playerSelector = document.createElement("select");
playerSelector.id = "playerSelector";
for (let i = 0; i < 3; i++) {
  let option = document.createElement("option");
  option.value = i + 1;
  option.text = i + 1;
  playerSelector.appendChild(option);
  h2.appendChild(playerSelector);
}

playerSelector.onchange = () => {
  numOfPlayers = document.getElementById("playerSelector").value;
  temp = document.getElementById("playersNames");
  h2.removeChild(temp);

  playersNames();
};

let levels = ["easy (10 cards)", "midium (20 cards)", "hard (30 cards)"];
for (let i = 0; i < levels.length; i++) {
  let option = document.createElement("option");
  option.value = levels[i];
  option.text = levels[i];
  gameLevel.appendChild(option);
  h1.appendChild(gameLevel);
}

let firstCard = null;
// Players info
let numOfPlayers = 1;
let thePlayers = [];
let playerOne = thePlayers[0];
let playerTwo = thePlayers[1];
let playerThree = thePlayers[2];
let currentPlayerName;
let playerOnePoints = 0;
let playerTwoPoints = 0;
let playerThreePoints = 0;
let currentPlayer = playerOne;

let finishCounter = 0;
// interactive alert for the user
let alerting = document.getElementById("results");
playersNames();

function playersNames() {
  newElement = document.createElement("div");
  newElement.id = "playersNames";
  for (i = 0; numOfPlayers > i; i++) {
    input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter player " + (i + 1) + " name";
    input.id = "p" + (i + 1);
    newElement.appendChild(input);
  }

  button = document.createElement("input");
  button.type = "button";
  button.id = "play";
  button.value = "start playing";
  button.onclick = () => {
    startgame();
  };
  newElement.appendChild(button);
  document.getElementById("h2").append(newElement);
}

// playersNames();

function startgame() {
  //setting the players names
  thePlayers = [];
  for (i = 0; i < numOfPlayers; i++) {
    thePlayers.push(document.getElementById(`p${i + 1}`).value);
  }
  playerOne = thePlayers[0];
  playerTwo = thePlayers[1];
  playerThree = thePlayers[2];
  if (playerOne == playerTwo) {
    alert("you need to enter 2 defferent names");
    return;
  }
  if (playerOne.length == 0) {
    alert("you need to enter a name");
    return;
  }
  if ((numOfPlayers == 2 || numOfPlayers == 3) && playerTwo.length == 0) {
    alert("you need to enter a name");
    return;
  }
  if (numOfPlayers == 3 && playerThree.length == 0) {
    alert("you need to enter a name");
    return;
  }

  //removing the excisting elements
  document.getElementById("h1").innerHTML = "";
  document.getElementById("h2").innerHTML = "";
  //creating the current player alerts
  currentPlayerName = document.createElement("p");
  currentPlayerName.id = "currentPlayer";
  currentPlayerName.innerText =
    "current player: " + playerOne + " \n score: " + playerOnePoints;
  body.prepend(currentPlayerName);

  insertCards(theCards);

  currentPlayer = playerOne;
}

function insertCards(cardDeck) {
  for (i = 0; i < numOfCards; i++) {
    theCards.push(fruits[Number(i)]);
  }
  shuffel(theCards);
  for (card in theCards) {
    tempDiv = creatcard(card);
    console.log(tempDiv);
    theBorad.appendChild(tempDiv);
  }
}

function shuffel(cards) {
  temp = [];
  while (cards.length >= 1) {
    tempNum = Math.floor(Math.random() * cards.length);
    temp.push(cards.splice(tempNum, 1).toString());
  }
  theCards = temp;
  console.log(theCards);
  return theCards;
}

function creatcard(idx) {
  let newElement = document.createElement("div");
  newElement.className = "card";
  newElement.id = idx;
  imgElm = document.createElement("img");
  imgElm.src = theCards[idx];
  imgElm.className = "hidden img";
  newElement.appendChild(imgElm);
  newElement.addEventListener("click", cardClicked);
  return newElement;
}

function cardClicked(e) {
  //flipping the card
  e.target.style.backgroundColor = "#ffffff";
  e.target.firstElementChild.className = "img";
  // e.target.innerText = theCards[e.target.id];

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

function faild(e) {
  if (numOfPlayers == 1) {
    currentPlayer == playerOne;
  }

  if (numOfPlayers == 2) {
    if (currentPlayer == playerOne) {
      currentPlayerName.innerText =
        "current player: " + playerTwo + " \n score: " + playerTwoPoints;
      currentPlayer = playerTwo;
    } else {
      currentPlayerName.innerText =
        "current player: " + playerOne + " \n score: " + playerOnePoints;
      currentPlayer = playerOne;
    }
  }
  if (numOfPlayers == 3) {
    if (currentPlayer == playerOne) {
      currentPlayerName.innerText =
        "current player: " + playerTwo + " \n score: " + playerTwoPoints;
      currentPlayer = playerTwo;
    } else if (currentPlayer == playerTwo) {
      currentPlayerName.innerText =
        "current player: " + playerThree + " \n score: " + playerThreePoints;
      currentPlayer = playerThree;
    } else if (currentPlayer == playerThree) {
      currentPlayerName.innerText =
        "current player: " + playerOne + " \n score: " + playerOnePoints;
      currentPlayer = playerOne;
    }
  }

  setTimeout(() => {
    e.target.style.backgroundColor = "#0ca60cc9";
    firstCard.style.backgroundColor = "#0ca60cc9";
    e.target.firstElementChild.className = "card hidden";
    firstCard.firstElementChild.className = "card hidden";
    firstCard = null;
  }, 1000);
}
function succeed(e) {
  if (alerting.innerText == "Crazy!!") alerting.innerText = "Unbelivable!!";
  else alerting.innerText = "Crazy!!";
  // scoring the currrent player
  if (currentPlayer == playerOne) {
    playerOnePoints += 5;
    currentPlayerName.innerText =
      "current player: " + playerOne + " \n score: " + playerOnePoints;
  }
  if (currentPlayer == playerTwo) {
    playerTwoPoints += 5;
    currentPlayerName.innerText =
      "current player: " + playerTwo + " \n score: " + playerTwoPoints;
  }
  if (currentPlayer == playerThree) {
    playerThreePoints += 5;
    currentPlayerName.innerText =
      "current player: " + playerThree + " \n score: " + playerThreePoints;
  }
  finishCounter++;

  setTimeout(() => {
    //erasing all styling
    e.target.className = "card hidden";
    firstCard.className = "card hidden";
    //erasing listners
    e.target.removeEventListener("click", cardClicked);
    firstCard.removeEventListener("click", cardClicked);

    //resetting the variables & card text
    firstCard = null;
  }, 300);
}

function endGame() {
  currentPlayer.innerHTML = "";
  theBorad.innerHTML = "";
  alerting.innerText =
    "End game! \n " + playerOne + " got " + playerOnePoints + " points! \n";
  if (numOfPlayers > 1)
    alerting.innerText += playerTwo + " got " + playerTwoPoints + " points! \n";
  if (numOfPlayers > 2)
    alerting.innerText +=
      playerThree + " got " + playerThreePoints + " points! \n";

  let br = document.createElement("br");
  let newElement = document.createElement("button");
  newElement.id = "playagain";
  newElement.innerText = "New game";
  newElement.onclick = (event) => {
    document.location.reload();
  };
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

function playAgain() {
  alerting.innerText = "";
  finishCounter = 0;
  playerOnePoints = 0;
  playerTwoPoints = 0;
  playerThreePoints = 0;
  currentPlayer = playerOne;
  currentPlayerName.innerText = "current player: " + playerOne;
  theCards = [];
  insertCards(theCards);
}
