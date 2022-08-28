import './style.css'
import { displaySize } from "./game"
import { move, moveByKey } from './movements'

const btnUp = document.querySelector("#up")
const btnLeft = document.querySelector("#left")
const btnRight  = document.querySelector("#right")
const btnDown = document.querySelector("#down")




window.addEventListener("DOMContentLoaded", displaySize)
window.addEventListener("resize", displaySize)

window.addEventListener("keydown", moveByKey)
btnUp?.addEventListener("click", move("up"))
btnLeft?.addEventListener("click", move("left"))
btnRight?.addEventListener("click", move("right"))
btnDown?.addEventListener("click", move("down"))

// function setCanvasSize(this: Window, ev: Event) {
//     throw new Error('Function not implemented.')
// }
