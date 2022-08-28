
class Time {
    private _timeStart = 0
    private _timePlayer = 0
    private _timeInterval: any
    private _htmlNode = document.querySelector("#time") as HTMLElement
    

    // constructor(htmlNode: HTMLElement) {
    //     this._htmlNode = htmlNode
    // }
    
    set timeStart(value: number) {
        this._timeStart = value
    }
    
    get timeStart() {
        return this._timeStart
    }

    start() {
        if(!this._timeInterval) {
            this._timeStart = Date.now()
            // utilice el método bind para pasarle el valor de this
            this._timeInterval = setInterval(this.showTimeDisplay.bind(this), 100)
        }
    }

    end() {
        this._timeStart = 0
        clearInterval(this._timeInterval)
        this._timeInterval = undefined
    }
    
    private showTimeDisplay() {
        this._htmlNode.innerText = `${Date.now() - this._timeStart}`
    }
}

export const time = new Time()