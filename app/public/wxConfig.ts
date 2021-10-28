const path = require('path');

const WXConfig = {
  AppID: 'wxb0ebfc55a6c688b0', // 微信公众平台-->基本配置中查看（我这里使用的是测试信息，权限很多）
  AppSecret: '00af2fde7fe01eb04b68cbce80859d55',
  Token: 'dS1hHxRN20Xqrx7xSvY0rLHJNxs5sH0x',
  EncodingAESKey: 'vOdjqMUDaZdyNEeUdeziS0RwsCMIa9Fh1b5WoHpeEgd',
  // accessTokenPath: path.resolve(__dirname, './accessToken.json'), // 保存accessToken的路径(注意 . 不要漏写了，否则路径就错了)
  // jsapiTicketPath: path.resolve(__dirname, './jsapiTicket.json') // 保存jsapiTicket的路径(注意 . 不要漏写了，否则路径就错了)
}


export {
  WXConfig,
}