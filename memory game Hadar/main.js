
let cards = ["🚗", "🚗", "🚕", "🚕", "🚌", "🚌", "🚑", "🚑", "🚒", "🚒", "🚛", "🚛", "🚜", "🚜", "🚔", "🚔", "🏍", "🏍", "🛴", "🛴", "🛵", "🛵", "🚲", "🚲", "🚂", "🚂", "🚀", "🚀", "🚁", "🚁", "✈", "✈", "🚢", "🚢"];

let carsdNumber = 0;
cardsNumber();
let firstCard = null;
let counter = 0;
let player1 = prompt("Hello player No 1. Whate are your name?");
let player2 = prompt("Hello player No 2. Whate are your name?");
let currentTurn = player1;
let sum1 = 0;
let sum2 = 0;

let turnRend1 = document.getElementById("turn1");
turnRend1.innerText = player1;
turnRend1.id = ("currentTurn");
let turnRend2 = document.getElementById("turn2");
turnRend2.innerText = player2;
let scoreRend1 = document.getElementById("score1");
scoreRend1.innerText = sum1;
let scoreRend2 = document.getElementById("score2");
scoreRend2.innerText = sum2;



function cardsNumber() { //כמה קלפים בלוח
    carsdNumber = Number(prompt("Wellcome! With how cards you want to play? \n choose even number between 4 to 34"))

    while ((carsdNumber % 2 != 0 || carsdNumber < 4 || carsdNumber > 34)) {
        alert("Error. need an even number between 4 to 34");
        carsdNumber = Number(prompt("Wellcome! With how cards you want to play? \n Choose even number between 4 to 34. \n To exit enter 0"))
    }
    cards = cards.slice(0, carsdNumber);
    // cardsNum = cardsNumber / 2;
    init();
}
function cardClicked(e) { // מפעילה את הקלפים לאחר לחיצה
    if (counter <= 1) {
        e.target.innerText = cards[e.target.id];
        e.target.className = "cards"
        if (firstCard == null) {
            firstCard = e.target;
            counter++;
            return
        }
    }

    if (firstCard.id != e.target.id && firstCard.innerText == e.target.innerText) {
        counter++;
        firstCard.removeEventListener('click', cardClicked);
        e.target.removeEventListener('click', cardClicked);
        setTimeout(() => {
            firstCard.className = "empty";
            e.target.className = "empty";
            firstCard.innerText = "";
            e.target.innerText = "";
            firstCard = null;
            counter = 0;
            score();
            carsdNumber = carsdNumber - 2;
            endGame();
        }, 1000)
    }
    else {
        counter++;
        setTimeout(() => {
            firstCard.innerText = "";
            e.target.innerText = "";
            firstCard.className = "card-back";
            e.target.className = "card-back";
            firstCard = null;
            counter = 0;
            currentTurn = turn()
            //turnRend.innerText = currentTurn;
        }, 1000)

    }
}
function turn() {// מחליף תור בין השחקנים
    if (currentTurn == player1) {
        turnRend2.id = ("currentTurn")
        turnRend1.id = ("noTurn")
        return player2
    }
    else {
        turnRend1.id = ("currentTurn")
        turnRend2.id = ("noTurn")
        return player1
    }
}

function score() {// ספירת נקודות
    if (currentTurn == player1) {
        sum1 += 10;
        return scoreRend1.innerText = sum1;
    }
    sum2 += 10;
    return scoreRend2.innerText = (sum2);
}
function shufle(arr) {  //מערבב
    for (cardIdx in arr) {
        const rndIndx = Math.floor(Math.random() * arr.length);
        const temp = arr[cardIdx];
        arr[cardIdx] = arr[rndIndx];
        arr[rndIndx] = temp;
    }
    return arr;
}

function createCard(crd, idx) {//יוצר קלפים
    const newDiv = document.createElement("div");
    //newDiv.innerText = crd;
    newDiv.id = idx;
    //newDiv.className = "cards";
    newDiv.className = "card-back";
    newDiv.addEventListener('click', cardClicked);
    return newDiv;
}
function init() {// מסדר את הלוח
    shufle(cards);
    const board = document.getElementById("board");
    for (i in cards) {
        board.appendChild(createCard(cards[i], i));
    }
}
function endGame() {
    if (carsdNumber == 0) {
        if (sum1 > sum2) {
            alert("👑 " + player1 + " the winner!! 👑");
        }
        else if (sum2 > sum1) {
            alert("👑 " + player2 + " the winner!!👑");
        }
        else {
            alert("Game over. draw!");
        }
    }
}  