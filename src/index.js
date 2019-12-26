import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter as Router} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import '@/assets/iconfont.css'

// const url = 'ws://localhost:8888/websocket'
// const ws = new WebSocket(url)

// componentDidMount () {
//   const login = {
//     type: 'login'
//   }
  
//   client.onopen = () => {
//     console.log('WebSocket Client Connected');
//     client.send(JSON.stringify(login))
//   }
//   client.onmessage = (message) => {
//     console.log(message);
//   };
// }

ReactDOM.render(
  <Router>
    <App />
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
