import { levelUp, lives, reduceLives, resetLevel, resetLives, resetPlayerPosition } from "./globalVariables"
import { startGame } from "./game"
import { time } from "./time"

export const levelWin = () => {
    console.log("pasaste de nivel")
    levelUp()
    // resetPlayerPosition()
    startGame()
}

export  const levelFail = () => {
    console.log("chocaste contra un enemigo")
    reduceLives()

    if(lives <= 0) {
        resetLevel()
        resetLives()
        time.end()
    }

    resetPlayerPosition()
    startGame()
}