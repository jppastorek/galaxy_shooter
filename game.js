const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;
const background = new Image();
background.src = "./space.jpeg";
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

const getRandomX = () => {
    return Math.floor(Math.random() * CANVAS_WIDTH-30);
}
const getRandomSpeed = (max) => {
    return Math.floor(Math.random() * max + 1);
}
const enemiesArray = [];
const friction = 0.98;
const keys = [];
const player1Image = new Image();
player1Image.src = "./spaceship2.png";

const laser = {
    x: 0,
    y: 0,
    width: 2,
    height: 10,
    color: "red",
    speed: 20,
    active: false,
    draw: function(){
        ctx.fillStyle = laser.color;
        ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
        laser.y -= laser.speed;
        if (laser.y < 0) {
            laser.active = false;
        }
    }
}

const player1 = {
    x: CANVAS_WIDTH/2 - 30,
    y: CANVAS_HEIGHT - 60,
    velX: 0,
    velY: 0,
    width: 50,
    height: 100,
    color: "black",
    speed: 3,
    image: player1Image,
    draw: function(){
        ctx.fillStyle = player1.color;
        ctx.drawImage(player1.image, player1.x, player1.y, 50, 100)
        if (keys["ArrowLeft"]) {
            if (player1.velX > -player1.speed){
                player1.velX--;
            }
        }
        if (keys["ArrowRight"]) {
            if (player1.velX < player1.speed){
                player1.velX++;
            }
        }
        if (keys["ArrowUp"]) {
            if (player1.velY > -player1.speed){
                player1.velY--;
            }
        }
        if (keys["ArrowDown"]) {
            if (player1.velY < player1.speed){
                player1.velY++;
            }
        }
        player1.velX *= friction;
        player1.x += player1.velX;
        player1.velY *= friction;
        player1.y += player1.velY;
        if (player1.x >= CANVAS_WIDTH-player1.width){
            player1.x = CANVAS_WIDTH-player1.width;
        }else if (player1.x <= 0) {
            player1.x = 0;
        }
        if (player1.y >= CANVAS_HEIGHT-player1.height){
            player1.y = CANVAS_HEIGHT-player1.height;
        }else if (player1.y <= 0) {
            player1.y = 0;
        }
        if (keys[" "]) {
            player1.fireLaser();
        }

    },
    fireLaser: function(){
        laser.active = true;
        laser.x = player1.x + player1.width/2;
        laser.y = player1.y;
    }
}

class Enemy {
    constructor(index){
        this.x = getRandomX();
        this.y = 0;
        this.width = 40;
        this.height = 30;
        this.maxSpeed = 5;
        this.speed = getRandomSpeed(this.maxSpeed);
        this.color = "green";
        this.image = new Image();
        this.image.src = "./ufo.png";
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.y += this.speed;
        if (this.y > CANVAS_HEIGHT-30) {
            this.y = 0;
            this.speed = getRandomSpeed(this.maxSpeed);
            this.x = getRandomX();
        }
    }
}

const generateEnemies = (numberOfEnemies) => {
    for (let i = 0; i < numberOfEnemies; i++) {
        enemiesArray.push(new Enemy());
    }
}


const updateGameArea = () => {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.drawImage(background,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    player1.draw();
    laser.draw();
    enemiesArray.forEach(enemy => {
        enemy.draw();
        if (laser.active && laser.x < enemy.x + enemy.width && laser.x + laser.width > enemy.x && laser.y < enemy.y + enemy.height && laser.y + laser.height > enemy.y){
            enemiesArray.splice(enemiesArray.indexOf(enemy), 1);
            laser.active = false;
        }
        if (player1.x < enemy.x + enemy.width && player1.x + player1.width > enemy.x && player1.y < enemy.y + enemy.height && player1.y + player1.height > enemy.y){
            alert("Game over!");
        }
    });
    requestAnimationFrame(updateGameArea);
}


document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    delete keys[e.key];
});

startButton.addEventListener("click", () => {
    generateEnemies(5);
});

resetButton.addEventListener("click", () => {
    enemiesArray = [];
    updateGameArea();
});

window.addEventListener("load", () => {
    updateGameArea();
})
