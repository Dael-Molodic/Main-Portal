const cards= ["מכבים","מכבים","פך שמן","פך שמן","חנוכה","חנוכה"]//,"חשמונאים","חשמונאים"]
// const cards= ["ת","ת","ה","ה","ל","ל"]
let degel= "firstCard" 
let firstCard=null
let arrCards=[]
let arrCardsDif={}
arrCardsDif.innerText=""

function fCardDown(id){
CardDown= document.getElementById(id)
if(CardDown.className!="card cardOpen"){
degel="firstCard" 
return}
}

function fCardDownEvery(){//debugger
    degel=4
    for(id=0 ; id<cards.length ;id++){
    fCardDown(id)
}}

function shufle (cards){
for(cardIndx in cards){
     const rndIndx= Math.floor(Math.random()*cards.length)
     const temp= cards[cardIndx]
     cards[cardIndx]= cards[rndIndx]
     cards[rndIndx]= temp
     }
    }  
// 
// let Card= document.getElementById(0)



function cardDown (id){
    let Card= document.getElementById(id)
    // כל התנאים שפה- מראים שאנחנו בקלף הראשון של התור
//             הקלף גלוי
    if(!Card.innerText=="" && !arrCards.includes(Card) // לא קלף שכבר נפתח חיובי
    // &&arrCardsDif.innerText=="" // לא קלף שכבר נפתח שלילי ועוד לא נסגר
    ){
    degel=2}
    // console.log(id);
    // console.log(degel);
}

function cardCliked(e){
    // console.log(e);
    // האם זה הכרטיס הראשון
    // for(id=0 ; id<cards.length ;id++){
    //     cardDown(id)
    // }

if(degel=="firstCard")
{
// לפתוח את הכרטיס
    e.target.innerText=cards[e.target.id]
// להוסיף קלאס: הקפה בכחול
e.target.classList.add("cardOpenOne")
// להוסיף קלאס לקלף- תמונה
e.target.classList.add("card"+e.target.id)
    // לשמור את הכרטיס
    firstCard=e.target
// לעבור ללחיצה 2
    degel="secondCard"
return}
// המשך- אם לא הקלף הראשון

if(degel=="secondCard"){//debugger
    degel="3Card"
    e.target.innerText=cards[e.target.id]
//  אם לא נכון
    if(cards[e.target.id]!=firstCard.innerText &&
         e.target.id!=firstCard.id )
         {//debugger
            // arrCardsDif=(firstCard)
            // degel=3
setTimeout(()=>{ 
    e.target.innerText=""
    firstCard.innerText=""
    degel="firstCard"
//להסיר את הקלאס
firstCard.classList.remove("cardOpenOne")
}
    ,1000)

    
}
// אם נכון
else if(cards[e.target.id]==firstCard.innerText &&
    e.target.id!=firstCard.id){
        firstCard.classList.remove("cardOpenOne")
        arrCards.push(firstCard,e.target)

firstCard.classList.add("cardOpen")
e.target.classList.add("cardOpen")

        degel="firstCard"
        fCardDownEvery()
        if(degel==4){ 
            const End= document.createElement("div")
           End.innerText="כל הכבוד!!"
           End.id= "end"
        //    End.className="card"
        //    End.addEventListener("click" , cardCliked)
        board.appendChild(End)
           }

    }
    
            
       return }
       else if(degel=="3Card"){return}
       
        }
            



function createCard (crd,idx){
    const cardElement= document.createElement("div")
    // cardElement.innerText=crd
    cardElement.id= idx
    cardElement.className="card"
    cardElement.addEventListener("click" , cardCliked)
return cardElement
}

function init(){
    shufle(cards)
    const board= document.getElementById("board")
    for(idx in cards){
        const newCard = createCard(cards[idx],idx)
        board.appendChild(newCard)
    }
}

init()

// const End= document.createElement("div")
// End.innerText="כל הכבוד!!"
// End.id= "end"
// // End.className="card"
// //    End.addEventListener("click" , cardCliked)
// board.appendChild(End)

// class= cars  id=0


// const div1= document.getElementById(0)

// div1.addEventListener("click", (e)=>{console.log("onclick")})






// const div1= document.getElementById("d")


// div1.innerText= "i am new div"

// const newEl = document.createElement("div")
// newEl.innerText="this JS hi"
// newEl.id="yair"









// div1.appendChild(newEl)
// function createCard(crd,idx){
//     const 

// }