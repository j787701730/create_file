// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  commands,
  ExtensionContext,
  StatusBarAlignment,
  Uri,
  window,
} from "vscode";
import { commandDirPrev, commandsDirList, createDirFun } from "./create_dir";
import { commandPrev, commandsList, createFileFun } from "./create_file";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
const statusBar = window.createStatusBarItem(StatusBarAlignment.Left);
// function setStatusBarText() {
//   statusBar.text = "create_file";
// }

export function activate(context: ExtensionContext) {
  // setStatusBarText();
  // statusBar.show();
  /** 创建文件 */
  commandsList.forEach((item) => {
    context.subscriptions.push(
      commands.registerCommand(`${commandPrev}${item}`, async (uri: Uri) => {
        createFileFun(uri, item);
      })
    );
  });

  /** 创建文件夹 */
  commandsDirList.forEach((item) => {
    context.subscriptions.push(
      commands.registerCommand(`${commandDirPrev}${item}`, async (uri: Uri) => {
        createDirFun(uri, item);
      })
    );
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
