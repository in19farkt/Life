import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as actionCreators from '../../action_creators';
import {connect} from 'react-redux';
import classNames from 'classnames';


// options.text - текст
// options.size - размер ('', 'small')
// options.type - тип ('', 'error')
// options.isInverted - инвертирование цвета (bool)
// options.onClick - обработчик нажатия
// options.isDisabled - состояние кнопки (bool)
export const Button = React.createClass({
    mixins: [PureRenderMixin],
    render: function () {
        let options = this.props.options || {};

        return <div
            className={classNames(
                'button',
                options.type ? 'button_' + options.type : '',
                options.size ? 'button_' + options.size : '',
                options.isInverted ? 'button_inverted' : ''
            )}
            onClick={() => options.onClick ? options.onClick() : undefined}>
            <button disabled={options.isDisabled || false}>
                {options.text || 'Button'}
            </button>
        </div>
    }
});