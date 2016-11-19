import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import * as actionCreators from '../src/action_creators';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('обрабатывает CHANGE_SIZE_X при пустом state', () => {
    const initialState = Map();
    const action = actionCreators.changeSizeX(3);
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      size: {
        width: 3,
        height: 0,
      },
      cells: [],
    }));
  });

  it('обрабатывает CHANGE_SIZE_Y при пустом state', () => {
    const initialState = Map();
    const action = actionCreators.changeSizeY(3);
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      size: {
        width: 0,
        height: 3,
      },
      cells: [
        [], [], [],
      ],
    }));
  });

  it('CHANGE_SIZE_X не изменяет состояние не затронутых клеток', () => {
    const initialState = fromJS({
      size: {
        width: 3,
        height: 3,
      },
      cells: [
        [true, undefined, false],
        [undefined, true, undefined],
        [true, false, true],
      ],
    });
    const action = actionCreators.changeSizeX(2);
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      size: {
        width: 2,
        height: 3,
      },
      cells: [
        [true, undefined],
        [undefined, true],
        [true, false],
      ],
    }));
  });

  it('CHANGE_SIZE_Y не изменяет состояние не затронутых клеток', () => {
    const initialState = fromJS({
      size: {
        width: 3,
        height: 3,
      },
      cells: [
        [true, undefined, false],
        [undefined, true, undefined],
        [true, false, true],
      ],
    });
    const action = actionCreators.changeSizeY(2);
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      size: {
        width: 3,
        height: 2,
      },
      cells: [
        [true, undefined, false],
        [undefined, true, undefined],
      ],
    }));
  });

  it('CHANGE_SIZE_X и CHANGE_SIZE_Y добавляют клетки', () => {
    const initialState = fromJS({
      size: {
        width: 3,
        height: 3,
      },
      cells: [
        [true, undefined, false],
        [undefined, true, undefined],
        [true, false, true],
      ],
    });
    let action = actionCreators.changeSizeX(4);
    let nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      size: {
        width: 4,
        height: 3,
      },
      cells: [
        [true, undefined, false, undefined],
        [undefined, true, undefined, undefined],
        [true, false, true, undefined],
      ],
    }));

    action = actionCreators.changeSizeY(4);
    nextState = reducer(nextState, action);

    expect(nextState).to.equal(fromJS({
      size: {
        width: 4,
        height: 4,
      },
      cells: [
        [true, undefined, false, undefined],
        [undefined, true, undefined, undefined],
        [true, false, true, undefined],
        [undefined, undefined, undefined, undefined],
      ],
    }));
  });

  it('CLEAR присваивает всем клеткам false', () => {
    const initialState = fromJS({
      size: {
        width: 3,
        height: 3,
      },
      cells: [
        [true, undefined, false],
        [undefined, true, undefined],
        [true, false, true],
      ],
    });
    const action = actionCreators.clear();
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      size: {
        width: 3,
        height: 3,
      },
      cells: [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ],
    }));
  });

  it('INVERT_CELL инвертирует клетку', () => {
    const initialState = fromJS({
      size: {
        width: 3,
        height: 3,
      },
      cells: [
        [true, undefined, false],
        [undefined, true, undefined],
        [true, false, true],
      ],
    });
    let action = actionCreators.invertCell(1, 0);
    let nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      size: {
        width: 3,
        height: 3,
      },
      cells: [
        [true, true, false],
        [undefined, true, undefined],
        [true, false, true],
      ],
    }));

    action = actionCreators.invertCell(1, 0);
    nextState = reducer(nextState, action);

    expect(nextState).to.equal(fromJS({
      size: {
        width: 3,
        height: 3,
      },
      cells: [
        [true, false, false],
        [undefined, true, undefined],
        [true, false, true],
      ],
    }));

    action = actionCreators.invertCell(2, 0);
    nextState = reducer(nextState, action);

    expect(nextState).to.equal(fromJS({
      size: {
        width: 3,
        height: 3,
      },
      cells: [
        [true, false, true],
        [undefined, true, undefined],
        [true, false, true],
      ],
    }));
  });

  it('STEP корректно рассчитывает следующее поколение', () => {
    const initialState = fromJS({
      size: {
        width: 5,
        height: 5,
      },
      cells: [
        [undefined, true, undefined, undefined, undefined],
        [undefined, undefined, true, undefined, undefined],
        [true, true, true, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined],
      ],
    });
    let action = actionCreators.step();
    let nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      size: {
        width: 5,
        height: 5,
      },
      cells: [
        [false, false, false, false, false],
        [true, false, true, false, false],
        [false, true, true, false, false],
        [false, true, false, false, false],
        [false, false, false, false, false],
      ],
    }));

    action = actionCreators.step();
    nextState = reducer(nextState, action);

    expect(nextState).to.equal(fromJS({
      size: {
        width: 5,
        height: 5,
      },
      cells: [
        [false, false, false, false, false],
        [false, false, true, false, false],
        [true, false, true, false, false],
        [false, true, true, false, false],
        [false, false, false, false, false],
      ],
    }));

    action = actionCreators.step();
    nextState = reducer(nextState, action);

    expect(nextState).to.equal(fromJS({
      size: {
        width: 5,
        height: 5,
      },
      cells: [
        [false, false, false, false, false],
        [false, true, false, false, false],
        [false, false, true, true, false],
        [false, true, true, false, false],
        [false, false, false, false, false],
      ],
    }));
  });
});
