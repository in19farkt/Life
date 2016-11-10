import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import {ControlPanel} from '../../src/components/Control-panel/Control-panel.jsx';

describe('<ControlPanel/>', () => {

    it('Перерисовывает кнопки "Start" и "Pause", в зависимости от свойства isStarted', () => {
        const wrapper = mount(<ControlPanel isStarted={false}/>);

        expect(wrapper.find('button').length).to.equal(2);
        expect(wrapper.find('button').at(0).text().toLowerCase()).to.contain('start');
        expect(wrapper.find('button').at(0).text().toLowerCase()).to.not.contain('pause');

        wrapper.setProps({isStarted: true});

        expect(wrapper.find('button').length).to.equal(2);
        expect(wrapper.find('button').at(0).text().toLowerCase()).to.not.contain('start');
        expect(wrapper.find('button').at(0).text().toLowerCase()).to.contain('pause');
    });

    it('Кнопки не доступны пока не заданы размеры не менее 3х3', () => {
        const wrapper = mount(<ControlPanel/>);

        expect(wrapper.find('button').at(0)).to.be.disabled();
        expect(wrapper.find('button').at(1)).to.be.disabled();

        wrapper.setProps({width: 2, height: 3});

        expect(wrapper.find('button').at(0)).to.be.disabled();
        expect(wrapper.find('button').at(1)).to.be.disabled();

        wrapper.setProps({width: 3});

        expect(wrapper.find('button').at(0)).to.not.be.disabled();
        expect(wrapper.find('button').at(1)).to.not.be.disabled();
    });

    it('событие onBlur на инпутах вызывает обработчик только если введено число', () => {
        const onInputWidthBlur = sinon.spy();
        const onInputHeightBlur = sinon.spy();

        const wrapper = mount(<ControlPanel changeSizeX={onInputWidthBlur} changeSizeY={onInputHeightBlur}/>);

        wrapper.find('input').at(0).simulate('blur', {target: {value: 'text'}});
        wrapper.find('input').at(1).simulate('blur', {target: {value: 'text'}});

        expect(onInputWidthBlur).to.have.property('callCount', 0);
        expect(onInputHeightBlur).to.have.property('callCount', 0);

        wrapper.find('input').at(0).simulate('blur', {target: {value: '21'}});
        wrapper.find('input').at(1).simulate('blur', {target: {value: '11'}});

        expect(onInputWidthBlur).to.have.property('callCount', 1);
        expect(onInputHeightBlur).to.have.property('callCount', 1);
    });

    it('событие onClick на кнопках вызывает соответствующие обработчики', () => {
        const onBtnStartClick = sinon.spy();
        const onBtnPauseClick = sinon.spy();
        const onBtnClearClick = sinon.spy();

        const wrapper = mount(
            <ControlPanel
                width={3}
                height={3}
                start={onBtnStartClick}
                pause={onBtnPauseClick}
                clear={onBtnClearClick}
            />
        );

        wrapper.find('button').at(0).simulate('click');
        wrapper.find('button').at(1).simulate('click');
        wrapper.setProps({isStarted: true});
        wrapper.find('button').at(0).simulate('click');

        expect(onBtnStartClick).to.have.property('callCount', 1);
        expect(onBtnPauseClick).to.have.property('callCount', 1);
        expect(onBtnClearClick).to.have.property('callCount', 1);
    })

});