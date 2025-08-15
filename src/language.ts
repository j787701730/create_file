import { env } from "vscode";

const language: { [key: string]: any } = {
  en: {
    "输入文件名, 默认文件名为 index": "Input file name, default file name is index",
    已存在: "exists",
    创建文件失败: "Create file failed",
    输入文件夹名称: "Input directory name",
    文件夹名称不能为空: "Directory name cannot be empty",
    创建文件夹失败: "Create directory failed",
  },
  "zh-tw": {
    "输入文件名, 默认文件名为 index": "輸入檔案名稱, 預設檔案名稱為 index",
    创建文件失败: "創建檔案失敗",
    输入文件夹名称: "輸入資料夾名稱",
    文件夹名称不能为空: "資料夾名稱不能為空",
    创建文件夹失败: "創建資料夾失敗",
  },
};

export const t = (value: string): string => {
  const lang = env.language;
  return language?.[lang]?.[value] || value;
};
