export function changeSizeX(width) {
    return {
        type: 'CHANGE_SIZE_X',
        width
    }
}

export function changeSizeY(height) {
    return {
        type: 'CHANGE_SIZE_Y',
        height
    }
}

export function start() {
    return {
        type: 'START'
    }
}

export function pause() {
    return {
        type: 'PAUSE'
    }
}

export function clear() {
    return {
        type: 'CLEAR'
    }
}

export function invertCell(x, y) {
    return {
        type: 'INVERT_CELL',
        x: x,
        y: y
    }
}