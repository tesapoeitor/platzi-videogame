import { Time } from "./time"

export class Record {

    private _spanRecord = document.querySelector('#record') as HTMLSpanElement
    private _pResult  = document.querySelector('#result') as HTMLParagraphElement
    private _recordTime = localStorage.getItem("record_time")
    
    // Singleton
    static instance: Record | null = null
    private constructor(
        private _time: Time,
        
    ) {}
    static create(time: Time): Record {
        if(Record.instance === null) { // Si no existe una instancia, se crea una
          console.log("Se crea una instancia de Record")
          Record.instance = new Record(time) // Aquí se llama al constructor privado
        }
        return Record.instance
    }

    save() {
        if(this._recordTime) {
            if(parseInt(this._recordTime) > this._time.playerTime) {
                localStorage.setItem("record_time", String(this._time.playerTime))
                this._pResult.innerText = "SUPERASTE EL RECORD 😉"
            } else {
                this._pResult.innerText = "Lo siento, no superaste el record 😪"
            }
        } else {
            localStorage.setItem("record_time", String(this._time.playerTime))
            this._pResult.innerText = "Primera vez? Muy bien, pero ahora trata de superar tu tiempo"
        }
    }

    show() {
        const record = localStorage.getItem("record_time") as String
        this._spanRecord.innerHTML = `${record}`
    }
}