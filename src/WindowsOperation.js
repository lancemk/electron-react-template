import React from 'react';

function WindowOperation() {
  function closeWindow() {
    // const remote = (window.require) ? window.require("electron").remote : null;
    const WIN = require("electron").remote.getCurrentWindow();
    // const win = remote.BrowserWindow.getAllWindows()[0];

    WIN.close();
  }

  function minimizeWindow() {
    // const remote = (window.require) ? window.require("electron").remote : null;
    const WIN = require("electron").remote.getCurrentWindow();
    // const win = remote.BrowserWindow.getAllWindows()[0];

    WIN.minimize();
  }

  return (
    <div className="Window-operations-container">
      <i className="far fa-window-minimize" style={{ lineHeight: "10px" }} onClick={minimizeWindow}></i>
      <i className="fas fa-times close" onClick={closeWindow}></i>
    </div>
  );
}

export default WindowOperation;