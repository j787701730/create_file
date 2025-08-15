"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var import_vscode4 = require("vscode");

// src/create_dir.ts
var import_fs = require("fs");
var import_path = require("path");
var import_vscode2 = require("vscode");

// src/language.ts
var import_vscode = require("vscode");
var language = {
  en: {
    "\u8F93\u5165\u6587\u4EF6\u540D, \u9ED8\u8BA4\u6587\u4EF6\u540D\u4E3A index": "Input file name, default file name is index",
    \u5DF2\u5B58\u5728: "exists",
    \u521B\u5EFA\u6587\u4EF6\u5931\u8D25: "Create file failed",
    \u8F93\u5165\u6587\u4EF6\u5939\u540D\u79F0: "Input directory name",
    \u6587\u4EF6\u5939\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A: "Directory name cannot be empty",
    \u521B\u5EFA\u6587\u4EF6\u5939\u5931\u8D25: "Create directory failed"
  },
  "zh-tw": {
    "\u8F93\u5165\u6587\u4EF6\u540D, \u9ED8\u8BA4\u6587\u4EF6\u540D\u4E3A index": "\u8F38\u5165\u6A94\u6848\u540D\u7A31, \u9810\u8A2D\u6A94\u6848\u540D\u7A31\u70BA index",
    \u521B\u5EFA\u6587\u4EF6\u5931\u8D25: "\u5275\u5EFA\u6A94\u6848\u5931\u6557",
    \u8F93\u5165\u6587\u4EF6\u5939\u540D\u79F0: "\u8F38\u5165\u8CC7\u6599\u593E\u540D\u7A31",
    \u6587\u4EF6\u5939\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A: "\u8CC7\u6599\u593E\u540D\u7A31\u4E0D\u80FD\u70BA\u7A7A",
    \u521B\u5EFA\u6587\u4EF6\u5939\u5931\u8D25: "\u5275\u5EFA\u8CC7\u6599\u593E\u5931\u6557"
  }
};
var t = (value) => {
  const lang = import_vscode.env.language;
  return language?.[lang]?.[value] || value;
};

// src/create_dir.ts
var commandDirPrev = "zw.create_dir_";
var commandsDirList = [
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
  "empty"
];
var createDirFun = async (uri, suffix) => {
  let suffixT = suffix;
  try {
    if (suffixT === "empty") {
      suffixT = await import_vscode2.window.showInputBox({
        placeHolder: t("\u8F93\u5165\u6587\u4EF6\u5939\u540D\u79F0")
      });
      if (suffixT === void 0) {
        return;
      }
      suffixT = `${suffixT || ""}`.trim();
      if (!suffixT) {
        import_vscode2.window.showInformationMessage(`${t("\u6587\u4EF6\u5939\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A")}`);
        return;
      }
    }
    const stat = await import_vscode2.workspace.fs.stat(uri);
    let uriTemp = uri;
    if (stat.type === import_vscode2.FileType.File) {
      const dirPath = (0, import_path.dirname)(uri.fsPath);
      uriTemp = import_vscode2.Uri.parse(`/${dirPath}`);
    }
    const filePath = import_vscode2.Uri.joinPath(uriTemp, `${suffixT}`);
    if ((0, import_fs.existsSync)(filePath.fsPath)) {
      import_vscode2.window.showInformationMessage(`${suffixT} ${t("\u5DF2\u5B58\u5728")}`);
      return;
    }
    await import_vscode2.workspace.fs.createDirectory(filePath);
    await import_vscode2.commands.executeCommand("revealInExplorer", filePath);
  } catch (error) {
    import_vscode2.window.showErrorMessage(`${t("\u521B\u5EFA\u6587\u4EF6\u5931\u8D25")}: ${error}`);
  }
};

// src/create_file.ts
var import_fs2 = require("fs");
var import_path2 = require("path");
var import_vscode3 = require("vscode");
var commandPrev = "zw.create_";
var commandsList = [
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
  "empty"
];
var createFileFun = async (uri, suffix) => {
  try {
    let fileName = await import_vscode3.window.showInputBox({
      placeHolder: t("\u8F93\u5165\u6587\u4EF6\u540D, \u9ED8\u8BA4\u6587\u4EF6\u540D\u4E3A index")
    });
    if (fileName === void 0) {
      return;
    }
    if (!fileName) {
      fileName = "index";
    }
    const stat = await import_vscode3.workspace.fs.stat(uri);
    let uriTemp = uri;
    if (stat.type === import_vscode3.FileType.File) {
      const dirPath = (0, import_path2.dirname)(uri.fsPath);
      uriTemp = import_vscode3.Uri.parse(`/${dirPath}`);
    }
    const suffixT = suffix === "empty" ? "" : `.${suffix}`;
    const filePath = import_vscode3.Uri.joinPath(uriTemp, `${fileName}${suffixT}`);
    if ((0, import_fs2.existsSync)(filePath.fsPath)) {
      import_vscode3.window.showInformationMessage(`${fileName}${suffixT} ${t("\u5DF2\u5B58\u5728")}`);
      return;
    }
    await import_vscode3.workspace.fs.writeFile(filePath, Buffer.from(""));
    await import_vscode3.commands.executeCommand("revealInExplorer", filePath);
    await import_vscode3.window.showTextDocument(filePath);
  } catch (error) {
    import_vscode3.window.showErrorMessage(`${t("\u521B\u5EFA\u6587\u4EF6\u5931\u8D25")}: ${error}`);
  }
};

// src/extension.ts
var statusBar = import_vscode4.window.createStatusBarItem(import_vscode4.StatusBarAlignment.Left);
function activate(context) {
  commandsList.forEach((item) => {
    context.subscriptions.push(
      import_vscode4.commands.registerCommand(`${commandPrev}${item}`, async (uri) => {
        createFileFun(uri, item);
      })
    );
  });
  commandsDirList.forEach((item) => {
    context.subscriptions.push(
      import_vscode4.commands.registerCommand(`${commandDirPrev}${item}`, async (uri) => {
        createDirFun(uri, item);
      })
    );
  });
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
