let firstCardElement = null; 
let points = 0;
let pairs;
let numCards = 0;
let cards = [];
const img = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍', '🫒','🥝','🍋','🍎', '🫐']
//remove the buttons
function removeElementsByClass(classR){
    const elements = document.getElementsByClassName(classR);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    let el2 = document.getElementById("buttons")
    el2.remove();
}
//this function return how many cards we will be playing - according to the user choice
function numC(){
    switch(this.id){
        case `Easy`:
            numCards = 18;
            buildArray(numCards);
            return;
        case "Medium":
            numCards=24;
            buildArray(numCards);
            return;
        case "Hard":
            numCards=30;
            buildArray(numCards);
            return;     
    }
}
//this function create the array, call the shuffle and build the board
function buildArray(numCards){
    cards = [];
    console.log("numCards", numCards);
    pairs = numCards/2;
    console.log("pairs:",pairs);
    let counter = 0;
    for(let i = 0; i<numCards; i+=2){
        cards[i] = img[counter];
        cards[i+1] = img[counter];
        counter++;       
    }
    cards = shuffleCards(cards);
    removeElementsByClass("button");
    for (idx in cards){
        board.appendChild(createCard(idx));
    }

}
//this function create the button level
function createLevelButton(idx){
    let button = document.createElement("button");
    button.type = "radio";
    button.id = idx;
    button.className = "button";
    button.innerText = idx;
    button.addEventListener("click", numC);
    return button;
}
//this function create the board.
function init (){
    //sign that it's not the first game
    if (points > 0){
        points = 0;
        gamePoints.innerText = points;
        removeElementsByClass("button");
    }
    //create buttons that the user can choose what level he wants
    buttons = document.createElement("fieldset");
    buttons.innerText = "Which level do you wanna play?"
    buttons.id = "buttons";
    main.appendChild(buttons);
    let easyButton = createLevelButton("Easy");
    buttons.appendChild(easyButton);
    let mediumButton = createLevelButton("Medium");
    buttons.appendChild(mediumButton);
    let hardButton = createLevelButton("Hard")
    buttons.appendChild(hardButton);
}

//this function get a sorted cards and shuffle them for the start of the game
function shuffleCards(cards){
    console.log(cards);
    for (i in cards){
        let j = Math.floor(Math.random() * i + 1);
        let temp = cards[j];
        cards[j] = cards[i];
        cards[i] = temp;
    }
    console.log(cards);
    return cards;
}
function endGame(){
    removeElementsByClass("button");
    const end = document.createElement("div");
    end.id = "end";
    end.innerText = "GAME OVER"
    main.appendChild(end);
    //setTimeout(()=>{alert("GAME OVER!!!")}, 500); 
}
function gameOver (){
    for (let i = 0; i < numCards; i++){
        el1 = document.getElementById(i);
        el1.remove();
    }
    buttons = document.createElement("fieldset");
    buttons.innerText = "?Do you want to play again"
    buttons.id = "buttons";
    main.appendChild(buttons);
    let yesButton = document.createElement("button");
    yesButton.type = "radio"
    yesButton.id = "yes";
    yesButton.className = "button";
    yesButton.innerText = "Yes";
    yesButton.addEventListener("click", init);
    buttons.appendChild(yesButton);
    let noButton = document.createElement("button");
    noButton.type = "radio"
    noButton.id = "no";
    noButton.className = "button";
    noButton.innerText = "No";
    noButton.addEventListener("click", endGame);
    buttons.appendChild(noButton);
}
//this function doing -
//what happend when clicked on the card, first card and the second
//she turn them over and back
//add 1 point when there is a match
//change background when flipping and when matched
function cardClicked(e){
    if (firstCardElement == null){
        //e.target.innerText = text in div
        e.target.innerText = cards[e.target.id];
        e.target.className = "flipped";
        firstCardElement = e.target;
        firstCardElement.src = e.target.src;
        //console.log(firstCardElement);
        return
    }
    e.target.innerText = cards[e.target.id];
    e.target.className = "flipped";
    if (firstCardElement.innerText == e.target.innerText && e.target.id != firstCardElement.id)
    {
        pairs--;
        firstCardElement.className="Win";
        e.target.className="Win";
        e.target.removeEventListener("click", cardClicked);
        firstCardElement.removeEventListener("click",cardClicked);
        firstCardElement = null;
        points++;
        gamePoints.innerText = points;
    }
    else{
        setTimeout(() => {e.target.innerText = " ";
        e.target.className="card"}, 1000); 
        setTimeout(() => {firstCardElement.innerText = " ";
        firstCardElement.className="card";
        firstCardElement = null;}, 1000); 
    }
    if (pairs == 0){
        gameOver();
    }
}
//this function create each card
function createCard(idx){
    //function that return div that his class are card, with id and content.
    const cardElement = document.createElement("div");
    //cardElement.innerText = "C";
    cardElement.innerText = " ";
    cardElement.id = idx;
    cardElement.className = "card"
    cardElement.addEventListener("click", cardClicked);
    return cardElement;
}
//this function create the points counter
function buildPointsCounter (){
    let gamePoints = document.createElement("div");
    gamePoints.id = "points";
    gamePoints.innerText=points;
    return gamePoints
}

//building pointer counter in div
const head = document.getElementById("placepoints");
const board = document.getElementById("board");
const main = document.getElementById("main");
const all = document.getElementById("all");
let buttons;
head.appendChild(buildPointsCounter());
const gamePoints = document.getElementById("points");
//build the board
init();



