
import { emojis, maps } from "./maps"
import { Display } from "./display"
import { Time } from "./time"
import { Lives } from "./lives"
import { Record } from "./record"


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
    private _isFinish = false

    // Singleton
    static instance: Game | null = null
    private constructor(
        private _time: Time,
        private _record: Record,
        private _lives: Lives,
        private _display: Display
    ) {}
    static create(time: Time, record: Record, lives: Lives, global: Display): Game {
        if(Game.instance === null) { // Si no existe una instancia, se crea una
          Game.instance = new Game(time, record, lives, global) // Aquí se llama al constructor privado
        }
        return Game.instance
    }


    gameWin() {
        this._time.end()
        this._record.save()
        this._isFinish = true

        const pos = this.display.canvasSize / 2
        this._display.game.textAlign = "center"
        this._display.game.fillStyle = "white"
        this._display.game.fillText("Ganaste!", pos, pos)
        this._display.game.textAlign = "end"
    }

    render(map: string[][]) {
        this._display.game.clearRect(0, 0, this._display.canvasSize, this._display.canvasSize)
    
        this.resetEnemyPositions()
    
        map.forEach((row, rowIndex) => {
            row.forEach((colum, columIndex) => {
                const emoji = emojis[colum]
                const posX = this.elementsSize * (columIndex + 1)
                const posY = this.elementsSize * (rowIndex + 1)
    
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
            if(!this.isFinish)
                this.gameWin()
            return
        }
    
        this._time.start()
    
        const mapRows = map.trim().split('\n')
        this.mapRowCols = mapRows.map(row => row.trim().split(''))
    
        this._lives.showLives()
        this._record.show()
    
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
        this.levelUp()
        this.startGame()
    }

    levelFail() {
        this._lives.reduceLives()
        this.resetPlayerPosition()
    
        if(this._lives.lives <= 0) {
            this.resetLevel()
            this._lives.resetLives()
            this._time.end()
            this.gameOver()
            setTimeout(this.startGame.bind(this), 2000)
        } else {
            this.startGame()
        }
    }

    gameOver() {
        for (let row = 0; row < 10; row++) {
            for (let colum = 0; colum < 10; colum++) {
                const emoji = emojis["BOMB_COLLISION"]
                const posX = this.elementsSize * (colum + 1)
                const posY = this.elementsSize * (row + 1)

                this._display.game.fillText(emoji, posX, posY)
            }            
        }
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

    get display() {
        return this._display
    }

    get isFinish() {
        return this._isFinish
    }
}