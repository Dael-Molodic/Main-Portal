let playersNum;
let playerCount = 0;
let currentAvatar = 0;
let playerArr = [];

let avatars = [
    "img/1.png",
    "img/2.png",
    "img/3.png",
    "img/4.png",
    "img/5.png",
    "img/6.png",
    "img/7.png",
    "img/8.png",
    "img/10.png",
]

init();

// check on XMl


function init() {

    buttonInit();

    if (localStorage.playerArr != undefined) {

        playerArr = JSON.parse(localStorage.playerArr);
        avatars = JSON.parse(localStorage.availableAvatars);

        playersNum = playerArr.length;
        playerCount = playerArr.length;

        startGamesPortal()
        
    } else {

        setTimeout( PopUp, 200, ".main-popup");

    }

}

function PopUp(definer) {

    document.querySelectorAll(definer).forEach(e => {
        e.classList.toggle("active");
    })

}

function buttonInit() {
    document.getElementById("main-button").onclick = () => {
        let value = document.querySelector("#players-number input").value;

        if (Number(value) > 0 && Number(value) < 4) {

            playersNum = value;
            
            setTimeout( PopUp, 200, ".main-popup" );

            setTimeout( startNickname, 300);

            setTimeout( PopUp, 800, ".main-popup" );

        } else if (onlyTxt(value)) {

            playerArr[playerCount] = {nickname: value};

            setTimeout( PopUp, 200, ".main-popup" );

            setTimeout( ChooseAvatar, 300, value);

            setTimeout( PopUp, 800, ".main-popup" );

        }
    }
}

function startNickname() {
    
    document.querySelector("h2").innerText = `Player's number ${playerCount+1} nickname`;
    document.querySelector("#span").innerText = "nickname";

    let input =  document.querySelector("#players-number input")
    input.value = "";
    input.attributes[0].value = "text";
}

function ChooseAvatar(PlayerName) {

    document.querySelector("h2").innerText = `Hello ${PlayerName}, choose your avatar`;

    toggleInput("0", "none");

    createAvatar();

    createArrow();
}

function toggleInput(opacity, pointerEvents) {

    document.getElementById("main-button").style.opacity = opacity;
    document.getElementById("main-button").style.pointerEvents = pointerEvents;

    document.querySelector("#players-number input").style.opacity = opacity;
    document.querySelector("#players-number input").style.pointerEvents = pointerEvents;

    document.querySelector("#players-number span").style.opacity = opacity;
}

function createAvatar() {
    for (i=0 ; i<avatars.length ; i++) {

        const avatar = document.createElement("div");
        const avatarName = avatars[i];
        const index = i;

        avatar.id = index;
        avatar.className = "avatars r deleteAva";
        avatar.style.backgroundImage = `url("${avatarName}")`;
        avatar.onclick = () => {
            
            playerArr[playerCount].avatar = avatarName;

            setTimeout( PopUp, 200, ".main-popup" );

            setTimeout( () => {
                
                deleteAvatarAndArrow();
                avatars.splice(index, 1);
                playerCount++;
                toggleInput("1", "auto");
                startNickname();

                localStorage.availableAvatars = JSON.stringify(avatars);
                
            }, 400);

            setTimeout( () => {
                
                (playerCount == playersNum)
                ?  startGamesPortal()
                : PopUp(".main-popup");
                
            }, 800);
        }
      
        document.querySelector(".main-popup").appendChild(avatar);
    }
}

function createArrow() {
    let arrowContiner = document.createElement("div");
    arrowContiner.className = "arrow-continer deleteAva"

    let arrowR = document.createElement("div");
    arrowR.className = "arrow-r deleteAva";
    arrowR.onclick = () => {
        
        document.getElementById(currentAvatar).className = "avatars r deleteAva";

        currentAvatar = (currentAvatar + (avatars.length - 1)) % (avatars.length);

        document.getElementById(currentAvatar).className = "avatars center deleteAva";
        
        document.getElementById((currentAvatar + (avatars.length - 1)) % (avatars.length)).className = "avatars l deleteAva";
    }

    let arrowL = document.createElement("div");
    arrowL.className = "arrow-l deleteAva";
    arrowL.onclick = () => {
        
        document.getElementById(currentAvatar).className = "avatars l deleteAva";

        currentAvatar = (currentAvatar + 1) % (avatars.length);

        document.getElementById(currentAvatar).className = "avatars center deleteAva";
        
        document.getElementById((currentAvatar + (avatars.length - 2)) % (avatars.length)).className = "avatars r deleteAva";
    
    }

    arrowContiner.appendChild(arrowL);
    arrowContiner.appendChild(arrowR);
    
    document.getElementById(0).className = "avatars center deleteAva";
    document.getElementById((avatars.length - 1)).className = "avatars l deleteAva";

    document.querySelector(".main-popup").appendChild(arrowContiner);
}

