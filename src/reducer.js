import { Map, List, fromJS } from 'immutable';

function changeSizeX(state, width) {
  const nextWidth = Math.floor(width);
  let nextState = state;

  if (nextWidth <= 0) return state;

  const size = {
    width: nextState.getIn(['size', 'width']) || 0,
    height: nextState.getIn(['size', 'height']) || 0,
  };
  if (!nextState.has('size')) nextState = nextState.set('size', Map(size));

  nextState = nextState.setIn(['size', 'width'], nextWidth);

  if (!nextState.has('cells')) nextState = nextState.set('cells', List());

  if (size.height === 0) return nextState;

  return nextState.update('cells', cells => cells.map(item => item.setSize(nextWidth)));
}

function changeSizeY(state, height) {
  const newHeight = Math.floor(height);
  let nextState = state;

  if (newHeight <= 0) return state;

  const size = {
    width: nextState.getIn(['size', 'width']) || 0,
    height: nextState.getIn(['size', 'height']) || 0,
  };
  if (!nextState.has('size')) nextState = nextState.set('size', Map(size));

  nextState = nextState.setIn(['size', 'height'], newHeight);

  if (!nextState.has('cells')) nextState = nextState.set('cells', List());

  if (newHeight <= size.height) {
    return nextState.update('cells', cells => cells.setSize(newHeight));
  }

  for (let i = 0; i < newHeight - size.height; i += 1) {
    nextState = nextState.update('cells', cells => cells.push(List().setSize(size.width)));
  }

  return nextState;
}

function step(state) {
  const width = state.getIn(['size', 'width']);
  const height = state.getIn(['size', 'height']);

  if (width <= 2 || height <= 2) return state;

  const numberLivingAround = [];
  for (let y = 0; y < height; y += 1) {
    numberLivingAround[y] = [];
    for (let x = 0; x < width; x += 1) {
      numberLivingAround[y][x] = 0;
    }
  }

  function addLivingCell(x, y) {
    if (y === 0) {
      numberLivingAround[height - 1][x] += 1;
      numberLivingAround[y + 1][x] += 1;
      if (x === 0) {
        numberLivingAround[height - 1][width - 1] += 1;
        numberLivingAround[y][width - 1] += 1;
        numberLivingAround[y + 1][width - 1] += 1;
      } else {
        numberLivingAround[height - 1][x - 1] += 1;
        numberLivingAround[y][x - 1] += 1;
        numberLivingAround[y + 1][x - 1] += 1;
      }
      if (x === width - 1) {
        numberLivingAround[height - 1][0] += 1;
        numberLivingAround[y][0] += 1;
        numberLivingAround[y + 1][0] += 1;
      } else {
        numberLivingAround[height - 1][x + 1] += 1;
        numberLivingAround[y][x + 1] += 1;
        numberLivingAround[y + 1][x + 1] += 1;
      }
      return;
    }
    if (y === height - 1) {
      numberLivingAround[y - 1][x] += 1;
      numberLivingAround[0][x] += 1;
      if (x === 0) {
        numberLivingAround[y - 1][width - 1] += 1;
        numberLivingAround[y][width - 1] += 1;
        numberLivingAround[0][width - 1] += 1;
      } else {
        numberLivingAround[y - 1][x - 1] += 1;
        numberLivingAround[y][x - 1] += 1;
        numberLivingAround[0][x - 1] += 1;
      }
      if (x === width - 1) {
        numberLivingAround[y - 1][0] += 1;
        numberLivingAround[y][0] += 1;
        numberLivingAround[0][0] += 1;
      } else {
        numberLivingAround[y - 1][x + 1] += 1;
        numberLivingAround[y][x + 1] += 1;
        numberLivingAround[0][x + 1] += 1;
      }
      return;
    }
    numberLivingAround[y - 1][x] += 1;
    numberLivingAround[y + 1][x] += 1;
    if (x === 0) {
      numberLivingAround[y - 1][width - 1] += 1;
      numberLivingAround[y][width - 1] += 1;
      numberLivingAround[y + 1][width - 1] += 1;
    } else {
      numberLivingAround[y - 1][x - 1] += 1;
      numberLivingAround[y][x - 1] += 1;
      numberLivingAround[y + 1][x - 1] += 1;
    }
    if (x === width - 1) {
      numberLivingAround[y - 1][0] += 1;
      numberLivingAround[y][0] += 1;
      numberLivingAround[y + 1][0] += 1;
    } else {
      numberLivingAround[y - 1][x + 1] += 1;
      numberLivingAround[y][x + 1] += 1;
      numberLivingAround[y + 1][x + 1] += 1;
    }
  }

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (state.getIn(['cells', y, x])) {
        addLivingCell(x, y);
      }
    }
  }

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (state.getIn(['cells', y, x])) {
        if (numberLivingAround[y][x] === 2 || numberLivingAround[y][x] === 3) {
          numberLivingAround[y][x] = true;
        } else numberLivingAround[y][x] = false;
      } else if (numberLivingAround[y][x] === 3) {
        numberLivingAround[y][x] = true;
      } else numberLivingAround[y][x] = false;
    }
  }

  return state.merge(fromJS({ cells: numberLivingAround }));
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
      return state.updateIn(['cells', action.y, action.x], value => !value);

    default:
      return state;
  }
}
