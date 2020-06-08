const { BrowserWindow, ipcMain, app, Notification } = require('electron');

let win;

// app.accessibilitySupportEnabled(true);

app.on('ready', () => {
  win = new BrowserWindow({
    width: 200,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile('./index.html');
  ipcMain.handle('clock', handleClock);
  // win.webContents.openDevTools();  // 开启控制台
});

const handleClock = async function() {
  const res = new Promise((resolve, reject) => {
    const nt = new Notification({
      title: '番茄时间到！',
      body: '是否开始休息?',
      actions: [{ type: 'button', text: '继续下一个番茄！' }],
      closeButtonText: '休息一会儿～',
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

app.on('window-all-closed', () => {
  app.quit()
});