function deleteAvatarAndArrow() {
    document.querySelectorAll(".deleteAva").forEach(v => v.style.opacity = "0");
    document.querySelectorAll(".deleteAva").forEach(v => v.remove());
    currentAvatar = 0;
}

function onlyTxt(Txt) {

    if(Txt == '' || Txt == null){
        return false;
    }

    for(i=0 ; i<Txt.length ; i++) {
        if(!(Txt[i].match(/[A-Z]/gi)) && Txt[i] != " "){
            return false;
        }  
    }
    
    return true;
}

function startGamesPortal() {

    localStorage.playerArr = JSON.stringify(playerArr);

    PopUp(".games");
    document.querySelector(".contain-games").style.pointerEvents = "auto";
    
    document.querySelector(".bottom-middle .games.up").onclick = () => {
        addPerson();
    }

    createPlayersBanner();

    createRecordsBanner();

    setGamesLink();

    setReviews();

}

function addPerson() {

    if (playerArr.length == 3) {

        PopUp(".deletePlayers");

        setTimeout(() => {
            PopUp(".deletePlayers");
        }, 1300)

        return;
    }
        
    PopUp(".games");
    PopUp(".records-banner");
    document.querySelector(".contain-games").style.pointerEvents = "none";
    document.querySelectorAll(".Players").forEach(v => v.remove());

    playersNum++;
        
    setTimeout( PopUp, 200, ".main-popup" );

    setTimeout( startNickname, 300);

}

function createPlayersBanner() {

    for (i=0 ; i<playerArr.length ; i++) {

        const index = i;
        const avatarName = playerArr[index].avatar;

        const player = document.createElement("div");
        player.className = "Players";
        player.id = `p${index}`;

        if (localStorage.getItem(`${playerArr[index].nickname}Score`) == undefined) {
            localStorage.setItem(`${playerArr[index].nickname}Score`, 0)
        }
        
        player.innerHTML = `<div>${playerArr[index].nickname}</div> <div id="scoer-div">${localStorage.getItem(`${playerArr[index].nickname}Score`)} points</div>`;

        const deletePlayer = document.createElement("div");
        deletePlayer.className = "deletePlayers";
        deletePlayer.id = `p_del${index}`;
        deletePlayer.onclick = () => {

            PopUp(".Players");
            setTimeout(() => {

                document.querySelectorAll(".Players").forEach(v => v.remove());
                playerArr.splice(index, 1);
                localStorage.playerArr = JSON.stringify(playerArr)
                
                
                avatars.push(avatarName);
                localStorage.availableAvatars = JSON.stringify(avatars);

                playersNum--;
                playerCount--;

                createPlayersBanner();

            },500)

        }
        
        const playerImg = document.createElement("div");
        playerImg.className = "playersImg";
        playerImg.id = `p_img${index}`;
        playerImg.style.backgroundImage = `url("${avatarName}")`;

        player.appendChild(playerImg);
        player.appendChild(deletePlayer);

        document.getElementById("players-banner").appendChild(player);

        
    }

    PopUp(".Players");
};

function createRecordsBanner() {

    let scoreArr = [];

    for(i in localStorage) {
        if (i.includes("Score")) {
            scoreArr.push({
                userName: i.slice(0, -5),
                Score: Number(localStorage.getItem(i))
            })
        }
    }

    scoreArr.sort((a,b) => b.Score - a.Score);

    document.getElementById("records-banner").children[1].innerHTML = `<div class="img" id="first"></div>`;
    document.getElementById("records-banner").children[2].innerHTML = `<div class="img" id="second"></div>`;
    document.getElementById("records-banner").children[3].innerHTML = `<div class="img" id="third"></div>`;
    
    if(scoreArr[0].Score) {
        for (i=0 ; i<3 ; i++) {
            document.getElementById("records-banner").children[i+1].innerHTML += `${scoreArr[i].userName} <span>${scoreArr[i].Score} points</span>`;
        }
    }

    PopUp(".records-banner");
}

function setGamesLink() {

    daelLink();
    chananelLink();
    hadarLink();
    nadavLink();
    amitLink();
    shiraLink();
    yairLink();
    yehoshua();
                    
}

//--------------Gamse link----------------------------

function daelLink() {
    document.querySelector(".bottom-left .games").addEventListener("dblclick", () => {

        if (playerArr.length == 0) {

            PopUp("#add-person-shadow");

            setTimeout(() => {
                PopUp("#add-person-shadow");
            }, 1300)
            
            return;
        }
            
        localStorage.playerArr = JSON.stringify(playerArr);
        window.location.href = "../Dael Molodic/homepage.html";
        
    })
}

