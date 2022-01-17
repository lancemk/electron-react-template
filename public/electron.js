// Module to control the application lifecycle and the native browser window.
const { app, BrowserWindow, protocol, Tray, Menu } = require("electron");
const path = require("path");
// const url = require("url");
let mainWindow;

// Create the native browser window.
function createMainWindow() {
  let win = new BrowserWindow({
    title: "Storm Desktop",
    width: 1280,
    height: 800,
    icon: path.join(__dirname, ''),
    // Set the path of an additional "preload" script that can be used to
    // communicate between node-land and browser-land.
    webPreferences: {
      // preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true
    },

    frame: false,
    autoHideMenuBar: true,
    center: true,
    thickFrame: true,
    resizable: false,
    transparent: true,
  });

  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  // const appURL = app.isPackaged
  //   ? url.format({
  //     pathname: path.join(__dirname, "index.html"),
  //     protocol: "file:",
  //     slashes: true,
  //   })
  //   : "http://localhost:3000";
  // win.loadURL(appURL);

  // // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }

  const appURL = "http://localhost:3000";
  win.loadURL(appURL).then(() => console.log("URL loaded."));

  let tray = null;
  win.on('minimize', function (event) {
    event.preventDefault();
    win.setSkipTaskbar(true);
    tray = createTray();
  });

  win.on('restore', function (event) {
    win.show();
    win.setSkipTaskbar(false);
    tray.destroy();
  });

  return win;

}

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).
// function setupLocalFilesNormalizerProxy() {
//   protocol.registerHttpProtocol(
//     "file",
//     (request, callback) => {
//       const url = request.url.substr(8);
//       callback({ path: path.normalize(`${__dirname}/${url}`) });
//     },
//     (error) => {
//       if (error) console.error("Failed to register protocol");
//     }
//   );
// }

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {
//   createMainWindow();
//   setupLocalFilesNormalizerProxy();

//   app.on("activate", function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createMainWindow();
//     }
//   });
// });

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// If your app has no need to navigate or only needs to navigate to known pages,
// it is a good idea to limit navigation outright to that known scope,
// disallowing any other kinds of navigation.
// const allowedNavigationDestinations = "https://my-electron-app.com";
// app.on("web-contents-created", (event, contents) => {
//   contents.on("will-navigate", (event, navigationUrl) => {
//     const parsedUrl = new URL(navigationUrl);
//     if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
//       event.preventDefault();
//     }
//   });
// });

function createTray() {
  let appIcon = new Tray(path.join(__dirname, "cloud_fun.ico"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show', click: function () {
        mainWindow.show();
      }
    },
    {
      label: 'Exit', click: function () {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);

  appIcon.on('double-click', function (event) {
    mainWindow.show();
  });
  appIcon.setToolTip('Tray Tutorial');
  appIcon.setContextMenu(contextMenu);
  return appIcon;
}

app.whenReady().then(() => {
  mainWindow = createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.