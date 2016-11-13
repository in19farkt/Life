import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as actionCreators from '../../action_creators';
import {connect} from 'react-redux';
import classNames from 'classnames';
import IPropTypes from 'immutable-props';
import {fromJS} from 'immutable';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    static propTypes = {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        cells: IPropTypes.List
    };

    static defaultProps = {
        cells: fromJS([[]])
    };

    getCellStyle() {
        let flexBasis = 100 / this.props.width;
        let margin = flexBasis / 100;
        flexBasis -= 2 * margin;

        return {
            flexBasis: flexBasis + '%',
            margin: margin + '%'
        }
    }

    getCells() {
        let cells = [];
        let style = this.getCellStyle();

        this.props.cells.map((row, y) => {
            row.map((cell, x) => {
                cells.push(
                    <div className={classNames(
                        'game-board__cell',
                        cell ? 'game-board__cell_is-live' : '')}
                         onClick={() => this.props.invertCell(x, y)}
                         style={style}
                         key={x + '_' + y}
                    ></div>
                )
            })
        });

        return cells;
    }

    render() {
        return <div className="game-board">
            {this.getCells()}
        </div>
    }
}

function matStateToProps(state) {
    return {
        cells: state.get('cells'),
        width: state.getIn(['size', 'width']),
        height: state.getIn(['size', 'height'])
    }
}

const GameBoardContainer = connect(
    matStateToProps,
    actionCreators
)(GameBoard);

export default GameBoardContainer;
export {GameBoard};