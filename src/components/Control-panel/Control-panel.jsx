import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as actionCreators from '../../action_creators';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {Button} from '../Button/Button.jsx'

export const ControlPanel = React.createClass({
    mixins: [PureRenderMixin],
    buttonIsDisabled: function() {
        return !(this.props.width && this.props.height && this.props.width >= 3 && this.props.height >=3)
    },
    isNumeric: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    render: function () {
        return <div className="control-panel">
            {this.props.isStarted ?
                <Button options={{
                    text: 'pause',
                    onClick: this.props.pause,
                    isDisabled: this.buttonIsDisabled()}}/> :
                <Button options={{
                    text: 'start',
                    onClick: this.props.start,
                    isDisabled: this.buttonIsDisabled()}}/>}

            <Button options={{
                text: 'clear',
                onClick: this.props.clear,
                isDisabled: this.buttonIsDisabled()}}/>

            <input
                className="control-panel__input-width"
                type="text"
                placeholder="Enter width"
                onBlur={(e) => {
                    if (this.isNumeric(e.target.value))
                        this.props.changeSizeX(e.target.value)}
                }/>
            <input
                className="control-panel__input-height"
                type="text"
                placeholder="Enter height"
                onBlur={(e) => {
                    if (this.isNumeric(e.target.value))
                        this.props.changeSizeY(e.target.value)}
                }/>

        </div>;
    }
});

function mapStateToProps(state) {
    return {
        isStarted: state.get('isStarted'),
        width: state.getIn(['size', 'width']),
        height: state.getIn(['size', 'height'])
    }
}

export const ControlPanelContainer = connect(
    mapStateToProps,
    actionCreators
)(ControlPanel);