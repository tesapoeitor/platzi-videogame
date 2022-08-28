import { emojis } from "./maps"

export class Lives {
    private _lives = 3
    private _spanLives = document.querySelector("#lives") as HTMLSpanElement

    // Singleton
    static instance: Lives | null = null
    private constructor() {}
    static create(): Lives {
        if(Lives.instance === null) { // Si no existe una instancia, se crea una
          console.log("Se crea una instancia de Lives")
          Lives.instance = new Lives() // Aquí se llama al constructor privado
        }
        return Lives.instance
    }

    get lives() {
        return this._lives
    }
     
    reduceLives() {
        this._lives--
    }

    resetLives() {
        this._lives = 3
    }

    showLives() {
        const heartsArray = Array(this._lives).fill(emojis["HEART"])
        this._spanLives.innerText = ""
        heartsArray.forEach( heart => this._spanLives.innerText += heart)
    }
}