//global variables:
const board = document.getElementById("board");
const timeLeft = document.querySelector(".timeLeft");
const attempts = document.querySelector(".attempts");
let playerName = document.querySelector(".player-name");
let playerPoints = document.querySelector(".player-points");

let firstCard, secondCard;
let hasFlipped = false;
let lockBoard = false;
let attemptsCounter = 0;
let points = 0;
let totalPoints;
let pName = "";
let seconds;

// let seconds = 60; //difficultyChoise();

//withdraws the relevant details from the localStorage
function updateData() {
  // points = Number(localStorage.getItem("score"));
  playerPoints.textContent = points;
  pName = JSON.parse(localStorage.playerArr[0].nickName);
  playerName.textContent = pName;
}

let time = setInterval(() => {
  seconds--;
  timeLeft.textContent = seconds;
  if (seconds == 0) gameOver();
}, 1000);

const getCardsData = () => [
  { imgSrc: "./Images/clarinet.jpg", name: "clarinet" },
  { imgSrc: "./Images/clarinet.jpg", name: "clarinet" },
  { imgSrc: "./Images/darbuka.jpg", name: "darbuka" },
  { imgSrc: "./Images/darbuka.jpg", name: "darbuka" },
  { imgSrc: "./Images/drums.jpg", name: "drums" },
  { imgSrc: "./Images/drums.jpg", name: "drums" },
  { imgSrc: "./Images/guitar.jpg", name: "guitar" },
  { imgSrc: "./Images/guitar.jpg", name: "guitar" },
  { imgSrc: "./Images/harp.jpg", name: "harp" },
  { imgSrc: "./Images/harp.jpg", name: "harp" },
  { imgSrc: "./Images/piano.jpg", name: "piano" },
  { imgSrc: "./Images/piano.jpg", name: "piano" },
  { imgSrc: "./Images/saxophone.jpg", name: "saxophone" },
  { imgSrc: "./Images/saxophone.jpg", name: "saxophone" },
  { imgSrc: "./Images/trumpet.jpg", name: "trumpet" },
  { imgSrc: "./Images/trumpet.jpg", name: "trumpet" },
  { imgSrc: "./Images/violin.jpg", name: "violin" },
  { imgSrc: "./Images/violin.jpg", name: "violin" },
];

const cards = getCardsData();

//shuffles the cards
function shuffleCards(arr) {
  for (cardIndex in arr) {
    randomInx = Math.floor(Math.random() * arr.length);
    const tmp = cards[cardIndex];
    arr[cardIndex] = arr[randomInx];
    arr[randomInx] = tmp;
  }
  return arr;
}

//runs the functions in the right order
function init() {
  shuffleCards(cards);
  for (idx in cards) {
    const card = createCard(idx);
    board.appendChild(card);
  }
  overlayOn();
  timeLeft.textContent = seconds;
  updateData();
}

init();

function difficultyChoise() {
  const diffLevel = document.getElementById("diffLvl");
  // const gameTime = diffLevel.options[diffLevel.selectedIndex].value; //not working
  // return gameTime;
  diffLevel.onchange = () => {
    if (diffLevel.value == "easy") seconds = 60;
    if (diffLevel.value == "medium") seconds = 45;
    if (diffLevel.value == "hard") seconds = 30;
    if (diffLevel.value == "extreme") seconds = 18;
  };
}

//generates the cardElement in the html & build it's needed atrributes
function createCard(index) {
  const card = document.createElement("div");
  const front = document.createElement("img");
  const back = document.createElement("div");
  card.id = index; //is it needless?
  card.classList = "card";
  front.classList = "front";
  back.classList = "back";
  front.src = cards[index].imgSrc;
  front.alt = cards[index].name; //necessary?
  card.setAttribute("name", cards[index].name);
  card.appendChild(front);
  card.appendChild(back);
  card.addEventListener("click", cardClicked); //, !disable);
  return card;
}

//operates according to the clicked-cards respectively(first/second)
function cardClicked(e) {
  if (lockBoard) return; //to ensure that no more than 2 cards are allowed to be clicked and reveiled
  if (e.target === firstCard) return; //if the same card is clicked twice - the second click doesn't count
  let clickedCard = e.target; //should replace e.target with "this"?
  e.target.classList.add("flip");
  // if it's the first-clicked-card:
  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = clickedCard;
    return;
  }
  //else - if it's the second-clicked-card:
  secondCard = clickedCard;
  doCardsMatch();
}

//checks for a match between the 2 cards
function doCardsMatch() {
  attempts.textContent = ++attemptsCounter;
  let match =
    firstCard.getAttribute("name") === secondCard.getAttribute("name");
  match ? disableCards() : hideCards();
}

//makes the cards unclickable
function disableCards() {
  firstCard.classList.add("disable");
  secondCard.classList.add("disable");
  resetBoard();
  points += 5;
  playerPoints.textContent = points;
  setTimeout(() => {
    checkForWin();
  }, 1000);
}

//hides the cards content(images)
function hideCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

//resets the board and it's variables to neutral values
function resetBoard() {
  firstCard = null;
  secondCard = null;
  hasFlipped = false;
  lockBoard = false;
}

function checkForWin() {
  let foundCards = document.querySelectorAll(".disable");
  if (foundCards.length === cards.length) {
    points += 15;
    playerPoints.textContent = points;

    localStorage.setItem(
      `${playerName}Score`,
      Number(localStorage.getItem(`${playerName}Score`)) + points
    );

    confirm("congratulations! you won!!!\nto play again - press OK")
      ? restart()
      : clearInterval(time);
  }
}

function gameOver() {
  lockBoard = true;
  confirm("GAME-OVER!\nto play again - press OK")
    ? restart()
    : clearInterval(time);
}

//restarts the game
function restart() {
  // let cardsList = document.querySelectorAll(".card");
  // cardsList.forEach((c) => c.classList.remove("flip"));
  // shuffleCards(cards);
  // flips.textContent = 0;
  // clearInterval(time);
  // timeLeft.textContent = 60;
  totalPoints += points;
  window.location.reload();
}

function overlayOn() {
  document.getElementById("overlay").style.display = "block";
  difficultyChoise();
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
}

//sends the relevant details to the localStorage and goes back to the main portal
function backToPortal() {
  window.location.href = "../Game portal/portal.html";
}
