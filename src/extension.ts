// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as path from "path";
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
const statusBar = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Left
);
function setStatusBarText() {
  statusBar.text = "create_file";
}

const commandPrev = "zw.create_";
const commandsList = [
  "html",
  "ts",
  "tsx",
  "vue",
  "dart",
  "svelte",
  "css",
  "module.css",
  'php',
  'go'
];

const createFileFun = async (uri: vscode.Uri, suffix: string) => {
  try {
    // uri 参数为当前右键点击的目录路径
    let fileName = await vscode.window.showInputBox({
      placeHolder: "输入文件名",
    });

    if (!fileName) {
      fileName = "index";
    }
    const stat = await vscode.workspace.fs.stat(uri);
    let uriTemp = uri;
    if (stat.type === vscode.FileType.File) {
      const dirPath = path.dirname(uri.fsPath);
      // console.log("dirPath", vscode.Uri.parse(dirPath));
      uriTemp = vscode.Uri.parse(`/${dirPath}`);
    }

    const filePath = vscode.Uri.joinPath(uriTemp, `${fileName}.${suffix}`);
    // 1. 创建文件
    await vscode.workspace.fs.writeFile(filePath, Buffer.from(""));

    // 2. 执行命令在资源管理器中选中该文件
    await vscode.commands.executeCommand("revealInExplorer", filePath);

    // 可选：同时打开文件
    await vscode.window.showTextDocument(filePath);

    // vscode.window.showInformationMessage(`文件 ${fileName} 已创建`);
  } catch (error) {
    vscode.window.showErrorMessage(`创建文件失败: ${error}`);
  }
};

export function activate(context: vscode.ExtensionContext) {
  setStatusBarText();
  statusBar.show();
  commandsList.forEach((item) => {
    context.subscriptions.push(
      vscode.commands.registerCommand(
        `${commandPrev}${item}`,
        async (uri: vscode.Uri) => {
          createFileFun(uri, item);
        }
      )
    );
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
