import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as actionCreators from '../../action_creators';
import {connect} from 'react-redux';
import {Button} from '../Button/Button.jsx'

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    static propTypes = {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        isStarted: React.PropTypes.bool
    };

    buttonIsDisabled() {
        return !(this.props.width && this.props.height && this.props.width >= 3 && this.props.height >=3)
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    render() {
        return <div className="control-panel">
            {this.props.isStarted ?
                <Button {...{
                    text: 'pause',
                    onClick: this.props.pause,
                    isDisabled: this.buttonIsDisabled()}}/> :
                <Button {...{
                    text: 'start',
                    onClick: this.props.start,
                    isDisabled: this.buttonIsDisabled()}}/>}

            <Button {...{
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
}

function mapStateToProps(state) {
    return {
        isStarted: state.get('isStarted'),
        width: state.getIn(['size', 'width']),
        height: state.getIn(['size', 'height'])
    }
}

const ControlPanelContainer = connect(
    mapStateToProps,
    actionCreators
)(ControlPanel);

export default ControlPanelContainer;
export {ControlPanel};