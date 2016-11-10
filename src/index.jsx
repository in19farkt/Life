function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

requireAll(require.context('./components/', true, /^\.\/.*\.(js)$/));
import './index.styl';


import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import makeStore from './store';
import {ControlPanelContainer} from './components/Control-panel/Control-panel.jsx';
import {GameBoardContainer} from './components/Game-board/Game-board.jsx'

export const store = makeStore();

ReactDOM.render(
    <Provider store={store}>
        <div>
            <ControlPanelContainer/>
            <GameBoardContainer/>
        </div>
    </Provider>,
    document.getElementsByClassName('app')[0]
);