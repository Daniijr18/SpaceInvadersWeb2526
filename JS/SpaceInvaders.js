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
}
//Variables
let gameLifePoints = 3;
let timeToReload = 3;
let invadersShootCooldown = 0;
function start() {
    invadersShootCooldown = 0;
    for (let go of gameObjects) {
        go.start();
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
    ctx.fillStyle = "rgb(255,255,255)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseLine = "top";
	ctx.fillText("Score: " + numInvadersDead, 32, 32);
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
let m_SpaceShip = new SpaceShip(canvas.width/2,canvas.height/1.4,0);
addGameObject(m_SpaceShip);

//Funcionalidades de invaders
let invaders = []; //Se crea un array para los invaders
let frontInvaders = []; //Se crea un array para los invaders que pueden disparar
let numInvadersDead = 0;
let needsToChangeDirection = false;
let numInvaders = 55;
let movementY = 20;
let hasReachTheFloor = false;



function createInvaders()
{
    //Parametros generales
    let invaderScale = 1.8 
    let numberOfAliensRow = 11
    let spaceBetweenRows = 50;
    let displacementY = 40;
    let spaceBetweenInvaders = 68;
    let spawnSpaceX = 375;

    //Parametros para el invasor A
    let invaderAWidth = 16 * invaderScale;
    let invaderAHeight = 16 * invaderScale;
    let numRowsinvaderA = 1;

    //Parametros de la posicion del invasor A
    let spaceBetweenInvadersA = spaceBetweenInvaders - 2 * 16.5;
    let displacementXA = spawnSpaceX - 16; //Se asigna espacio del primer cuadrante

    //Colocar invasores A en su posicion
    for(let rowA = 0; rowA< numRowsinvaderA ; rowA++)
    {
        for(let colA = 0; colA < numberOfAliensRow; colA++)
        {
            const x = colA * (invaderAWidth + spaceBetweenInvadersA) + displacementXA
            const y = rowA  * (invaderAHeight + spaceBetweenRows) + displacementY
            const invader = new Invader(x, y, invaderScale, rowA);
            invader.row = rowA;
            invader.column = colA;
            invaders.push(invader)
            addGameObject(invader)
        }
    }

    //Parametros para el invasor B
    let invaderBWidth = 22 * invaderScale;
    let invaderBHeight = 16 * invaderScale;
    let numRowsinvaderB = 2;

    //Parametros de la posicion del invasor B
    let spaceBetweenInvadersB = spaceBetweenInvaders - 2 * 22;
    let displacementXB = spawnSpaceX - 22; //Se asigna espacio del primer cuadrante

    //Colocar invasores B en su posicion
    for(let rowB = 0; rowB< numRowsinvaderB; rowB++)
    {
        for(let colB = 0; colB < numberOfAliensRow; colB++)
        {
            const x = colB *(invaderBWidth + spaceBetweenInvadersB) + displacementXB
            const y = (rowB + 1) *(invaderBHeight + spaceBetweenRows) + displacementY //Le sumamos a rowC 1 lineas, ya que empieza en la linea 1 (empezando desde el 0)
            const invader = new Invader(x, y, invaderScale, rowB+1);
            invader.row = rowB + 1;
            invader.column = colB;
            invaders.push(invader)
            addGameObject(invader)
        }
    }

    //Parametros para el invasor C
    let invaderCWidth = 24 * invaderScale;
    let invaderCHeight = 16 * invaderScale;
    let numRowsinvaderC = 2;
    //Parametros de la posicion del invasor C
    let spaceBetweenInvadersC = spaceBetweenInvaders - 2 * 24;
    let displacementXC = spawnSpaceX -  24; //Se asigna espacio del primer cuadrante

    //Colocar invasores C en su posicion
    for(let rowC = 0; rowC< numRowsinvaderC; rowC++)
    {
        for(let colC = 0; colC < numberOfAliensRow; colC++)
        {
            const x = colC *(invaderCWidth + spaceBetweenInvadersC) + displacementXC
            const y = (rowC + 3) *(invaderCHeight + spaceBetweenRows) + displacementY //Le sumamos a rowC 3 lineas, ya que empieza en la linea 3 (empezando desde el 0)
            const invader = new Invader(x, y, invaderScale, rowC+3);
            invader.row = rowC + 3;
            invader.column = colC;
            invaders.push(invader)
            addGameObject(invader)
        }
    }

}

createInvaders();
let shields = [];
function CreateShields()
{
    let shieldScale = 2;
    let shieldWidth = 48 * shieldScale; 
    let spaceBetweenShields = canvas.width/4; 
    let shieldsNum = 4;
    for(let i = 0; i<shieldsNum; i++)
    {
        const x = i *(shieldWidth + spaceBetweenShields);
        const shield = new Shield(x, canvas.height/1.4, shieldScale, i+3, ctx);
        shields.push(shield);
        addGameObject(shield);
    }
}
function GetFrontInvaders()
{
    let rowsNum = 5;
    let colNum = 11;
    let currentFrontInvaders = [];

    for (let col = 0; col < colNum; col++) {
        let frontAliveInvader = null;
        for (let row = rowsNum - 1; row >= 0; row--) {
            let currentInvader = null;
            for(var i=0; i<invaders.length;i++)
            {
                if(
                    invaders[i].column == col &&
                    invaders[i].row == row &&
                    invaders[i].isAlive
                )
                {
                    currentInvader = invaders[i];
                }
            }
            if (currentInvader) {
                frontAliveInvader = currentInvader;
                break;
            }
        }
        if (frontAliveInvader) {
            currentFrontInvaders.push(frontAliveInvader);
        }
    }
    return currentFrontInvaders; 
}
CreateShields();
function update(dt) 
{
    invadersShootCooldown -= dt;
    if(gameLifePoints>0)
    {
        for (let go of gameObjects) 
        {
		    go.update(dt);
        }
        if (needsToChangeDirection)
        {
            for (let invader of invaders)
            {
                if (invader.isActive && invader.isAlive)
                {
                    invader.y += movementY;             
                    invader.movementX *= -1;
                }   
            }
            needsToChangeDirection = false;
        }
        if(invadersShootCooldown <= 0)
        {
            frontInvaders = GetFrontInvaders();
            let invaderShooterIndex = Math.floor(Math.random() * frontInvaders.length);
            frontInvaders[invaderShooterIndex].invaderShoot();
            invadersShootCooldown = 1.5;
        }
        if(hasReachTheFloor)
        {
            gameLifePoints = 0;
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
start();
requestAnimationFrame(main);