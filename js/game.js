class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.isStarted = false;

    }

    start() {
        this.isStarted = true;
        const startBtn = document.querySelector('.start_btn');
        const map = document.querySelector('.map');
        map.removeChild(startBtn);
    }

    render() {
        const map = document.querySelector('.map');

        map.style.width = this.width + 'px';
        map.style.height = this.height + 'px';

        const startBtn = document.querySelector('.start_btn');

        startBtn.addEventListener('click', () => { this.start() });
    }

    stop() {
        this.isStarted = false;
    }
    checkWin(treasure, hero, gameInterval) {
        if (treasure.x == hero.x && treasure.y == hero.y) {
            const victory = document.querySelector('.victory');
            victory.style.display = 'block';
            this.stop();
            clearInterval(gameInterval);
        }
    }

    checkLose(ghost, hero, gameInterval) {
        if (ghost.x == hero.x && ghost.y == hero.y) {
            const defeat = document.querySelector('.defeat');
            defeat.style.display = 'block';
            game.stop();
            clearInterval(gameInterval);
        }
    }

}

class Hero {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.element = document.querySelector('.hero');
    }

    render() {
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
    }

    move(key, game, treasure, gameInterval) {
        if (!game.isStarted) { return; }
        if ((key == 'w' || key == 'ArrowUp') && this.y > 0) {
            this.y -= 100;
        }
        if ((key == 's' || key == 'ArrowDown') && this.y < 500) {
            this.y += 100;
        }
        if ((key == 'a' || key == 'ArrowLeft') && this.x > 0) {
            this.x -= 100;
        }
        if ((key == 'd' || key == 'ArrowRight') && this.x < 700) {
            this.x += 100;
        }
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        game.checkWin(treasure, this, gameInterval);
    }
}

class Treasure {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.element = document.querySelector('.treasure');
    }

    render() {
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
    }
}

class Ghost {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.element = document.querySelector('.ghost');
    }
    render() {
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
    }
    moveToHero(hero) {
        let moveX = 0;
        let moveY = 0;
        //move to hero by X
        if (this.x > hero.x) {
            moveX = -1;
        }
        else if (this.x < hero.x) {
            moveX = 1;
        }
        else {
            moveX = 0;
        }
        // move to hero by Y
        if (this.y > hero.y) {
            moveY = -1;
        }
        else if (this.y < hero.y) {
            moveY = 1;
        }
        else {
            moveY = 0;
        }
        // compare moveX and moveY
        if (moveX == 0 && moveY != 0) {
            this.y += moveY * 100;
        }
        else if (moveX != 0 && moveY == 0) {
            this.x += moveX * 100;
        }
        else if (moveX != 0 && moveY != 0) {
            const direction = getRandom(0, 2);
            if (direction == 0) { this.x += moveX * 100; }
            else { this.y += moveY * 100; }
        }
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
    }
}

const game = new Game(800, 600);
game.render();

const hero = new Hero(100, 500);
hero.render();

const treasure = new Treasure(400, 0);
treasure.render();

const ghost = new Ghost(600, 200);
ghost.render();

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const gameInterval = setInterval(() => {

    if (!game.isStarted) { return; }
    ghost.moveToHero(hero);

    game.checkLose(ghost, hero, gameInterval);
    game.checkWin(treasure, hero, gameInterval);

}, 1200);

document.addEventListener('keyup', (e) => { hero.move(e.key, game, treasure, gameInterval) });


//setTimeout(() => { clearInterval(intervalId) }, 5000)




