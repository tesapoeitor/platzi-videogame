import './style.css'
import { Game } from "./game"
import { Player } from './player'
import { Display } from './globalVariables'
import { Time } from './time'
import { Lives } from './lives'

const btnUp = document.querySelector("#up")
const btnLeft = document.querySelector("#left")
const btnRight  = document.querySelector("#right")
const btnDown = document.querySelector("#down")

const display = Display.create()
const time = Time.create()
const lives = Lives.create()
const game = Game.create(time, lives, display)
const player = Player.create(game, display)

const main = () => {
    display.displaySize() 
    game.startGame()
}


window.addEventListener("DOMContentLoaded", main)
window.addEventListener("resize", main)

window.addEventListener("keydown", player.moveByKey.bind(player))
btnUp?.addEventListener("click", player.move("up"))
btnLeft?.addEventListener("click", player.move("left"))
btnRight?.addEventListener("click", player.move("right"))
btnDown?.addEventListener("click", player.move("down"))

