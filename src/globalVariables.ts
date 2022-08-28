interface Position {
    x: undefined | number,
    y: undefined | number
}


export const canvas = document.querySelector("#game") as HTMLCanvasElement
export const game = canvas.getContext("2d") as CanvasRenderingContext2D

export let canvasSize: number
export const setCanvasSize = (value: number) => {
    canvasSize = value
}

export let elementsSize: number
export const setElementsSize = (value: number) => {
    elementsSize = value
}

export let mapRowCols: string[][]
export const setMapRowCols = (value: string[][]) => {
    mapRowCols = value
}

export let level = 0

export const playerPosition: Position = {
    x: undefined,
    y: undefined
}

export const giftPosition: Position = {
    x: undefined,
    y: undefined
}

export const levelUp = () => {
    level ++
}

export let enemyPositions: Position[] = [{
    x: undefined,
    y: undefined
}]
export const resetEnemyPositions = () => {
    enemyPositions = []
}