// アプリケーション作成用のモジュールを読み込み
const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;

let win;

function createWindow() {
  // メインウィンドウを作成します
  win = new BrowserWindow({width: 600, height: 400});

  // メインウィンドウに表示するURLを指定します
  // （今回はmain.jsと同じディレクトリのindex.html）
  win.loadURL(`file://${__dirname}/index.html`);

  // デベロッパーツールの起動
  //win.webContents.openDevTools();

  // メインウィンドウが閉じられたときの処理
  win.on('closed', () => {
    win = null;
  });
}

//  初期化が完了した時の処理
app.on('ready', createWindow);

// 全てのウィンドウが閉じたらアプリケーションを終了します
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
app.on('activate', () => {
  // メインウィンドウが消えている場合は再度メインウィンドウを作成する
  if (win === null) {
    createWindow();
  }
});
