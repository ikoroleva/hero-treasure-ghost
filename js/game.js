let gameStarted = false;

let heroX = 100;
let heroY = 500;
const hero = document.querySelector('.hero');
hero.style.top = heroY + 'px';
hero.style.left = heroX + 'px';

let ghostX = 600;
let ghostY = 200;
const ghost = document.querySelector('.ghost');
ghost.style.top = ghostY + 'px';
ghost.style.left = ghostX + 'px';

let treasureX = 400;
let treasureY = 0;
const treasure = document.querySelector('.treasure');
treasure.style.top = treasureY + 'px';
treasure.style.left = treasureX + 'px';

//const map = document.querySelector('.map');
//console.log(map);

const startGame = () => {

    const startBtn = document.querySelector('.start_btn');
    startBtn.parentNode.removeChild(startBtn);

    gameStarted = true;

}

const moveHero = (e) => {
    //console.log(e);
    if (!gameStarted) { return; }

    if ((e.key == 'w' || e.key == 'ArrowUp') && heroY > 0) {
        heroY -= 100;
    }

    if ((e.key == 's' || e.key == 'ArrowDown') && heroY < 500) {
        heroY += 100;
    }

    if ((e.key == 'a' || e.key == 'ArrowLeft') && heroX > 0) {
        heroX -= 100;
    }
    if ((e.key == 'd' || e.key == 'ArrowRight') && heroX < 700) {
        heroX += 100;
    }
    hero.style.left = heroX + 'px';
    hero.style.top = heroY + 'px';

    checkWin();
    // console.log(ghostX);
    // console.log(heroX);
}

// const moveAny = (who, whereX, whereY) => {
//     if (who == 'hero') {
//         hero.style.left = whereX * 100 + 'px';
//         hero.style.top = whereY + 'px';
//     }
// }

document.addEventListener('keyup', moveHero);
document.addEventListener('click', startGame);



const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const moveToHero = () => {
    let moveX = 0;
    let moveY = 0;
    //move to hero by X
    if (ghostX > heroX) {
        moveX = -1;
    }
    else if (ghostX < heroX) {
        moveX = 1;
    }
    else {
        moveX = 0;
    }
    // move to hero by Y
    if (ghostY > heroY) {
        moveY = -1;
    }
    else if (ghostY < heroY) {
        moveY = 1;
    }
    else {
        moveY = 0;
    }

    // compare moveX and moveY
    if (moveX == 0 && moveY != 0) {
        ghostY += moveY * 100;
    }
    else if (moveX != 0 && moveY == 0) {
        ghostX += moveX * 100;
    }
    else if (moveX != 0 && moveY != 0) {
        const direction = getRandom(0, 2);
        if (direction == 0) { ghostX += moveX * 100; }
        else { ghostY += moveY * 100; }
    }
}

const checkWin = () => {
    if (treasureX == heroX && treasureY == heroY) {
        const victory = document.querySelector('.victory');
        victory.style.display = 'block';

        gameStarted = false;
        clearInterval(gameInterval);

    }
}

const checkLose = () => {
    if (ghostX == heroX && ghostY == heroY) {
        const defeat = document.querySelector('.defeat');
        defeat.style.display = 'block';

        gameStarted = false;
        clearInterval(gameInterval);
    }
}

const gameInterval = setInterval(() => {

    if (!gameStarted) { return; }
    moveToHero();

    ghost.style.top = ghostY + 'px';
    ghost.style.left = ghostX + 'px';

    checkLose();
    checkWin();

}, 200);

//setTimeout(() => { clearInterval(intervalId) }, 5000)




