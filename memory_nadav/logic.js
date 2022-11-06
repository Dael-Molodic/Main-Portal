//global variables:
const board = document.getElementById("board");
const timeLeft = document.querySelector("timeLeft");
// let extreme = 45,
//   hard = 60,
//   medium = 80,
//   easy = 100;
// let time = easy || medium || hard || extreme;
let firstCard, secondCard;
let hasFlipped = false;
let lockBoard = false;

// timeLeft.textContent = difficultyChoise();

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

//runs the functions by correct order
function init() {
  shuffleCards(cards);
  difficultyChoise();
  for (idx in cards) {
    const card = createCard(idx);
    board.appendChild(card);
  }
}

init();

function difficultyChoise() {
  const diffLevel = document.getElementById("diffLvl");
  const gameTime = diffLevel.options[diffLevel.selectedIndex].value;
  return gameTime;
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
    // console.log(firstCard);
    // console.log(firstCard.getAttribute("name")); //how to get an html attribute from the e.target
    // console.log(firstCard.front.alt);
    return;
  }
  //else - if it's the second-clicked-card:
  secondCard = clickedCard;
  doCardsMatch();
}

//checks for a match between the 2 cards
function doCardsMatch() {
  // console.log(firstCard);
  let match =
    firstCard.getAttribute("name") === secondCard.getAttribute("name");
  match ? disableCards() : hideCards();
}

//makes the cards unclickable
function disableCards() {
  firstCard.classList.add("disable");
  secondCard.classList.add("disable");
  resetBoard();
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

//restarts the game
function restart() {
  shuffleCards(cards);
  let frontsList = document.querySelectorAll(".front");
  // let backsList = document.querySelectorAll(".back"); //needed??
  let cardsList = document.querySelectorAll(".card");
}
