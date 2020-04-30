//dom elements
const rulesButton = document.querySelector(".rules-btn")
const closeButton = document.querySelector(".close-btn")
const rules = document.querySelector(".rules")

const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")

let score = 0;

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
    ctx.font = "30px Arial";
    ctx.fillStyle = "#fefefe";
    ctx.fillText(`Score: ${score}`, canvas.width - 150, 40);


}

const drawEverything = (params) => {
    drawBall()
    drawPaddle()
    drawScore()
}

drawEverything()








//rules
rulesButton.addEventListener("click", () => {
    rules.classList.add("show")
})
closeButton.addEventListener("click", () => {
    rules.classList.remove("show")
})