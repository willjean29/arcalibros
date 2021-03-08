import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {store} from './store/store'
import App from './App';
import './assets/css/general.css';
import './assets/css/loginstyles.css';
import './assets/css/signupstyles.css';
import './assets/css/jitsistyles.css';
import './assets/css/modalstyles.css';
import './assets/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);