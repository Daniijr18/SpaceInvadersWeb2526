var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
document.body.appendChild(canvas);

var bgPattern;
var tileReady = false;
var tileImage = new Image();
tileImage.onload = function () {
    tileReady = true;
    bgPattern = ctx.createPattern(tileImage, "repeat");
};
tileImage.src = "Images/Background.png";

var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

var gameObjects = [];

function addGameObject(go) {
    gameObjects.push(go);
}

function removeGameObject(go){
    let index = gameObjects.indexOf(go);
    gameObjects.splice(index,1);
    //index = m_Bricks.indexOf(go);
    //m_Bricks.splice(index,1);
}

function start() {
    for (let go of gameObjects) {
        go.start();
    }
}

let gameLifePoints = 3;
let timeToReload = 3;
function update(dt) {
    if(gameLifePoints>0){
        for (let go of gameObjects) {
		    go.update(dt);
        }
    }
    else{
        timeToReload -= dt;
        if(timeToReload<0)
        {
            location.reload();
        }
    }
}
function render() {
    // Background
    if (tileReady) {
        ctx.fillStyle = bgPattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Render in z-order
    gameObjects.sort((a, b) => a.z - b.z);

    for (let go of gameObjects) {
		go.render(ctx);
    }
    if(gameLifePoints<=0)
    {
        ctx.fillStyle = "rgb(250,0,0)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "middle"
        ctx.textBaseline = "top"
        ctx.fillText("YOU LOST", canvas.width/2, canvas.height/2);
    }
}
function loadImage(src,callback)
{
	const img = new Image();
    img.onload = () => callback(img);
    img.src = src;
}
function collisionRectCollision(circle, rect)
{
    const cx = circle.x + circle.width/2;
    const cy = circle.y + circle.height/2;
    const r = circle.width/2;

    const closestX = Math.max(rect.x, Math.min(cx, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(cy, rect.y + rect.height));
    const dx = cx - closestX;
    const dy = cy - closestY;
    return (dx * dx + dy * dy) <= (r * r);
}
var lastTime = 0;

function main(timestamp) {
    if (!lastTime) lastTime = timestamp;
    var dt = (timestamp - lastTime) / 1000;

    update(dt);
    render();

    lastTime = timestamp;
    requestAnimationFrame(main);
}
let m_SpaceShip = new SpaceShip();
addGameObject(m_SpaceShip);
start();
requestAnimationFrame(main);