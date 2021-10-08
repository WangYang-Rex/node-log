

import shell = require('shelljs');
import { config } from '../../config/config';


type Status={
  code:0|128, // 错误码
  stdout:string, // 结果
  stderr:string, // 错误
};
type GetGitInfoParams={
  errType:'pc'|'mobile',
  file_name:string,
  line:string,
};
const gitUserName = {
  liujunxiong: {
    name: '黑草',
    userId: 'liujunxiong',
  },
  yeqi: {
    name: '黑草',
    userId: 'liujunxiong',
  },
  heicao: {
    name: '黑草',
    userId: 'liujunxiong',
  },
  华志林: {
    name: '林木',
    userId: 'linmu.hzl',
  },
  huazhilin: {
    name: '林木',
    userId: 'linmu.hzl',
  },
  zhilingege: {
    name: '林木',
    userId: 'linmu.hzl',
  },
  郭文芳: {
    name: '夏天',
    userId: 'guowenfang',
  },
  wangyang: {
    name: '大洋',
    userId: 'wangyang',
  },
  bucai: {
    name: '迷雾',
    userId: 'miwu.zq',
  },
  胡姿姿: {
    name: '天晴',
    userId: 'tianqing.hzz',
  },
  迷雾: {
    name: '迷雾',
    userId: 'miwu.zq',
  },
};

const getDirectoryName = errType => {
  if (errType === 'pc') {
    return config.crm.production.pc.directoryName;
  } else if (errType === 'mobile') {
    return config.crm.production.mb.directoryName;
  }

};
/**
 * 项目启动初始化
 */
const init = () => {
  console.log('-------git init------------------------------------------');

  shell.cd('gits');
  shell.rm('-rf', config.crm.production.pc.directoryName);
  shell.rm('-rf', config.crm.production.mb.directoryName);
  console.time('git close');
  // --depth=1
  const pcGitCloneStatus:Status = shell.exec(`git clone --branch=${config.crm.production.pc.branch}  ${config.crm.production.pc.git}`, { async: false, silent: true });
  console.log(`code:${pcGitCloneStatus.code},stdout:${pcGitCloneStatus.stdout},stderr:${pcGitCloneStatus.stderr}`, '------init----------1');

  const mbGitCloneStatus:Status = shell.exec(`git clone --branch=${config.crm.production.mb.branch}  ${config.crm.production.mb.git}`, { async: false, silent: true });
  console.log(`code:${mbGitCloneStatus.code},stdout:${mbGitCloneStatus.stdout},stderr:${mbGitCloneStatus.stderr}`, '------init----------2');

  console.timeEnd('git close');
  shell.cd('../');
};


const getGitInfo = (params:GetGitInfoParams):{name:string, userId:string}|null => {
  const { errType, file_name, line } = params;
  const fileName = file_name.split('///')[1];
  console.log('------getGitInfo 1', fileName);
  if (fileName.indexOf('node_modules') > -1) {
    return null;
  }
  shell.cd(`gits/${getDirectoryName(errType)}`);
  const gitBlameStatus:Status = shell.exec(`git blame -L ${line},${line} ${fileName}`, { async: false, silent: true });
  console.log('------getGitInfo 2', gitBlameStatus);
  if (gitBlameStatus.code === 0) {
    const userItem = Object.keys(gitUserName).find(userName => gitBlameStatus.stdout.indexOf(userName) > -1);
    console.log('------getGitInfo 3', userItem);
    shell.cd('../../');
    return userItem ? gitUserName[userItem] : null;
  }
  shell.cd('../../');
  return null;

};

const gitPull = (errType:Required<GetGitInfoParams>['errType']) => {
  shell.cd(`gits/${getDirectoryName(errType)}`);
  const gitPullStatus = shell.exec('git pull', { async: false });
  console.log('------gitPull 1', gitPullStatus);

  shell.cd('../../');
};


export { init, getGitInfo, gitPull };
// console.time('git pull');
// shell.cd('dingding-crm-pc');
// const pcGitPullStatus = shell.exec('git pull', { async: false, silent: true });
// shell.cd('../dingding-crm-mobile');
// const mbGitPullStatus = shell.exec('git pull', { async: false, silent: true });
// console.timeEnd('git pull');
// shell.cd('../dingding-crm-pc');
// console.log(pcGitCloneStatus.stdout, 'pcGitCloneStatus-----');

// const gitBlameStatus = shell.exec('git blame -L 100,100 src/sagas/app.js', { async: false, silent: true });


// console.log(gitBlameStatus.stdout, 'gitBlameStatus------');


// // if (!shell.which('git')) {
// //   shell.echo('Sorry, this script requires git');
// //   shell.exit(1);
// // }
// // shell.echo('hello world');


// // console.log('----');

