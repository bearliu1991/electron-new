# 销大师客服聊天

> 销大师客服聊天系统（单窗口）

## electron相关
### electron应用app常用生命周期事件
ready应用初始化------>activate应用激活------>window-all-closed应用关闭
### eletron应用窗口broser-window常用生命周期事件
close窗口关闭事件------->
### eletron应用升级autoUpdater常用生命周期事件
checking-for-update初始检查更新（触发事件）------>update-available发现有可更新包并且自动开发------>没有可用更新包的时候出发------>download-progress正在更新过程中事件------> update-downloaded更新完成时出发（安装）------error升级过程中发生的错误事件（错误通知）
### ipcMain主进程事件（调用相关的事件方法）
min-window窗口最小化事件------> max-window窗口最大化事件 ------> close-window窗口关闭事件
### webContents窗口拥有的webContents对象，所有与网页相关的事件和操作通过它完成
### electron应用常用方法


## main主进程和rendder渲染进程通信
1. Win.webContents.send('mainMsg', {type, data});向页面发送信息
2. ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
}) 向页面发送信息
3. ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
}) 返回信息

4. ipcRenderer监听消息和发送消息

#### 开发日志

##### window客户端开发日志
```
1. 使用nsis工具打包安装包
2. 使用electron-updater工具软件升级
    更新流程：
```
##### mac客户端开发日志
```
1. code signing 代码签名
```
##### web应用开发日志
```

```