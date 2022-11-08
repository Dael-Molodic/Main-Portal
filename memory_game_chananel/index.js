const numOfcards = 6;

let cards = [];
for (let i = 0; i < numOfcards; i++) {
  cards.push(i + 1);
  cards.push(i + 1);
}


const firemanSam = [
  {0: "https://mms.businesswire.com/media/20140602005356/en/418196/5/HERO_FS_CG_Hero%5B1%5D.jpg",},
  {1: "https://static.wikia.nocookie.net/firemansam/images/6/61/S10.Penny.M.jpeg/revision/latest?cb=20161013211808",},
  {2: "https://static.miraheze.org/loathsomecharacterswiki/8/81/ElvisS6.png",},
  {3: "https://static.wikia.nocookie.net/firemansam/images/a/ac/S10.Off.St.jpeg/revision/latest/scale-to-width-down/250?cb=20161014030836",},
  {4: "https://static.wikia.nocookie.net/firemansam/images/2/28/Image-1476318271.jpg/revision/latest?cb=20161013002431",},
  {5: "https://static.wikia.nocookie.net/firemansam/images/2/21/Ellie_Phillips_Promo.png/revision/latest?cb=20150925014912",}
]





let score = 0;
let flippedCards = [];
cards = cards.sort((a, b) => Math.random() - 0.5);
cards = cards.sort((a, b) => Math.random() - 0.5);
cards = cards.sort((a, b) => Math.random() - 0.5);
cards = cards.sort((a, b) => Math.random() - 0.5);
cards = cards.sort((a, b) => Math.random() - 0.5);

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

function newGame(){

  const button = document.createElement('button')
button.innerText = 'Click for a new Game'
button.addEventListener('click', () => {


  let flippedCards = [];
cards = cards.sort((a, b) => Math.random() - 0.5);
cards = cards.sort((a, b) => Math.random() - 0.5);
cards = cards.sort((a, b) => Math.random() - 0.5);
cards = cards.sort((a, b) => Math.random() - 0.5);
cards = cards.sort((a, b) => Math.random() - 0.5);


alert('Oh, you clicked me!')
})

document.body.appendChild(button)}
newGame();


// button for new game
// function newGame (){

  

// }
