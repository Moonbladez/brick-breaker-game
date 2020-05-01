//dom elements
const rulesButton = document.querySelector(".rules-btn")
const closeButton = document.querySelector(".close-btn")
const rules = document.querySelector(".rules")
const header = document.querySelector(".header")

const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")

let score = 0;
let lives = 3;

const brickRowCount = 9;
const brickColCount = 5;

//ball
const ball = {
    //xposition
    x: canvas.width / 2,
    //y position
    y: canvas.height / 2,
    //ball size
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

//create paddle
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

//create bricks
const brickInformation = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visable: true,
}

const bricks = []
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColCount; j++) {
        const x = i * (brickInformation.w + brickInformation.padding) + brickInformation.offsetX;
        const y = j * (brickInformation.h + brickInformation.padding) + brickInformation.offsetY;
        bricks[i][j] = {
            x,
            y,
            ...brickInformation
        }
    }
}



//draw ball onto canvas 
const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = "#fefefe"
    ctx.fill()
    ctx.closePath()
}

//draw paddle on canvas
const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = "#9FA1A3"
    ctx.fill()
    ctx.closePath()
}

//draw score on canvas
const drawScore = () => {
    ctx.font = "20px Pixel";
    ctx.fillStyle = "#fefefe";
    ctx.fillText(`Score: ${score}`, canvas.width - 120, 40);
}

//draw lives
const drawLives = () => {
    ctx.font = "20px Pixel"
    ctx.fillStyle = "#fefefe";
    ctx.fillText(`Lives: ${lives}`, canvas.width - 750, 40);
}

//draw bricks on canvas
const drawBricks = () => {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visable ? "#9FA1A3" : "transparent";
            ctx.fill();
            ctx.closePath();
        })
    })
}

//move paddle on canvas
const movePaddle = () => {
    paddle.x += paddle.dx;

    //wall detection
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    }
}

//Move paddle   
const moveBall = () => {
    //apphend
    ball.x += ball.dx;
    ball.y += ball.dy;

    //wall detection x axis
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        //reverse it the other way
        ball.dx *= -1;
    }

    //wall collision top bottom
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    //paddle collision

    if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ) {
        ball.dy = -ball.speed
    }

    //brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visable) {
                if (ball.x - ball.size > brick.x && //left brick check 
                    ball.x + ball.size < brick.x + brick.w && //right brock side check
                    ball.y + ball.size > brick.y && //top
                    ball.y - ball.size < brick.y + brick.h //bottom
                ) {
                    //bounce it off brick
                    ball.dy *= -1;
                    brick.visable = false;

                    increaseScore();
                }
            }
        })
    })

    //if ball hits the bottom and not bat
    if (ball.y + ball.size > canvas.height) {
        lives = lives - 1;
        score = 0;
    }

    if (lives === 0) {
        gameOver()
    }

}

//increase score
const increaseScore = () => {
    score++;

    if (score & (brickRowCount * brickRowCount) === 0) {
        showAllBricks()
    }
}

//show all bricks on reset
const showAllBricks = () => {
    bricks.forEach(column => {
        column.forEach(brick => brick.visable = true)
    })
}

//game Over 
const gameOver = () => {
    canvas.style.display = "none"
    header.innerText = "Game Over"
}



const drawEverything = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    drawPaddle()
    drawScore()
    drawLives()
    drawBricks()
}


//update canvas
const update = () => {
    movePaddle()
    drawEverything()
    moveBall()

    requestAnimationFrame(update)
}

update()


//keydown event
const keyDown = (event) => {
    if (event.key === "Right" || event.key === "ArrowRight") {
        console.log(paddle.dx)
        paddle.dx = paddle.speed;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
        paddle.dx = -paddle.speed;
    }
}

// keyup
const keyUp = (event) => {
    if (event.key === "Right" || event.key === "ArrowRight" || event.key === "Left" || event.key === "ArrowLeft") {
        paddle.dx = 0;
    }
}

//keyboard event handlers
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)





//rules
rulesButton.addEventListener("click", () => {
    rules.classList.add("show")
})
closeButton.addEventListener("click", () => {
    rules.classList.remove("show")
})