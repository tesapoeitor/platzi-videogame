import { Game } from "./game";
import { Display } from "./globalVariables";
import { emojis } from './maps'

export class Player {

    // Singleton
    static instance: Player | null = null
    private constructor(
        private _game: Game,
        private _display: Display,

    ) {}
    static create(game: Game, global: Display): Player {
        if(Player.instance === null) { // Si no existe una instancia, se crea una
          console.log("Se crea una instancia de Player")
          Player.instance = new Player(game, global) // Aquí se llama al constructor privado
        }
        return Player.instance
    }

    movePlayer(x: number, y: number) {

        const giftCollisionX = this._game.playerPosition.x?.toFixed(3) == this._game.giftPosition.x?.toFixed(3);
        const giftCollisionY = this._game.playerPosition.y?.toFixed(3) == this._game.giftPosition.y?.toFixed(3);
        const giftCollision = giftCollisionX && giftCollisionY;
    
        if(giftCollision) {
            this._game.levelWin()
        }
    
    
        const enemyCollision = this._game.enemyPositions.find(enemy => {
            const enemyCollisionX = this._game.playerPosition.x?.toFixed(3) == enemy.x?.toFixed(3)
            const enemyCollisionY = this._game.playerPosition.y?.toFixed(3) == enemy.y?.toFixed(3)
            return enemyCollisionX && enemyCollisionY
        })
        
        if(enemyCollision) {
            this._game.levelFail()
            return
        } 
        
        this._display.game.fillText(emojis["PLAYER"], x, y)
    }

    move(key: "up" | "left" | "right" | "down") {
        return () => {
            if(this._game.playerPosition.x && this._game.playerPosition.y) {
    
                if(key === "up" && parseInt(this._game.playerPosition.y.toFixed(3)) > parseInt(this._game.elementsSize.toFixed(3))) {
                    this._game.playerPosition.y -= this._game.elementsSize
    
                } else if(key === "right" && parseInt(this._game.playerPosition.x.toFixed(3)) < parseInt(this._display.canvasSize.toFixed(3))) {
                    this._game.playerPosition.x += this._game.elementsSize
    
                } else if(key === "down" && parseInt(this._game.playerPosition.y.toFixed(3)) < parseInt(this._display.canvasSize.toFixed(3))) {
                    this._game.playerPosition.y += this._game.elementsSize
    
                } else if(key === "left" && parseInt(this._game.playerPosition.x.toFixed(3)) > parseInt(this._game.elementsSize.toFixed(3))) {
                    this._game.playerPosition.x -= this._game.elementsSize
                    
                }
        
                this._game.render(this._game.mapRowCols)
                this.movePlayer(this._game.playerPosition.x, this._game.playerPosition.y)    
            }
    
        }
    }

    moveByKey(event: KeyboardEvent) {
        if(event.key == "ArrowUp") this.move("up")()
        else if(event.key == "ArrowLeft") this.move("left")()
        else if(event.key == "ArrowRight") this.move("right")()
        else if(event.key == "ArrowDown") this.move("down")()
    }

}