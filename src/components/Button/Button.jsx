import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';


class Button extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    static propTypes = {
        text: React.PropTypes.string,       // текст
        size: React.PropTypes.string,       // размер ('', 'small')
        type: React.PropTypes.string,       // тип ('', 'error')
        isInverted: React.PropTypes.bool,   // инвертирование цвета (bool)
        isDisabled: React.PropTypes.bool,   // обработчик нажатия
        onClick: React.PropTypes.func       // состояние кнопки (bool)
    };

    static defaultProps = {
        text: 'Button',
        isDisabled: false,
        onClick: () => {}
    };

    render() {
        return <div
            className={classNames(
                'button',
                this.props.type ? 'button_' + this.props.type : '',
                this.props.size ? 'button_' + this.props.size : '',
                this.props.isInverted ? 'button_inverted' : ''
            )}
            onClick={() => this.props.onClick()}>
            <button disabled={this.props.isDisabled}>
                {this.props.text}
            </button>
        </div>
    }
}

export {Button};