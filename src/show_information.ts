import { lives } from "./globalVariables"
import { emojis } from "./maps"

const spanLives = document.querySelector("#lives") as HTMLSpanElement
// const spanTime = document.querySelector("#time") as HTMLSpanElement

export const showLives = () =>  {
    const heartsArray = Array(lives).fill(emojis["HEART"])
    spanLives.innerText = ""
    heartsArray.forEach( heart => spanLives.innerText += heart)
}

// export const showTime = () => {
//     spanTime.innerText 
// }