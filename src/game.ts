import { game, canvasSize, elementsSize, playerPosition, giftPosition, canvas, mapRowCols, level, enemyPositions, resetEnemyPositions, setElementsSize, setMapRowCols, setCanvasSize } from "./globalVariables"
import { emojis, maps } from "./maps"
import { movePlayer } from "./movements"
import { showLives } from "./show_information"
import { time } from "./time"


const gameWin = () => {
    console.log("ganaste el juego")
    time.end()
}
export const render = (map: string[][]) => {
    game.clearRect(0, 0, canvasSize, canvasSize)

    // enemyPositions = []
    resetEnemyPositions()

    map.forEach((row, rowIndex) => {
        row.forEach((colum, columIndex) => {
            const emoji = emojis[colum]
            const posX = elementsSize * (rowIndex + 1)
            const posY = elementsSize * (columIndex + 1)

            if(colum === "O" && (!playerPosition.x && !playerPosition.y)) {
                playerPosition.x = posX
                playerPosition.y = posY
                console.log({playerPosition})

            } else if(colum === "I") {
                giftPosition.x = posX
                giftPosition.y = posY
                console.log({giftPosition})

            } else if(colum === "X") {
                enemyPositions.push({
                    x: posX,
                    y: posY
                })

            }

            game.fillText(emoji, posX, posY)
        })
    })

    if(playerPosition.x && playerPosition.y) {
        movePlayer(playerPosition.x, playerPosition.y)
    }
}

export const startGame = () => {

	
    // canvas.setAttribute("width", String(canvasSize))
    // canvas.setAttribute("height", String(canvasSize))

    // elementsSize = canvasSize / 10
    setElementsSize(canvasSize / 10)

    game.font = `${elementsSize}px Verdana`
    game.textAlign = "end"

    const map = maps[level]

    if(!map) {
        gameWin()
        return
    }

    time.start()

    const mapRows = map.trim().split('\n')
    // mapRowCols = mapRows.map(row => row.trim().split(''))
    setMapRowCols(mapRows.map(row => row.trim().split('')))
    console.log({map, mapRows, mapRowCols})

    showLives()

    render(mapRowCols)

}

export const displaySize = () => {
    if(window.innerHeight > window.innerWidth) {
        // canvasSize = window.innerWidth * 0.8
        setCanvasSize(window.innerWidth * 0.8)
    } else {
        // canvasSize = window.innerHeight * 0.8
        setCanvasSize(window.innerHeight * 0.8)
    } 

    canvas.setAttribute("width", String(canvasSize))
    canvas.setAttribute("height", String(canvasSize))

    startGame()
}