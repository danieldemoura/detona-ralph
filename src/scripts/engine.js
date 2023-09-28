const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector("#enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector(".lives"),
    },
    values: {
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currentTime: 30,
        lives: 3,
    },
    actions: {
        timeId: setInterval(randomSquare, 500),
        countDownTimerId: setInterval(countDown, 1000),
    }

}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
       
        alert("GAME OVER! Seu tempo acabou a sua pontuação foi " + state.values.result);
        state.values.currentTime = 30;
        state.values.lives--;
        state.values.result = 0;

        state.view.score.textContent = state.values.result;
        state.view.lives.textContent = "x" + state.values.lives;
    }

    if(state.values.lives === 0) {
        clearInterval(state.actions.timeId);
        clearInterval(state.actions.countDownTimerId);
    }
}

function playSound() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach(square => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                if(state.values.lives > 0) {
                    state.values.result++
                    state.view.score.textContent = state.values.result;
                    state.values.hitPosition = null;
                    playSound();                
                }
            }
        })
    })
}

function initialize() {
    addListenerHitBox();
}

initialize()