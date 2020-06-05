const { ipcRenderer } = require('electron');
const Timer = require('timer.js');

const startWork = () => {
  const t = new Timer({
    ontick: updateTime,
    onend: stopWork,
  }).start(5);
};

const updateTime = (t) => {
  const c = document.getElementById('root');
  const ms = (t / 1000).toFixed(0);
  const m = (ms / 60).toFixed(0).padStart(2, 0);
  const s = (ms % 60).toString().padStart(2, 0);
  c.innerText = `${m}: ${s}`;
};

const stopWork = () => {
  ipcRenderer.invoke('clock').then((res) => {
    if (res === 'rest') {
      setTimeout(() => {
        let n = new Notification('Have a rest', { body: 'Rest 5 minutes!' });
      }, 0);
    } else if (res === 'work') {
      setTimeout(() => startWork(), 0);
    }
  })
};

startWork();
