const numOfcards = 6;
let cards = [];
for (let i = 0; i < numOfcards; i++) {
  cards.push(i + 1);
  cards.push(i + 1);
}
let score = 0;
let flippedCards = [];

function shuffle(cards){
cards = cards.sort((a, b) => Math.random() - 0.5);
cards = cards.sort((a, b) => Math.random() - 0.5);
cards = cards.sort((a, b) => Math.random() - 0.5);
cards = cards.sort((a, b) => Math.random() - 0.5);
cards = cards.sort((a, b) => Math.random() - 0.5);}


//----------------------------------------------------------------

// making a button that shuffle the cards

// let input = document.getElementById("myInput");
// input.addEventListener("keypress", function(event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     document.getElementById("myBtn").click();
//   }
// });
// //----------------------------------------------------------




//function myFunction() {
//  document.getElementById("MIX"){
//    cards = cards.sort((a, b) => Math.random() - 0.5);
//  };
//}


// that will be a picture on every card

// counting points of every 

// a button of new game

// memory of the results




function flipCard(event) {
  console.log("clicked");
  if (flippedCards.length === 1) {
    // second card
    flippedCards.push(event.target.id);
    event.target.onclick = () => {};
    event.target.children[0].className = "";

    const firstCardIndex = flippedCards[0];
    const secondCardIndex = flippedCards[1];

    if (cards[firstCardIndex] === cards[secondCardIndex]) {
      console.log("equals");
      score = score + 10;
      flippedCards = [];
    } else {
      console.log("not equals");
      setTimeout(() => {
        const firstElem = document.getElementById(flippedCards[0]);
        event.target.children[0].className = "hidden";
        firstElem.onclick = flipCard;
        firstElem.children[0].className = "hidden";
        event.target.onclick = flipCard;
        flippedCards = [];
      }, 2000);
    }
  } else if (flippedCards.length === 0) {
    // first card
    flippedCards.push(event.target.id);
    event.target.onclick = () => {};
    event.target.children[0].className = "";
  }
}
console.log(cards);
const boardElem = document.getElementById("board");

function createCard(cardIndex, cardContent) {
  const cardElem = document.createElement("div");
  const innerCardElem = document.createElement("div");
  innerCardElem.className = "hidden";
  cardElem.id = cardIndex;
  innerCardElem.innerText = cardContent;
  cardElem.className = "card";
  cardElem.append(innerCardElem);

  cardElem.onclick = flipCard;
  boardElem.append(cardElem);
}

cards.forEach((card, index) => {
  createCard(index, card);
});

console.log({ cards });
