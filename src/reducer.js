import {Map, List, fromJS} from 'immutable';

function changeSizeX(state, width) {
    if (width <= 0) return state;
    width = width ^ 0;

    let size = {
        width: state.getIn(['size', 'width']) || 0,
        height: state.getIn(['size', 'height']) || 0
    };
    if (!state.has('size')) state = state.set('size', Map(size));

    state = state.setIn(['size', 'width'], width);

    if (!state.has('cells')) state = state.set('cells', List());

    if (size.height == 0) return state;

    return state.update('cells', cells => cells.map(item => item.setSize(width)));
}

function changeSizeY(state, height) {
    if (height <= 0) return state;
    height = height ^ 0;

    let size = {
        width: state.getIn(['size', 'width']) || 0,
        height: state.getIn(['size', 'height']) || 0
    };
    if (!state.has('size')) state = state.set('size', Map(size));

    state = state.setIn(['size', 'height'], height);

    if (!state.has('cells')) state = state.set('cells', List());

    if (height <= size.height)
        return state.update('cells', cells => cells.setSize(height));

    for (let i = 0; i < height - size.height; i++)
        state = state.update('cells', cells => cells.push(List().setSize(size.width)));

    return state;
}

function step(state) {
    const width = state.getIn(['size', 'width']);
    const height = state.getIn(['size', 'height']);

    if (width <= 2 || height <= 2) return state;

    let numberLivingAround = [];
    for (let y = 0; y < height; y++) {
        numberLivingAround[y] = [];
        for (let x = 0; x < width; x++)
            numberLivingAround[y][x] = 0;
    }

    function addLivingCell(x, y) {
        if (y == 0) {
            numberLivingAround[height - 1][x]++;
            numberLivingAround[y + 1][x]++;
            if (x == 0) {
                numberLivingAround[height - 1][width - 1]++;
                numberLivingAround[y][width - 1]++;
                numberLivingAround[y + 1][width - 1]++;
            }
            else {
                numberLivingAround[height - 1][x - 1]++;
                numberLivingAround[y][x - 1]++;
                numberLivingAround[y + 1][x - 1]++;
            }
            if (x == width - 1) {
                numberLivingAround[height - 1][0]++;
                numberLivingAround[y][0]++;
                numberLivingAround[y + 1][0]++;
            }
            else {
                numberLivingAround[height - 1][x + 1]++;
                numberLivingAround[y][x + 1]++;
                numberLivingAround[y + 1][x + 1]++;
            }
            return;
        }
        if (y == height - 1) {
            numberLivingAround[y - 1][x]++;
            numberLivingAround[0][x]++;
            if (x == 0) {
                numberLivingAround[y - 1][width - 1]++;
                numberLivingAround[y][width - 1]++;
                numberLivingAround[0][width - 1]++;
            }
            else {
                numberLivingAround[y - 1][x - 1]++;
                numberLivingAround[y][x - 1]++;
                numberLivingAround[0][x - 1]++;
            }
            if (x == width - 1) {
                numberLivingAround[y - 1][0]++;
                numberLivingAround[y][0]++;
                numberLivingAround[0][0]++;
            }
            else {
                numberLivingAround[y - 1][x + 1]++;
                numberLivingAround[y][x + 1]++;
                numberLivingAround[0][x + 1]++;
            }
            return;
        }
        numberLivingAround[y - 1][x]++;
        numberLivingAround[y + 1][x]++;
        if (x == 0) {
            numberLivingAround[y - 1][width - 1]++;
            numberLivingAround[y][width - 1]++;
            numberLivingAround[y + 1][width - 1]++;
        }
        else {
            numberLivingAround[y - 1][x - 1]++;
            numberLivingAround[y][x - 1]++;
            numberLivingAround[y + 1][x - 1]++;
        }
        if (x == width - 1) {
            numberLivingAround[y - 1][0]++;
            numberLivingAround[y][0]++;
            numberLivingAround[y + 1][0]++;
        }
        else {
            numberLivingAround[y - 1][x + 1]++;
            numberLivingAround[y][x + 1]++;
            numberLivingAround[y + 1][x + 1]++;
        }
    }

    for (let y = 0; y < height; y++)
        for (let x = 0; x < width; x++)
            if (state.getIn(['cells', y, x]))
                addLivingCell(x, y);

    for (let y = 0; y < height; y++)
        for (let x = 0; x < width; x++) {
            if (state.getIn(['cells', y, x]))
                if (numberLivingAround[y][x] == 2 || numberLivingAround[y][x] == 3)
                    numberLivingAround[y][x] = true;
                else numberLivingAround[y][x] = false;
            else
                if (numberLivingAround[y][x] == 3)
                    numberLivingAround[y][x] = true;
                else numberLivingAround[y][x] = false;
        }

    return state.merge(fromJS({'cells': numberLivingAround}));
}

export default function (state = Map(), action) {
    switch (action.type) {
        case 'CHANGE_SIZE_X':
            return changeSizeX(state, action.width);
        case 'CHANGE_SIZE_Y':
            return changeSizeY(state, action.height);

        case 'START':
            return state.set('isStarted', true);
        case 'PAUSE':
            return state.set('isStarted', false);
        case 'STEP':
            return step(state);

        case 'CLEAR':
            return state.update('cells', cells => cells.map(row => row.map(cell => cell = false)));
        case 'INVERT_CELL':
            return state.updateIn(['cells', action.y, action.x], value => !value)
    }
    return state;
}