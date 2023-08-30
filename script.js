"use strict";
let playing = true;
let randomDiceRoll = Math.floor(Math.random() * 6) + 1;

// players
let player1 = document.querySelector(".player--0");
let player2 = document.querySelector(".player--1");

// current score
let currentScore = 0;
let current0El = document.getElementById("current--0");
let current1El = document.getElementById("current--1");

// reset and select score
let score0El = document.querySelector("#score--0");
// let score0El = document.getElementById("score--0");                ///another way
let score1El = document.getElementById("score--1");
score0El.textContent = 0;
score1El.textContent = 0;

document.querySelector(".dice").style.display = "none";

// switch fun
const switchPlayer = function () {
    currentScore = 0;
    if (
        player1.classList.contains("player--active") ||
        score1El.textContent >= 100
    ) {
        player1.classList.remove("player--active");
        player2.classList.add("player--active");
        current0El.textContent = 0;
    } else if (
        player2.classList.contains("player--active") ||
        score0El.textContent >= 100
    ) {
        player2.classList.remove("player--active");
        player1.classList.add("player--active");
        current1El.textContent = 0;
    }
    // if(score0El.textContent >=100 ||score1El.textContent >=100);
};

document.querySelector(".btn--roll").addEventListener("click", function () {
    if (playing) {
        randomDiceRoll = Math.floor(Math.random() * 6) + 1;
        document.querySelector(".dice").style.display = "block";
        document
            .querySelector(".dice")
            .setAttribute("src", `./dice-${randomDiceRoll}.png`);

        if (randomDiceRoll != 1) {
            currentScore += randomDiceRoll;
            if (player1.classList.contains("player--active")) {
                current0El.textContent = currentScore;
            } else if (player2.classList.contains("player--active")) {
                current1El.textContent = currentScore;
            }
        } else {
            // switch player if dice is one
            // if (player1.classList.contains("player--active")) {
            //     player1.classList.remove("player--active");
            //     player2.classList.add("player--active");
            //     current0El.textContent = 0;
            // } else if (player2.classList.contains("player--active")) {
            //     player2.classList.remove("player--active");
            //     player1.classList.add("player--active");
            //     current1El.textContent = 0;
            // }
            switchPlayer();
        }
    }
});

// hold button

document.querySelector(".btn--hold").addEventListener("click", function () {
    if (player1.classList.contains("player--active")) {
        let score0ElInt = parseInt(score0El.textContent);
        score0ElInt += parseInt(current0El.textContent);
        score0El.textContent = score0ElInt;
        currentScore = 0;
        current0El.textContent = currentScore;
        playerWins(score0El);
    } else if (player2.classList.contains("player--active")) {
        let score1ElInt = parseInt(score1El.textContent);
        score1ElInt += parseInt(current1El.textContent);
        score1El.textContent = score1ElInt;
        currentScore = 0;
        current1El.textContent = currentScore;
        playerWins(score1El);
    }
});

// player win
const playerWins = function (i) {
    if (i.textContent >= 100) {
        document
            .querySelector(".player--active")
            .classList.add("player--winner");
        document
            .querySelector(".btn--hold")
            .addEventListener("click", function (e) {
                e.preventDefault();
            });
        playing = false;
    } else {
        switchPlayer();
    }
};

// New game button
document.querySelector(".btn--new").addEventListener("click", function () {
    document.querySelector(".dice").style.display = "none";
    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    playing = true;
    document
        .querySelector(".player--active")
        .classList.remove("player--winner");
    player1.classList.add("player--active");
    player2.classList.remove("player--active");
});
