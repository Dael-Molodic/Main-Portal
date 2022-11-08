const selectBox = document.querySelectorAll(".select-box");
const selected = document.querySelectorAll(".selected");

const optionsContainer = document.querySelectorAll(".options-container");
const optionListCard = document.querySelectorAll(".option.card");
const optionListPlayer = document.querySelectorAll(".option.player");
const optionListType = document.querySelectorAll(".option.type");



document.addEventListener("DOMContentLoaded", () => {

    startHomePage(selectBox);
    
    selectOption(optionListCard, 0);
    selectOption(optionListPlayer, 1);
    selectOption(optionListType, 2);

    if (localStorage.playerArr != undefined) {
        setPortalConction();
    }
 
});


function startHomePage(arr){
    for(i=0 ; i<arr.length ; i++){
        selectBoxEvents(arr, Number(i), "mouseenter");
        selectBoxEvents(arr, Number(i), "mouseleave");
    }
}

function selectBoxEvents(elemntArr, elemntNum, Type) {
    
    elemntArr[elemntNum].addEventListener(Type, () => {

        (Type == "mouseenter")
        ? optionsContainer[elemntNum].classList.add("active")
        : optionsContainer[elemntNum].classList.remove("active");

        optionsContainer[((elemntNum + 1) % elemntArr.length)].classList.remove("active");
        optionsContainer[((elemntNum + 2) % elemntArr.length)].classList.remove("active");
    })
}

function selectOption(arr, boxNum) {
    
    arr.forEach (e => {
        e.addEventListener("click", () => {
           
            selected[boxNum].innerHTML = e.querySelector("label").innerHTML;
            optionsContainer[boxNum].classList.remove("active");
            e.querySelector("input").checked = true;

            (boxNum==1) ? renderUserName(Number(e.querySelector("input").value)):null;

            selected[boxNum].classList.remove("red-border");
        })
    }) 
}


function setPortalConction() {

    const playerArr = JSON.parse(localStorage.playerArr);
        
    const optionElm = optionListPlayer[playerArr.length - 1];

    selected[1].innerHTML = optionElm.querySelector("label").innerHTML;
    optionElm.querySelector("input").checked = true;

    renderUserName(Number(optionElm.querySelector("input").value));

    enterNickname(playerArr);

    preventChanges(playerArr);

}

function renderUserName(userNum) {

    document.querySelector(".user-container").innerHTML = "";

    for (i=0 ; i<userNum ; i++) {

        let html = 

        `<div id="user-name">
            <input type="text" name="userName${i+1}" id="user-name-input" required>
            <span id="span">Nickname ${i+1}</span>
        </div>`

        document.querySelector(".user-container").innerHTML += html;

    }

}

function enterNickname(playerArr) {

    for (i=0 ; i<playerArr.length ; i++) {

        document.querySelector(".user-container").children[i].children[0].value = playerArr[i].nickname;
    
    }

}

function preventChanges(playerArr) {
    
    for (i=0 ; i<playerArr.length ; i++) {

        document.querySelector(".user-container").children[i].children[0].readOnly = true;
    
    }

    document.querySelectorAll("#span").forEach(v => v.classList.add("active"));

    selectBox[1].style.opacity = "0";
    selectBox[1].style.pointerEvents = "none";
    
    document.getElementById("categories-container").children[1].style.opacity = "0";

}

function checkVal() {

    selectBox.forEach(v => {
        (v.querySelector("input").checkValidity())
        ? v.querySelector(".selected").classList.remove("red-border")
        : v.querySelector(".selected").classList.add("red-border");
    });

}

function backToPortal() {
    window.location.href = "../Games portal/portal.html";
}