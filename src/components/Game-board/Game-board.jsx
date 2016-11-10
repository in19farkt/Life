import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as actionCreators from '../../action_creators';
import {connect} from 'react-redux';
import classNames from 'classnames';

export const GameBoard = React.createClass({
    mixins: [PureRenderMixin],

    getCellStyle: function () {
        let flexBasis = 100 / this.props.width;
        let margin = flexBasis / 100;
        flexBasis -= 2 * margin;

        return {
            flexBasis: flexBasis + '%',
            margin: margin + '%'
        }
    },

    getCells: function () {
        let cells = [];
        let style = this.getCellStyle();
        for (let y = 0; y < this.props.height; y++) {
            for (let x = 0; x < this.props.width; x++) {
                cells.push(
                    <div className={classNames(
                            'game-board__cell',
                            this.props.cells.getIn([y, x]) ? 'game-board__cell_is-live' : '')}
                         onClick={() => this.props.invertCell(x, y)}
                         style={style}
                         key={x + '_' + y}
                    ></div>
                )
            }
        }

        return cells;
    },

    render: function () {
        return <div className="game-board">
            {this.getCells()}
        </div>
    }
});

function matStateToProps(state) {
    return {
        cells: state.get('cells'),
        width: state.getIn(['size', 'width']),
        height: state.getIn(['size', 'height'])
    }
}

export const GameBoardContainer = connect(
    matStateToProps,
    actionCreators
)(GameBoard);