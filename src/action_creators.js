export function changeSizeX(width) {
  return {
    type: 'CHANGE_SIZE_X',
    width,
  };
}

export function changeSizeY(height) {
  return {
    type: 'CHANGE_SIZE_Y',
    height,
  };
}

export function start() {
  return (dispatch, getStore) => {
    dispatch({ type: 'START' });

    let timer = setTimeout(function tick() {
      dispatch(step());

      if (getStore().get('isStarted')) {
        timer = setTimeout(tick, 400);
      }
    }, 400);
  };
}

export function step() {
  return {
    type: 'STEP',
  };
}

export function pause() {
  return {
    type: 'PAUSE',
  };
}

export function clear() {
  return {
    type: 'CLEAR',
  };
}

export function invertCell(x, y) {
  return {
    type: 'INVERT_CELL',
    x,
    y,
  };
}
