import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'

const rootEl = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    rootEl
  );
}

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render);
  });
}

render();
serviceWorker.unregister();