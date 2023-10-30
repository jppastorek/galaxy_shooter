const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const friction = 0.98;
const keys = [];

const player = {
    x: CANVAS_WIDTH/2-30,
    y: CANVAS_HEIGHT/2-30,
    width: 50,
    height: 50,
    speed: 2,
    velX: 0,
    velY: 0,
    draw: function() {
        ctx.fillRect(player.x, player.y, player.width, player.height);
        if (keys["ArrowLeft"]) {
            if (player.velX > -player.speed){
                player.velX--;
            }
        }
        if (keys["ArrowRight"]) {
            if (player.velX < player.speed){
                player.velX++;
            }
        }
        if (keys["ArrowUp"]) {
            if (player.velY > -player.speed){
                player.velY--;
            }
        }
        if (keys["ArrowDown"]) {
            if (player.velY < player.speed){
                player.velY++;
            }
        }
        player.velX *= friction;
        player.x += player.velX;
        player.velY *= friction;
        player.y += player.velY;
    }
}

const updateGameArea = () => {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    player.draw();
    requestAnimationFrame(updateGameArea);
};

updateGameArea();

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    console.log(e.key);
});

document.addEventListener("keyup", (e) => {
    delete keys[e.key];
})