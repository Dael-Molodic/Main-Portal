const picture1 = "pexels-cátia-matos-1072179.jpg";
const picture2 = "pexels-cátia-matos-1072179.jpg";
const picture3 = "pexels-ian-turnell-709552.jpg";
const picture4 = "pexels-ian-turnell-709552.jpg";
const picture5 = "pexels-johannes-plenio-1114896.jpg";
const picture6 = "pexels-johannes-plenio-1114896.jpg";
const picture7 = "pexels-mali-maeder-109391.jpg";
const picture8 = "pexels-mali-maeder-109391.jpg";
const picture9 = "pexels-mihis-alex-21008.jpg";
const picture10 = "pexels-mihis-alex-21008.jpg";
const picture11 = "pexels-natalija-mislevicha-621720.jpg";
const picture12 = "pexels-natalija-mislevicha-621720.jpg";
const picture13 = "pexels-pixabay-54601.jpg";
const picture14 = "pexels-pixabay-54601.jpg";
const picture15 = "pexels-pixabay-158028.jpg";
const picture16 = "pexels-pixabay-158028.jpg";
const picture17 = "pexels-efdal-yildiz-917494.jpg";
const picture19 = "pexels-mike-b-109645.jpg";
const picture21 = "pexels-billel-moula-541101.jpg";
const picture23 = "pexels-star-914682.jpg";
const picture25 = "pexels-pixabay-101529.jpg";
const picture27 = "pexels-valiphotos-589840";
const picture29 = "pexels-pixabay-56875.jpg";


const cards = [picture1, picture2, picture3, picture4, picture5, picture6, picture7, picture8, picture9, picture10, picture11, picture12, picture13, picture14, picture15, picture16];
init(cards);

function init(arr)
{
    shuffle(arr)
    for (i in arr)
    {
        document.getElementById("board").appendChild(createCard(arr[i],i));
    }
}

function shuffle(arr) {
  for (i=0; i<arr.length-1; i++)
    {
      const rndIndx = Math.floor(Math.random()*cards.length);
      const temp = cards[i];
      cards[i] = cards[rndIndx];
      cards[rndIndx] = temp;
    }
    return cards
  }
  

  let turnCounter = 0;


let playerNum = 3; // from localstorage;
document.getElementById("body").appendChild(playerBanner());


function playerBanner(){
  let playerBanner = document.createElement("div")

  let player0 = document.createElement("div")
  player0.id = "player0";
  let player1 = document.createElement("div")
  player1.id = "player1"
  let player2 = document.createElement("div")
  player2.id = "player2"

  let playerName0 = document.createElement("div")
  playerName0.id = "playerName0";
  // playerName0.innerText = localStorage...
  let playerName1 = document.createElement("div")
  playerName1.id = "playerName1";
  let playerName2 = document.createElement("div")
  playerName2.id = "playerName2";
  
  
  let newElement0 = document.createElement("div")
  newElement0.id = "newElement0"
  newElement0.innerText = 0;
  
  let newElement1 = document.createElement("div")
  newElement1.id = "newElement1"
  newElement1.innerText = 0;
  
  let newElement2 = document.createElement("div")
  newElement2.id = "newElement2"
  newElement2.innerText = 0;
  
    player0.appendChild(playerName0);
    player0.appendChild(newElement0);
  
    player1.appendChild(playerName1);
    player1.appendChild(newElement1);
  
    player2.appendChild(playerName2);
    player2.appendChild(newElement2);
  
  let playerDivs = [player0, player1, player2];

  for (i=0 ; i<playerNum ; i++) {
    playerDivs[i].children[0].innerText="stam masheho";  
    playerBanner.appendChild(playerDivs[i]);
  }
  

  return playerBanner;
}



function createCard(card,x)
{
   const newElement = document.createElement("div")
newElement.id="id"+x;
newElement.className= "card"
newElement.style.backgroundImage = "url("+card+")";
newElement.onclick= () => {onCardClick(card, "id"+x)} ;
return newElement;
}

// function flipCard(){
//   this.classList.toggle("flip")
// }

let counter =0;
let bool = false;
let firstCard=0;
let firstCardId = -1;
function onCardClick(cardTxt, id, player){

    document.getElementById(id).className ="card open"
   
    if (bool==false || id==firstCardId){
        firstCard=cardTxt;
        firstCardId=id
        bool = true;
        return
    }
    if (cardTxt==firstCard){ setTimeout(()=> {
    counter++;
    let card1="";
    card1=document.getElementById(id);
    card1.onclick = () =>{};
    card1.style.backgroundImage = "none"
    card1.className ="twin";
    card1="";

    let card2="";   
    card2 = document.getElementById(firstCardId)
    card2.onclick = () =>{};
    card2.style.backgroundImage = "none"
    card2.className ="twin";
    card2="";
        bool = false;
        let score = Number(document.getElementById(`newElement${turnCounter}`).innerText)
        document.getElementById(`newElement${turnCounter}`).innerText = score += 5;
        
          if (counter==8)
              { 
            alert("the game is over")
              } 
    return
    },1000);
    }
    if (cardTxt!==firstCard){
    setTimeout(() => {
        document.getElementById(id).className="card";
        document.getElementById(firstCardId).className = "card";
        bool = false;
        turnCounter = ( (turnCounter + 1) % playerNum);
        return
    }, 1000);
  }
}



  
resetBtn.addEventListener('click', () => {
  location.reload()
});


backMainBtn.addEventListener('click', () => {
  window.location.href="../Games portal/portal.html";
})