function chananelLink() {

    document.querySelector(".up-left .games.left")
    .addEventListener("dblclick", () => {

        localStorage.playerArr = JSON.stringify(playerArr);
        window.location.href = "../memory_game_chananel/index.html";

    })

}

function hadarLink() {

    document.querySelector(".up-left .games.middle")
    .addEventListener("dblclick", () => {

        localStorage.playerArr = JSON.stringify(playerArr);
        window.location.href = "../memory game Hadar/index.html";

    })

}

function nadavLink() {

    document.querySelector(".up-left .games.right")
    .addEventListener("dblclick", () => {

        localStorage.playerArr = JSON.stringify(playerArr);
        window.location.href = "../memory_nadav/index.html";

    })

}

function  amitLink() {

    document.querySelector(".up-right .games.bottom")
    .addEventListener("dblclick", () => {

        localStorage.playerArr = JSON.stringify(playerArr);
        window.location.href = "../memory_AmitGlaicher/memory.open.html";

    })

}

function  shiraLink() {

    document.querySelector(".bottom-middle .games.middle")
    .addEventListener("dblclick", () => {

        localStorage.playerArr = JSON.stringify(playerArr);
        window.location.href = "../Shira_memoGame/index_memory.html";

    })

}

function  yairLink() {

    document.querySelector(".bottom-middle .games.bottom")
    .addEventListener("dblclick", () => {

        localStorage.playerArr = JSON.stringify(playerArr);
        window.location.href = "../yair/index.html";

    })

}

function  yehoshua() {

    document.querySelector(".bottom-right .games")
    .addEventListener("dblclick", () => {

        localStorage.playerArr = JSON.stringify(playerArr);
        window.location.href = "../yehoshua_memoGame/index1.html";

    })

}
//-------------------^^^------------------------------

function setReviews() {

    document.querySelectorAll(".stars").forEach(v => {
        v.addEventListener("click", e => {
            newRating(e.target);
        })
    })

    document.querySelectorAll(".stars").forEach(r => {

        currentStars(r);

        r.addEventListener('mouseover', (e) => {
            
            const revParent = e.target.parentElement;
            const starInx = [...revParent.children].findIndex(v => v.className == e.target.className);

            for (i=0 ; i<5 ; i++) {

                (i <= starInx)
                ? revParent.children[i].style.backgroundImage = `url("img/grade_FILL1_wght500_GRAD0_opsz40.svg")`
                : revParent.children[i].style.backgroundImage = `url("img/grade_FILL0_wght500_GRAD0_opsz40.svg")`;
            }
        })

        r.addEventListener('mouseleave', (e) => {

            currentStars(e.target);
            
        })
    })

}

function currentStars(elemnt) {
    const revParent = elemnt.parentElement;

    const starNum = Number( localStorage.getItem(`${revParent.className}`))  / Number( localStorage.getItem(`${revParent.className}Counter`) );

    setStars(revParent, starNum);
}

function newRating(starElement) {
   
    const reviewParent = starElement.parentElement;
    const selectStarNumber = Number(starElement.className.slice(7));

    localStorage.setItem(`${reviewParent.className}`, (Number(localStorage.getItem(`${reviewParent.className}`)) + selectStarNumber) );
    localStorage.setItem(`${reviewParent.className}Counter`, (Number(localStorage.getItem(`${reviewParent.className}Counter`)) + 1) );

    const currentStarsNumber = Number( localStorage.getItem(`${reviewParent.className}`))  / Number( localStorage.getItem(`${reviewParent.className}Counter`) )

    setStars(reviewParent, currentStarsNumber);
    
}

function  setStars(reviewParent, currentStarsNumber) {
    for (i=1 ; i<6 ; i++) {

        let starBackground;

        if (i <= currentStarsNumber) {
            starBackground = "img/grade_FILL1_wght500_GRAD0_opsz40.svg";
        } else if (i<=(currentStarsNumber + 0.5)) {
            starBackground = "img/star_half_FILL1_wght500_GRAD0_opsz40.svg";
        } else {
            starBackground = "img/grade_FILL0_wght500_GRAD0_opsz40.svg";
        }

        reviewParent.children[i-1].style.backgroundImage = `url("${starBackground}")`;

        
    }

    (isNaN(currentStarsNumber))
    ? reviewParent.children[5].innerText = `(No rating yet)`
    : reviewParent.children[5].innerText = `(${currentStarsNumber.toFixed(1)} of 5)`;

}

function resetPortal() {
    localStorage.removeItem("playerArr");
    window.location.href = "file:///C:/Users/%D7%A0%D7%A2%D7%9E%D7%99/Desktop/%D7%93%D7%A2%D7%90%D7%9C%20%D7%AA%D7%9B%D7%A0%D7%95%D7%AA/Portfolio/Games%20portal/portal.html"
}