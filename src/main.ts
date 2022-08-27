import './style.css'
import { emojis, maps } from './maps'

const canvas = document.querySelector("#game") as HTMLCanvasElement
const game = canvas.getContext("2d") as CanvasRenderingContext2D

const btnUp = document.querySelector("#up")
const btnLeft = document.querySelector("#left")
const btnRight  = document.querySelector("#right")
const btnDown = document.querySelector("#down")

let canvasSize: number
let elementsSize: number
let mapRowCols: string[][]

const playerPosition: {x: undefined | number, y: undefined | number} = {
    x: undefined,
    y: undefined
}

const giftPosition: {x: undefined | number, y: undefined | number} = {
    x: undefined,
    y: undefined
}

const movePlayer = (x: number, y: number) => {
    if(playerPosition.x && giftPosition.x && playerPosition.y && giftPosition.y) {
        const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
        const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
        const giftCollision = giftCollisionX && giftCollisionY;

        if(giftCollision) {
            console.log("pasaste de nivel")
        }
    }
    game.fillText(emojis["PLAYER"], x, y)
}

const render = (map: string[][]) => {
    game.clearRect(0, 0, canvasSize, canvasSize)

    map.forEach((row, rowIndex) => {
        row.forEach((colum, columIndex) => {
            const emoji = emojis[colum]
            const posX = elementsSize * (rowIndex + 1)
            const posY = elementsSize * (columIndex + 1)
            
            if(colum === "O" && (!playerPosition.x && !playerPosition.y)) {
                playerPosition.x = posX
                playerPosition.y = posY
                console.log({playerPosition})
            } else if(colum === "I" && (!giftPosition.x && !giftPosition.y)) {
                giftPosition.x = posX
                giftPosition.y = posY
                console.log({giftPosition})
            }

            game.fillText(emoji, posX, posY)
        })
    })
}

const startGame = () => {
    // game.fillRect(0, 0, 100, 100)
    // game.clearRect(50, 50, 50, 50)

    // game.font = "25px verdana"
    // game.fillStyle = "white"
    // game.fillText("platzi", 50, 50)

    canvas.setAttribute("width", String(canvasSize))
    canvas.setAttribute("height", String(canvasSize))

    elementsSize = canvasSize / 10

    game.font = `${elementsSize}px Verdana`
    game.textAlign = "end"

    const map = maps[2];
    const mapRows = map.trim().split('\n')
    mapRowCols = mapRows.map(row => row.trim().split(''))
    console.log({map, mapRows, mapRowCols})

    // mapRowCols.forEach((row, rowIndex) => {
    //     row.forEach((colum, columIndex) => {
    //         const emoji = emojis[colum]
    //         const posX = elementsSize * (rowIndex + 1)
    //         const posY = elementsSize * (columIndex + 1)
            
    //         if(colum === "O") {
    //             playerPosition.x = posX
    //             playerPosition.y = posY
    //             console.log({playerPosition})
    //         }

    //         game.fillText(emoji, posX, posY)
    //     })
    // })

    render(mapRowCols)

    if(playerPosition.x && playerPosition.y) {
        movePlayer(playerPosition.x, playerPosition.y)
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

const move = (key: "up" | "left" | "right" | "down") => {
    return () => {
        console.log(`Pressed: ${key}`)
        if(playerPosition.x && playerPosition.y) {

            if(key === "up" && (playerPosition.y > elementsSize)) {
                playerPosition.y -= elementsSize

            } else if(key === "right" && (playerPosition.x < canvasSize)) {
                playerPosition.x += elementsSize

            } else if(key === "down" && (playerPosition.y < canvasSize)) {
                playerPosition.y += elementsSize

            } else if(key === "left" && (playerPosition.x > elementsSize)) {
                playerPosition.x -= elementsSize
                
            }
    
            render(mapRowCols)
            movePlayer(playerPosition.x, playerPosition.y)
            console.log({playerPosition})
        }

    }
}

const moveByKey = (event: KeyboardEvent) => {
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