import { existsSync } from "fs";
import { dirname } from "path";
import { commands, FileType, Uri, window, workspace } from "vscode";
import { t } from "./language";

export const commandPrev = "zw.create_";
export const commandsList = [
  "html",
  "ts",
  "tsx",
  "vue",
  "dart",
  "svelte",
  "css",
  "module.css",
  "php",
  "go",
  "js",
  "c",
  "h",
  "cpp",
  "java",
  "cs",
  "rs",
  "swift",
  "kt",
  "py",
  "mjs",
  "scss",
  "sass",
  "less",
  "json",
  "yaml",
  "md",
  "toml",
  "bat",
  "jl",
  "lua",
  "sh",
  "ini",
  "empty",
];

export const createFileFun = async (uri: Uri, suffix: string) => {
  try {
    // uri 参数为当前右键点击的目录路径
    let fileName = await window.showInputBox({
      placeHolder: t("输入文件名, 默认文件名为 index"),
    });

    // 判断取消事件
    if (fileName === undefined) {
      return;
    }

    if (!fileName) {
      fileName = "index";
    }
    const stat = await workspace.fs.stat(uri);
    let uriTemp = uri;
    if (stat.type === FileType.File) {
      const dirPath = dirname(uri.fsPath);
      // console.log("dirPath", vscode.Uri.parse(dirPath));
      uriTemp = Uri.parse(`/${dirPath}`);
    }
    const suffixT = suffix === "empty" ? "" : `.${suffix}`;

    const filePath = Uri.joinPath(uriTemp, `${fileName}${suffixT}`);

    if (existsSync(filePath.fsPath)) {
      window.showInformationMessage(`${fileName}${suffixT} ${t("已存在")}`);
      return;
    }

    // 1. 创建文件
    await workspace.fs.writeFile(filePath, Buffer.from(""));

    // 2. 执行命令在资源管理器中选中该文件
    await commands.executeCommand("revealInExplorer", filePath);

    // 可选：同时打开文件
    await window.showTextDocument(filePath);

    // vscode.window.showInformationMessage(`文件 ${fileName} 已创建`);
  } catch (error) {
    window.showErrorMessage(`${t("创建文件失败")}: ${error}`);
  }
};
