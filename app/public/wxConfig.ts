const path = require('path');

const WXConfig = {
  appID: 'wxb0ebfc55a6c688b0', // 微信公众平台-->基本配置中查看（我这里使用的是测试信息，权限很多）
  appsecret: '00af2fde7fe01eb04b68cbce80859d55',
  token: 'dS1hHxRN20Xqrx7xSvY0rLHJNxs5sH0x',
  accessTokenPath: path.resolve(__dirname, './accessToken.json'), // 保存accessToken的路径(注意 . 不要漏写了，否则路径就错了)
  jsapiTicketPath: path.resolve(__dirname, './jsapiTicket.json') // 保存jsapiTicket的路径(注意 . 不要漏写了，否则路径就错了)
}

// 获取随机字符串
const getNonceStr = (length = 16) => {
  let str = 'abcdefghijklmnopqrstuvwxyzABCKEFGHIJKLMNOPQRSTUVWXYZ1234567890' // 长度62
  // 取0-62的随机整数
  let max = str.length,
      min = 0
  let randomStr = ''
  for(let i = 0; i < length; i++) {
      randomStr += str.substr(Math.floor(Math.random() * (max - min + 1)) + min, 1) // 取两数之间的整数(包括这两个整数)
  }
  return randomStr
}

// 获取时间戳
const getTimestamp = () => {
  return Math.round(new Date().getTime() / 1000)
}

export {
  WXConfig,
}