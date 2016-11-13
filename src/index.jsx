function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

requireAll(require.context('./components/', true, /^\.\/.*\.(js)$/));
import './index.styl';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import makeStore from './store';
import ControlPanel from './components/Control-panel/Control-panel.jsx';
import GameBoard from './components/Game-board/Game-board.jsx'

export const store = makeStore();

ReactDOM.render(
    <Provider store={store}>
        <div>
            <ControlPanel/>
            <GameBoard/>
        </div>
    </Provider>,
    document.getElementsByClassName('app')[0]
);