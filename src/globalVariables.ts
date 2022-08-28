export class Display {
    
    private _canvas = document.querySelector("#game") as HTMLCanvasElement
    private _game = this._canvas.getContext("2d") as CanvasRenderingContext2D
    private _canvasSize = 0
    
    // Singleton
    static instance: Display | null = null
    private constructor() {}
    static create(): Display {
        if(Display.instance === null) { // Si no existe una instancia, se crea una
          console.log("Se crea una instancia de Display")
          Display.instance = new Display() // Aquí se llama al constructor privado
        }
        return Display.instance
    }
    
    get canvas() {
        return this._canvas
    }

    get game() {
        return this._game
    }

    set canvasSize(value: number) {
        this._canvasSize = value
    }

    get canvasSize() {
        return this._canvasSize
    }

    displaySize = () => {
        if(window.innerHeight > window.innerWidth) {
            this._canvasSize = (window.innerWidth * 0.8)
        } else {
            this._canvasSize = (window.innerHeight * 0.8)
        } 
    
        this._canvas.setAttribute("width", String(this._canvasSize))
        this._canvas.setAttribute("height", String(this._canvasSize))
    }
}