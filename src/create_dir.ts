import { existsSync } from "fs";
import { dirname } from "path";
import { commands, FileType, Uri, window, workspace } from "vscode";
import { t } from "./language";

export const commandDirPrev = "zw.create_dir_";
export const commandsDirList = [
  "src",
  "dist",
  "lib",
  "assets",
  "docs",
  "tests",
  "config",
  "scripts",
  "temp",
  "public",
  "utils",
  "components",
  "pages",
  "views",
  "router",
  "store",
  "hooks",
  "styles",
  "plugins",
  "layouts",
  "controllers",
  "services",
  "handlers",
  "models",
  "routes",
  "middleware",
  "db",
  "api",
  "configs",
  "jobs",
  "empty",
];

export const createDirFun = async (uri: Uri, suffix: string) => {
  let suffixT: any = suffix;
  try {
    if (suffixT === "empty") {
      suffixT = await window.showInputBox({
        placeHolder: t("输入文件夹名称"),
      });
      if (suffixT === undefined) {
        return;
      }
      suffixT = `${suffixT || ""}`.trim();
      // 判断取消事件
      if (!suffixT) {
        window.showInformationMessage(`${t("文件夹名称不能为空")}`);
        return;
      }
    }

    const stat = await workspace.fs.stat(uri);
    // console.log("stat", stat);
    let uriTemp = uri;
    if (stat.type === FileType.File) {
      const dirPath = dirname(uri.fsPath);
      // console.log("dirPath", vscode.Uri.parse(dirPath));
      uriTemp = Uri.parse(`/${dirPath}`);
    }

    const filePath = Uri.joinPath(uriTemp, `${suffixT}`);

    if (existsSync(filePath.fsPath)) {
      window.showInformationMessage(`${suffixT} ${t("已存在")}`);
      return;
    }

    // 1. 创建文件
    await workspace.fs.createDirectory(filePath);

    // 2. 执行命令在资源管理器中选中该文件
    await commands.executeCommand("revealInExplorer", filePath);

    // vscode.window.showInformationMessage(`文件 ${fileName} 已创建`);
  } catch (error) {
    window.showErrorMessage(`${t("创建文件失败")}: ${error}`);
  }
};
