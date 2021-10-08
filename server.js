/* eslint-disable @typescript-eslint/no-var-requires */

const shell = require('shelljs');

// 成功执行 tsc 的编译为 js之后，再启动 egg,最终在生产环境下，跑的是js代码
const tscOutput = shell.exec('npm run tsc1', { async: false, silent: false });
console.log(
  `code:${tscOutput.code},stdout:${tscOutput.stdout},stderr:${tscOutput.stderr}`,
  '------npm run tsc1----------',
);

const egg = require('egg');
const git_1 = require('./app/git');
const os = require('os');

const workers = Number(process.argv[2] || os.cpus().length);

egg.startCluster(
  {
    workers,
    baseDir: __dirname,
    port: 10482,
  },
  () => {
    /** 执行git clone crm 2个项目目前是10秒左右，能够接受，后续其他项目加入策略再改*/
    git_1.init();
    return null;
  },
);
