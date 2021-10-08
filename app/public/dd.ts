
import { Context } from 'egg';
import { crmProductionDomainName, crmTestDomainName } from './../../config/config';

const getErrorVisible = (scriptURI: string):{
  visible?:'测试'|'正式',
  domainName?:string,
} => {
  if (!scriptURI) {
    return {};
  }
  const _crmTestDomainName = crmTestDomainName.find(_domainName => {
    return scriptURI.indexOf(_domainName) > -1;
  });
  if (_crmTestDomainName) {
    return {
      visible: '测试',
      domainName: _crmTestDomainName,
    };
  }
  const _crmProductionDomainName = crmProductionDomainName.find(_domainName => {
    return scriptURI.indexOf(_domainName) > -1;
  });
  if (_crmProductionDomainName) {
    return {
      visible: '正式',
      domainName: _crmProductionDomainName,
    };
  }
  return {};
};

const getMKText = item => {
  return ` 
    \n ### ${item.errorMessage}
     \n **用户名**：${item.userName}   
     \n **企业名称**：${item.cname}  【${item.visible}环境】
     \n **userId** ：${item.userId}
     \n **corpId** ：${item.corpId}
     \n **错误信息名称** ：${item.source.name}
     \n **错误信息源文件名称** ：${item.source.source}
      \n **错误信息列** ：${item.source.column}
      \n **错误信息行** ：${item.source.line}
      \n **其他**：${item.errorType} ${item.errType}
      \n **路由**：${item.hash} 
      `;
};

/**
 *
 * @param params
 * @param ctx
 * @return
 */
const sendMessageParams = async (params:{text?:string, title?:string, atUserIds?:string[], msgtype:'markdown'|'text', content?:string}, ctx:Context) => {
  const { text, title, atUserIds = [], msgtype = 'markdown', content } = params;
  const userIdMap = {
    黑草: 'liujunxiong',
    大洋: 'wangyang',
    林木: 'linmu.hzl',
    夏天: 'guowenfang',
    天晴: 'tianqing.hzz',
    竹风: 'zhufeng.th',
    迷雾: 'miwu.zq',
  };
  const result = await ctx.curl('https://oapi.dingtalk.com/robot/send?access_token=1b790e321ffb62e6b68e37aab46c25432fcdd023b511671b8439b0c98b5aaed1', {
    // 必须指定 method
    method: 'POST',
    // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
    contentType: 'json',
    data: {
      msgtype,
      ...(msgtype === 'markdown' ? {
        markdown: {
          title,
          text,
        },
      } : {
        text: {
          content,
        },
        at: {
          atUserIds: atUserIds.map(userName => userIdMap[userName]),
        },
      }),
    },
    // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
    dataType: 'json',
  });
  console.log('推送信息发送钉钉群---');
  return result;
};


export { sendMessageParams, getMKText, getErrorVisible };
