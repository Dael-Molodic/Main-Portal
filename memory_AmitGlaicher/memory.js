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

function createCard(card,x)
{
   const newElement = document.createElement("div")
newElement.id="id"+x;
newElement.className= "card"
newElement.style.backgroundImage = "url("+card+")";
newElement.onclick= () => {onCardClick(card, "id"+x)} ;
return newElement;
}

function flipCard(){
  this.classList.toggle("flip")
}


var counter =0;
let bool = false;
let firstCard=0;
let firstCardId = -1;
function onCardClick(cardTxt, id){

    document.getElementById(id).className ="card open"
   
    if (bool==false || id==firstCardId){
        firstCard=cardTxt;
        firstCardId=id
        bool = true;
        return
    }
    if (cardTxt==firstCard){ setTimeout(()=> {
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
        counter++;
        console.log(counter);
    return
    },1000);
    }
    if (cardTxt!==firstCard){
    setTimeout(() => {
        document.getElementById(id).className="card";
        document.getElementById(firstCardId).className = "card";
        bool = false;
        return
    }, 1000);
  }
}
if (counter==8)
  {
alert("the game is over")
confirm("do you want to play again?") 
  } 

  
resetBtn.addEventListener('click', () => {
  location.reload()
});