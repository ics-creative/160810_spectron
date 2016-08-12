const Application = require("spectron").Application;
const assert = require("assert");
const path = require("path");

// Electronの実行ファイルまでのパス ( ../node_modules/.bin/electron.cmd )
const isWindows = process.platform === "win32";
const ext = isWindows ? ".cmd" : "";
const electronPath = path.join(__dirname, "..", "node_modules", ".bin", "electron" + ext);

// Electronのアプリ起動パス。testフォルダーからの相対パス「../」
const appPath = path.join(__dirname, "..");

// アプリケーション
const app = new Application({
  // Electronの実行ファイルまでのパス
  path: electronPath,
  // electronを実行する際の引数
  args: [appPath]
});

// Promiseを使用して、非同期処理を実行している。
app.start().then(function () {
  // ウィンドウの表示状態を取得する
  return app.browserWindow.isVisible();
}).then(function (isVisible) {
  // ウィンドウが表示されているか
  assert.equal(isVisible, true);
}).then(function () {
  // ウィンドウのタイトルを取得する
  return app.client.getTitle();
}).then(function (title) {
  // ウィンドウのタイトルが"My App"であるか
  assert.equal(title, "My App")
}).then(function () {
  // 終わったらアプリケーションを停止する
  console.info("Test Success");
  return app.stop();
}).catch(function (error) {
  // エラーをキャッチしたら、テストがエラーした旨のメッセージを表示する
  console.error("Test failed", error.message);
  return app.stop();
});