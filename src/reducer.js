import {Map, List} from 'immutable';

function changeSizeX(state, width) {
    if (width <= 0) return state;
    width = width ^ 0;

    let size = {
        width: state.getIn(['size', 'width']) || 0,
        height: state.getIn(['size', 'height']) || 0
    };
    if (!state.has('size')) state = state.set('size', Map(size));

    state = state.setIn(['size', 'width'], width);

    if(!state.has('cells')) state = state.set('cells', List());

    if(size.height == 0) return state;

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

    if(!state.has('cells')) state = state.set('cells', List());

    if (height <= size.height )
        return state.update('cells', cells => cells.setSize(height));

    for(let i = 0; i < height - size.height; i++)
        state = state.update('cells', cells => cells.push(List().setSize(size.width)));

    return state;
}

function invertCell(state, x, y) {
    return state.updateIn(['cells', y, x], value => !value)
}

function start(state) {
    setTimeout(step(state), 200);

    return state.set('isStarted', true);
}

function step(state) {
    let timer = setTimeout(function tick() {

        //изменяем state

        if (state.get('isStarted'))
            timer = setTimeout(tick, 2000);
    }, 2000);
}

function clear(state) {
    return state.update('cells', cells => cells.map(row => row.map(cell => cell = false)));
}

export default function (state = Map(), action) {
    switch (action.type) {
        case 'CHANGE_SIZE_X':
            return changeSizeX(state, action.width);
        case 'CHANGE_SIZE_Y':
            return changeSizeY(state, action.height);
        case 'START':
            return start(state);
        case 'PAUSE':
            return state.set('isStarted', false);
        case 'CLEAR':
            return clear(state);
        case 'INVERT_CELL':
            return invertCell(state, action.x, action.y);
    }
    return state;
}