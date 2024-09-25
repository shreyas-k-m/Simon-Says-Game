let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelUp();  // Start by calling levelUp
    }
});


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;  // Increment level
    h2.innerText = `Level ${level}`;  // Update h2 text with new level

    // Generate a random button flash
    let ranIdx = Math.floor(Math.random() * 4);  // Fix range to 0-3
    let randColor = btns[ranIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(ranIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);  // Flash the selected button
}

function checkAns(idx) {
    // console.log("curr level : ",level)

    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);
        }
    } else {
        if (level > highScore) {
            highScore = level; // Update high score if the current level is higher
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> (High Score: ${highScore})<br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click",btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
