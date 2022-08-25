import './style.css'
import { emojis, maps } from './maps'

const canvas = document.querySelector("#game") as HTMLCanvasElement
const game = canvas.getContext("2d") as CanvasRenderingContext2D

const btnUp = document.querySelector("#up")
const btnLeft = document.querySelector("#left")
const btnRight  = document.querySelector("#right")
const btnDown = document.querySelector("#down")

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

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((colum, columIndex) => {
            const emoji = emojis[colum]
            const posX = elementsSize * (rowIndex + 1)
            const posY = elementsSize * (columIndex + 1)

            game.fillText(emoji, posX, posY)
        })
    })

}

const setCanvasSize = () => {
    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8
    } else {
        canvasSize = window.innerHeight * 0.8
    } 

    startGame()
}

const move = (key: "up" | "left" | "right" | "down") => {
    return () => {
        console.log(`Pressed: ${key}`)
    }
}

const moveByKey = (event: any) => {
    if(event.key == "ArrowUp") move("up")()
    else if(event.key == "ArrowLeft") move("left")()
    else if(event.key == "ArrowRight") move("right")()
    else if(event.key == "ArrowDown") move("down")()
}


window.addEventListener("DOMContentLoaded", setCanvasSize)
window.addEventListener("resize", setCanvasSize)

window.addEventListener("keydown", moveByKey)
btnUp?.addEventListener("click", move("up"))
btnLeft?.addEventListener("click", move("left"))
btnRight?.addEventListener("click", move("right"))
btnDown?.addEventListener("click", move("down"))