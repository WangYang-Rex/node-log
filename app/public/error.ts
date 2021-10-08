
import * as fs from 'fs';
import fetch from 'node-fetch';

import * as path from 'path';
import * as SourceMap from 'source-map';
import { getErrorVisible, getMKText } from './dd';


type SourceErrorInfo = {
  errorType: 'js';
  stack: string;
  scriptURI: string;
  errorMessage: string;
  userName: string;
  userId: string;
  corpId: string;
  errType: 'mobile';
  error: string;
  hash: string;
  lineNo:string;
  columnNo:string;
  cname: string;
  line:string,
  column:string,
  fileName:string,
};
  type ErrorStack = {
    line: string;
    column: string;
    fileName: string;
  };

export type SourceMapParams = ErrorStack & {
  errorType: 'js';
  scriptURI: string;
  errorMessage: string;
  userName: string;
  userId: string;
  corpId: string;
  errType: 'mobile'|'pc';
  hash: string;
  cname: string;
  domainName?:string,
  visible?:'测试'|'正式',
  error:string,
};


const { readFileSync, existsSync } = fs;


// const rawSourceMapCache: { [key: string]: any } = {};


const getErrorStack = (error: string): ErrorStack | {} => {
  console.log('执行解析：getErrorStack -2');
  const splitKey = error.indexOf('\\n') > -1 ? '\\n' : '\n';
  try {
    const arr = error
      .split(splitKey)
      .filter(v => v.indexOf('.js') > -1)?.[0];
    if (!arr) {
      return {};
    }
    const stateArr = arr.replace(')', '')
      .split(':');
    const len = stateArr.length;
    const fileNameArr = stateArr[len - 3].split('/');
    const fileName = fileNameArr[fileNameArr.length - 1];
    return {
      line: stateArr[len - 2],
      column: stateArr[len - 1],
      fileName,
    };
  } catch (e) {
    console.log('解析错误：getErrorStack -3,错误信息：', e);
    return {};
  }
};

const getErrorInfoObj = (params: SourceErrorInfo): SourceMapParams => {
  const {
    userName,
    scriptURI,
    errorMessage,
    errorType,
    corpId,
    userId,
    errType,
    hash,
    cname,
    line,
    column,
    fileName,
    error,
  } = params;
  return {
    errorType,
    errorMessage,
    scriptURI,
    userName,
    userId,
    corpId,
    errType,
    hash,
    cname,
    column,
    line,
    fileName,
    error,
    ...getErrorVisible(scriptURI),
  };
};

// const getSourceMapFile = (_filePath:string) => {
//   try {
//     console.log('JSON.parse readFileSync 读取SourceMap缓存：-11');
//     return readFileSync(_filePath, 'utf8');
//   } catch (e) {
//     console.log('readFileSync 读取SourceMap缓存：-12');
//     return readFileSync(_filePath, 'utf8');
//   }
// };

const getRawSourceMap = (_filePath: string) => {
  console.log(_filePath, 'getRawSourceMap:_filePath');
  // if (rawSourceMapCache[_filePath]) {
  //   console.log('读取SourceMap缓存：-10');
  //   return rawSourceMapCache[_filePath];
  // }
  return readFileSync(_filePath, 'utf8');
  // const rawSourceMap = getSourceMapFile(_filePath);
  // rawSourceMapCache[_filePath] = rawSourceMap;
  // return rawSourceMapCache[_filePath];

};

const downloadFile = async (fileUrl:string, filename:string) => {
  const res = await fetch(fileUrl);
  console.log('downloadFile------', fileUrl);
  if (res.status === 200) {
    const dest = fs.createWriteStream(`./sourceMap/${filename}.map`);
    res.body.pipe(dest);
    return null;
  }
  return '下载路径有问题';

};

const getSourceMapInfo = async (params: SourceMapParams) => {
  const { fileName, column, line, errType, domainName, visible } = params;
  if (visible !== '正式') {
    console.log('其他环境，不做处理');
    return;
  }
  console.log('获取文件信息：getSourceMapInfo -4');
  if (!fileName) {
    console.log('获取文件信息：getSourceMapInfo -5 文件信息不存在');
    return {
      errorInfo: { ...params, source: { source: '找不到文件名称' } },
    };
  }
  try {

    const _filePath = path.resolve(__dirname, `../../sourceMap/${fileName}.map`);
    if (!existsSync(_filePath)) {
      console.log('文件找不到 -9,开始下载文件', _filePath);
      const downloadError = await downloadFile(`${domainName}/${errType}/${fileName}.map`, fileName);
      if (downloadError) {
        return {
          errorInfo: { ...params, source: { source: '下载有问题' } },
        };
      }
      console.log('------文件下载成功');
      if (existsSync(_filePath)) {
        console.log('------map文件已存在,下载成功');
      } else {
        console.log('------map文件下载失败');
        return {
          errorInfo: { ...params, source: { source: '找不到对应map文件' } },
        };
      }
    }

    const rawSourceMap = getRawSourceMap(_filePath);
    console.log('获取文件信息：getSourceMapInfo -6 拿到rawSourceMap');
    const consumer = new SourceMap.SourceMapConsumer(rawSourceMap);
    console.log('获取文件信息：getSourceMapInfo -7 consumer');
    const pos = consumer.originalPositionFor({ line: Number(line), column: Number(column) });
    const _params = { ...params, source: pos };
    console.log(
      '获取文件信息：getSourceMapInfo -7 解析完成，拿到数据',
    );
    const mKText = getMKText(_params);
    return {
      errorMk: mKText,
      errorInfo: _params,
    };
  } catch (e) {
    console.log('获取文件信息：getSourceMapInfo -8 解析错误，错误信息：', e);
    return null;
  }
};

const parseError = async (params: SourceErrorInfo) => {
  console.log('执行解析：-1');
  const errorInfo = getErrorInfoObj(params);
  console.log(errorInfo, 'errorInfo：-1');
  return getSourceMapInfo(errorInfo);
};


const getErrorKey = (params: Pick<SourceErrorInfo, 'errorType'|'errType'>&{
  source:string,
  name:string,
  column:string,
  line:string,
}) => {
  return `${params.errorType}-${params.errType}-${params.source}-${params.name}-${params.line}-${params.column}`;
};

export { parseError, getErrorKey, getErrorStack };
