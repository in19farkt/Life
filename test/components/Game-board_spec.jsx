import React from 'react';
import { List, fromJS } from 'immutable';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { GameBoard } from '../../src/components/Game-board/Game-board.jsx';

describe('<GameBoard/>', () => {
  it('перерисовывает GameBoard при изменении состояния', () => {
    let state = {
      width: 5,
      height: 5,
      cells: fromJS([
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
      ]),
    };

    const wrapper = mount(<GameBoard {...state} />);
    expect(wrapper.find('.game-board__cell').length).to.equal(25);

    state = {
      width: 5,
      height: 4,
      cells: fromJS([
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
      ]),
    };
    wrapper.setProps(state);

    expect(wrapper.find('.game-board__cell').length).to.equal(20);
  });

  it('корректно задает живые клетки', () => {
    const state = {
      width: 5,
      height: 5,
      cells: fromJS([
                [false, false, false, false, true],
                [false, true, false, false, false],
                [false, false, true, false, false],
                [true, false, false, false, false],
                [false, false, false, true, false],
      ]),
    };

    const wrapper = mount(<GameBoard {...state} />);

    expect(wrapper.find('.game-board__cell_is-live').length).to.equal(5);
    expect(wrapper.find('.game-board__cell').at(4)).to.have.className('game-board__cell_is-live');
    expect(wrapper.find('.game-board__cell').at(6)).to.have.className('game-board__cell_is-live');
    expect(wrapper.find('.game-board__cell').at(12)).to.have.className('game-board__cell_is-live');
    expect(wrapper.find('.game-board__cell').at(15)).to.have.className('game-board__cell_is-live');
    expect(wrapper.find('.game-board__cell').at(23)).to.have.className('game-board__cell_is-live');
  });

  it('событие onClick на клетках вызывает обработчик', () => {
    const onCellClick = sinon.spy();

    const state = {
      invertCell: onCellClick,
      width: 5,
      height: 5,
      cells: fromJS([
                [false, false, false, false, true],
                [false, true, false, false, false],
                [false, false, true, false, false],
                [true, false, false, false, false],
                [false, false, false, true, false],
      ]),
    };

    const wrapper = mount(<GameBoard {...state} />);
    wrapper.find('.game-board__cell').at(5).simulate('click');
    wrapper.find('.game-board__cell').at(7).simulate('click');
    wrapper.find('.game-board__cell').at(12).simulate('click');
    wrapper.find('.game-board__cell').at(15).simulate('click');
    wrapper.find('.game-board__cell').at(23).simulate('click');

    expect(onCellClick).to.have.property('callCount', 5);
  });
});
