// 파일 삭제하기
import * as fs from 'fs';

/**
 * @param filePath definite path including the file name itself
 * @description removes the existing file at the specified path
 */
export const removeFile = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    console.log(filePath);
    fs.unlinkSync(filePath);
  } else {
    console.log(`File ${filePath} does not exist`);
  }
};

export const removeDir = (dirPath: string) => {
  if (fs.existsSync(dirPath)) {
    fs.rmdirSync(dirPath, { recursive: true });
  }
};

export const removeFileOrDir = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    if (fs.lstatSync(filePath).isDirectory()) {
      removeDir(filePath);
    } else {
      removeFile(filePath);
    }
  }
};

export const createFile = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
  }
};

export const createDir = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};
