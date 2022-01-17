import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WindowOperation from "./WindowsOperation";

import reportWebVitals from './reportWebVitals';

if (window.process) {
  window.process.on('uncaughtException', function (error) {
    const { app, dialog } = window.require("electron").remote;
    dialog.showMessageBoxSync({ type: 'error', message: "Unexpected error occurred. Restarting the application.", title: "Error" });
    app.relaunch();
    app.quit();
  });
}

ReactDOM.render(
  <React.StrictMode>
    <WindowOperation />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
