import './style.css'
import { emojis } from './maps'

const canvas = document.querySelector("#game") as HTMLCanvasElement
const game = canvas.getContext("2d") as CanvasRenderingContext2D

let canvasSize: number

const startGame = () => {
    // game.fillRect(0, 0, 100, 100)
    // game.clearRect(50, 50, 50, 50)

    // game.font = "25px verdana"
    // game.fillStyle = "white"
    // game.fillText("platzi", 50, 50)

    canvas.setAttribute("width", String(canvasSize))
    canvas.setAttribute("height", String(canvasSize))

    const elementsSize = canvasSize / 10

    game.font = `${elementsSize}px Verdana`
    game.textAlign = "end"

    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis['X'], elementsSize, elementsSize * i);
        console.log({canvasSize, elementsSize: elementsSize * i})
    }

}

const setCanvasSize = () => {
    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8
    } else {
        canvasSize = window.innerHeight * 0.8
    } 

    startGame()
}

window.addEventListener("DOMContentLoaded", setCanvasSize)
window.addEventListener("resize", setCanvasSize)