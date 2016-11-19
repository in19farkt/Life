import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import makeStore from './store';
import ControlPanel from './components/Control-panel/Control-panel';
import GameBoard from './components/Game-board/Game-board';

import './index.styl';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('./components/', true, /^\.\/.*\.(js)$/));

const store = makeStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <ControlPanel />
      <GameBoard />
    </div>
  </Provider>,
    document.getElementsByClassName('app')[0],
);

export default { store };
