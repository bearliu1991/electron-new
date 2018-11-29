import {  BrowserWindow, ipcMain, net, shell} from 'electron';
const app = require('electron').app;
const Path = require("path");
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');
const fs = require('fs');
var zlib = require('zlib')
var child = require('child_process');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitboresolves.io/electron-vue/content/en/using-static-assets.html
 */
// if (process.env.NODE_ENV !== 'development') {
//   global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
// }

let Win // 窗口对象
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080` : `file://${__dirname}/index.html`

function createWindow (width = 340, height = 420) {
  Win = new BrowserWindow({
    width: width,
    height: height,
    useContentSize: true
  })
  Win.loadURL(winURL)
  Win.webContents.openDevTools() //{mode: 'detach'}
  Win.on('closed', () => {
    Win = null;
  })
}
// 热更新
ipcMain.on('excuteHot', (e, msg) => {
  execWorkPro();
})
// 热更新
ipcMain.on('enlarge', (e, msg) => {
  Win.setSize(1000, 800)
})

// 将工作进程吊起
function execWorkPro(){
  const bat = child.spawn(Path.join(Path.resolve(), '..\\check\\销大师.exe'),{
    detached: true,
    stdio: 'ignore'
  })
  bat.unref();
  process.abort();
  process.on('beforeExit',function(){

  })
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (Win === null) {
    createWindow()
  }
})

async function getFile(url) {
  let data = await httpRequest(url)
  Win.webContents.send('msgFromMain', fs.createReadStream);
}
function httpRequest(opt,res) {
  return new Promise((resolve,reject)=>{
    let req = net.request(opt);
    req.on('error',err=>reject(err));
    req.on('response',response=>{
      // if(response.statusCode != 200){
      //   reject(new Error(`response code:${response.statusCode};${opt.url}`));
      // }
      if(res){
        return resolve(response);
      }
      let buf = null
      //使用流完成复制文件操作
      response.on('error',err=>reject(err));

      response.on('data',chunk=>{
        if(!buf){
          buf = Buffer.from(chunk);
        }else{
          buf = Buffer.concat([buf,chunk]);
        }
      });
      response.on('aborted',()=>{
        reject(
          new Error('response aborted')
        )
      })
      response.on('end',()=>{
        // const type = response.headers['content-type'][0];
        //  if(type.includes('application/json')){
        //    resolve(JSON.parse(buf.toString()));
        //  }else if(type.includes('text')){
        //   resolve(buf.toString());
        //  }else {
        resolve(buf)
        // }
      });
    })
    req.end();
  })
}
function sendStatusToWindow (type, data) {
  log.info(data);
  Win.webContents.send('mainMsg', {type, data});
}
// autoUpdater.autoDownload = false
autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('checking', 'Checking for update...')
})
autoUpdater.on('update-available', (info) => {
  let updateInfo = info.version + ',' + info.files[0].size + ',' + info.detail
  sendStatusToWindow('updateAvail', info)
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('updataNotAvail', 'Update not available.')
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('updateErr', err)
})
autoUpdater.on('download-progress', (progressObj) => {
  let message = 'Download speed: ' + progressObj.bytesPerSecond
  message = message + ' - Downloaded ' + progressObj.percent + '%'
  message = message + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
  let percent = progressObj.percent
  let info = percent + ',' + progressObj.total
  sendStatusToWindow('updateProgress', percent)
 
})
autoUpdater.on('update-downloaded', (info) => {
  autoUpdater.quitAndInstall()
})
// app.on('ready', function () {
//   const menu = Menu.buildFromTemplate(template)
//   Menu.setApplicationMenu(menu)
//   createDefaultWindow()
// })
app.on('window-all-closed', () => {
  app.quit()
})
ipcMain.on('checkVersion', (event) => {
  autoUpdater.checkForUpdates();
})
ipcMain.on('close', (event) => {
  win.close()
})
ipcMain.on('minimize', (event) => {
  win.minimize()
})
ipcMain.on('get-app-version', (event) => {
  event.sender.send('got-app-version', app.getVersion())
})
