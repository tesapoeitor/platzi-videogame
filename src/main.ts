import './style.css'
import { emojis, maps } from './maps'

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

    const map = maps[1];
    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))
    console.log({map, mapRows, mapRowCols})

    for (let row = 1; row <= 10; row++) {
        for (let colum = 1; colum <= 10; colum++) {
            game.fillText(emojis[mapRowCols[row - 1][colum - 1]], elementsSize * colum, elementsSize * row);
        }
    }

    // mapRowCols.forEach(row => row.forEach(colum => game.fillText))
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