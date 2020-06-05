const { BrowserWindow, ipcMain, app, Notification } = require('electron');

let win;

app.on('ready', () => {
  win = new BrowserWindow({
    width: 400,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile('./index.html');
  ipcMain.handle('clock', handleClock);
});

const handleClock = async function() {
  const res = new Promise((resolve, reject) => {
    const nt = new Notification({
      title: 'Mission Completed!',
      body: 'Rest or Not?',
      actions: [{ type: 'button', text: 'Continue working' }],
      closeButtonText: 'Have a rest!',
    });
    nt.show();
    nt.on('action', () => {
      resolve('work');
    });
    nt.on('close', () => {
      resolve('rest');
    });
  });
  return res;
};
