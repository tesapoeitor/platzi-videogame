import { render } from "./game";
import { levelFail, levelWin } from "./levels"
import { playerPosition, giftPosition, enemyPositions, elementsSize, canvasSize, mapRowCols, game } from "./globalVariables"
import { emojis } from './maps'

export const movePlayer = (x: number, y: number) => {

    const giftCollisionX = playerPosition.x?.toFixed(3) == giftPosition.x?.toFixed(3);
    const giftCollisionY = playerPosition.y?.toFixed(3) == giftPosition.y?.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if(giftCollision) {
        levelWin()
    }


    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = playerPosition.x?.toFixed(3) == enemy.x?.toFixed(3)
        const enemyCollisionY = playerPosition.y?.toFixed(3) == enemy.y?.toFixed(3)
        return enemyCollisionX && enemyCollisionY
    })
    
    if(enemyCollision) {
        levelFail()
        return
    } 
    
    game.fillText(emojis["PLAYER"], x, y)
}

export const move = (key: "up" | "left" | "right" | "down") => {
    return () => {
        if(playerPosition.x && playerPosition.y) {

            if(key === "up" && parseInt(playerPosition.y.toFixed(3)) > parseInt(elementsSize.toFixed(3))) {
                playerPosition.y -= elementsSize

            } else if(key === "right" && parseInt(playerPosition.x.toFixed(3)) < parseInt(canvasSize.toFixed(3))) {
                playerPosition.x += elementsSize

            } else if(key === "down" && parseInt(playerPosition.y.toFixed(3)) < parseInt(canvasSize.toFixed(3))) {
                playerPosition.y += elementsSize

            } else if(key === "left" && parseInt(playerPosition.x.toFixed(3)) > parseInt(elementsSize.toFixed(3))) {
                playerPosition.x -= elementsSize
                
            }
    
            render(mapRowCols)
            movePlayer(playerPosition.x, playerPosition.y)
            console.log({playerPosition, canvasSize, elementsSize})
        }

    }
}

export const moveByKey = (event: KeyboardEvent) => {
    if(event.key == "ArrowUp") move("up")()
    else if(event.key == "ArrowLeft") move("left")()
    else if(event.key == "ArrowRight") move("right")()
    else if(event.key == "ArrowDown") move("down")()
}
