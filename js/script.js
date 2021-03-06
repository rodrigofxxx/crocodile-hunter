let canvas = document.getElementById('area');
let ctx = canvas.getContext('2d');

const gameArea = {
    frames: 0,
    level: 1,
    speed: 5,
    crocs: [],
    score: 0,
    drawScore: function() {
        ctx.font = '25px arial';
        ctx.fillStyle = 'white'
        ctx.fillText(`Score ${this.score} |`, 20, 670);
        ctx.fillText(`Your target is: 200`, 170, 670);
    },
    start: function (){
        this.interval = setInterval(updateArea, 20);
    }
};

class Background {
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.land = 200
        this.imgLand = new Image()
        this.imgLand.src = './styles/sand.png'
        this.imgWater = new Image()
        this.imgWater.src = './styles/water.png'
    }
    draw(){
        ctx.drawImage(this.imgWater, this.x, this.y, this.width, this.height-this.land);
        ctx.drawImage(this.imgLand, this.x, this.height-this.land, this.width, this.land);
    }
}

let background = new Background()

function clearArea () {
    ctx.clearRect(0, 0, 400, 700);
}

class Croc {

    constructor(posX, posY){
        this.x = posX
        this.y = posY
        this.width = 50
        this.height = 50
        this.img = new Image()
        this.img.src = './styles/croc.png'
    }
    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        // ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    move(){
        this.y = this.y + gameArea.speed
    }
}

function createCrocs(){
    if (gameArea.frames % 200 === 0){
        let coluna1 = 30;
        let coluna2 = 120;
        let coluna3 = 210;
        let coluna4 = 300;
        let startCroc = (min, max) => Math.floor(Math.random() * (max - min) + min);
        gameArea.crocs.push(new Croc(coluna1, startCroc(-250, 0)));
        gameArea.crocs.push(new Croc(coluna2, startCroc(-250, 0)));
        gameArea.crocs.push(new Croc(coluna3, startCroc(-250, 0)));
        gameArea.crocs.push(new Croc(coluna4, startCroc(-250, 0)));
    }
}

function moveCrocs(){
    gameArea.crocs.forEach(croc => {
        croc.draw();
        croc.move();              
    });
}

let isAttack = false;
let x = 0;
let y = 0;

canvas.addEventListener('mousedown', e => {
    x = e.offsetX;
    y = e.offsetY;
    isAttack = true;
    validationAttack();
});

canvas.addEventListener('mouseup', e => {
    x = 0;
    y = 0;
    isAttack = false;
});

function validationAttack(){
    for (let i = 0; i < gameArea.crocs.length; i++) {
        if( y >= gameArea.crocs[i].y && y <= gameArea.crocs[i].y+50 && x >= gameArea.crocs[i].x && x <= gameArea.crocs[i].x+50){
            gameArea.score += 10
            gameArea.crocs.splice(i, 1)
            gameArea.speed += 0.1
        }
    }
    // gameArea.crocs.forEach((croc, index) => {
    //     if (y >= croc.y && y <= croc.y+50 && x >= croc.x && x <= croc.x+50){
    //         gameArea.crocs.splice(index, 1)
    //         gameArea.score += 10
    // )}
}

function attackDone(){
    for (let i = 0; i < gameArea.crocs.length; i++) {
        if( gameArea.crocs[i].y > 550){
            const imgGameOver = new Image()
            imgGameOver.src = './styles/gameover.PNG'
            clearInterval(gameArea.interval)
            clearArea()
            imgGameOver.onload = function(){
                ctx.drawImage(imgGameOver, 0, 0)
            }
            console.log(imgGameOver)
        }
    }
}

function success(){
    if( gameArea.score === 200){
            const imgSuccess = new Image()
            imgSuccess.src = './styles/success.PNG'
            clearInterval(gameArea.interval)
            clearArea()
            imgSuccess.onload = function(){
                ctx.drawImage(imgSuccess, 0, 0)
            }
            console.log(imgSuccess)
        }
    }

function updateArea() {
    gameArea.frames += 1
    clearArea();
    background.draw();
    createCrocs();
    moveCrocs();
    success();
    attackDone();
    gameArea.drawScore()
}

gameArea.start()