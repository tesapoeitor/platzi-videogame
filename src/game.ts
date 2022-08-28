
import { emojis, maps } from "./maps"
import { Display } from "./globalVariables"
import { Time } from "./time"
import { Lives } from "./lives"


interface Position {
    x: undefined | number,
    y: undefined | number
}

export class Game {
    private _level = 0
    public playerPosition: Position = {
        x: undefined,
        y: undefined
    }
    public giftPosition: Position = {
        x: undefined,
        y: undefined
    }
    public enemyPositions: Position[] = [{
        x: undefined,
        y: undefined
    }]
    private _elementsSize = 0
    private _mapRowCols: string[][] = [[]]

    // Singleton
    static instance: Game | null = null
    private constructor(
        private _time: Time,
        private _lives: Lives,
        private _display: Display
    ) {}
    static create(time: Time, lives: Lives, global: Display): Game {
        if(Game.instance === null) { // Si no existe una instancia, se crea una
          console.log("Se crea una instancia de Game")
          Game.instance = new Game(time, lives, global) // Aquí se llama al constructor privado
        }
        return Game.instance
    }


    gameWin() {
        console.log("ganaste el juego")
        this._time.end()
    }

    render(map: string[][]) {
        this._display.game.clearRect(0, 0, this._display.canvasSize, this._display.canvasSize)
    
        this.resetEnemyPositions()
    
        map.forEach((row, rowIndex) => {
            row.forEach((colum, columIndex) => {
                const emoji = emojis[colum]
                const posX = this.elementsSize * (rowIndex + 1)
                const posY = this.elementsSize * (columIndex + 1)
    
                if(colum === "O" && (!this.playerPosition.x && !this.playerPosition.y)) {
                    this.playerPosition.x = posX
                    this.playerPosition.y = posY
    
                } else if(colum === "I") {
                    this.giftPosition.x = posX
                    this.giftPosition.y = posY
    
                } else if(colum === "X") {
                    this.enemyPositions.push({
                        x: posX,
                        y: posY
                    })
    
                }
    
                this._display.game.fillText(emoji, posX, posY)
            })
        })
    
        if(this.playerPosition.x && this.playerPosition.y) {
            this._display.game.fillText(emojis["PLAYER"], this.playerPosition.x, this.playerPosition.y)
        }
    }

    startGame() {
        this.elementsSize = this._display.canvasSize / 10
    
        this._display.game.font = `${this.elementsSize}px Verdana`
        this._display.game.textAlign = "end"
    
        const map = maps[this._level]
    
        if(!map) {
            this.gameWin()
            return
        }
    
        this._time.start()
    
        const mapRows = map.trim().split('\n')
        this.mapRowCols = mapRows.map(row => row.trim().split(''))
    
        this._lives.showLives()
    
        this.render(this.mapRowCols)
    
    }

    get level() {
        return this._level
    }

    levelUp() {
        this._level ++
    }

    resetLevel() {
        this._level = 0
    }

    levelWin() {
        console.log("pasaste de nivel")
        this.levelUp()
        this.startGame()
    }

    levelFail() {
        console.log("chocaste contra un enemigo")
        this._lives.reduceLives()
    
        if(this._lives.lives <= 0) {
            this.resetLevel()
            this._lives.resetLives()
            this._time.end()
        }
    
        this.resetPlayerPosition()
        this.startGame()
    }

    resetPlayerPosition() {
        this.playerPosition.x = undefined
        this.playerPosition.y = undefined
    }

    resetEnemyPositions() {
        this.enemyPositions = []
    }

    set elementsSize(value: number) {
        this._elementsSize = value
    }

    get elementsSize() {
        return this._elementsSize
    }

    set mapRowCols(value: string[][]) {
        this._mapRowCols = value
    }

    get mapRowCols() {
        return this._mapRowCols
    }
}