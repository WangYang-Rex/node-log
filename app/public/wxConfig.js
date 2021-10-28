"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WXConfig = void 0;
const path = require('path');
const WXConfig = {
    appID: 'wxb0ebfc55a6c688b0',
    appsecret: '00af2fde7fe01eb04b68cbce80859d55',
    token: 'dS1hHxRN20Xqrx7xSvY0rLHJNxs5sH0x',
    accessTokenPath: path.resolve(__dirname, './accessToken.json'),
    jsapiTicketPath: path.resolve(__dirname, './jsapiTicket.json') // 保存jsapiTicket的路径(注意 . 不要漏写了，否则路径就错了)
};
exports.WXConfig = WXConfig;
// 获取随机字符串
const getNonceStr = (length = 16) => {
    let str = 'abcdefghijklmnopqrstuvwxyzABCKEFGHIJKLMNOPQRSTUVWXYZ1234567890'; // 长度62
    // 取0-62的随机整数
    let max = str.length, min = 0;
    let randomStr = '';
    for (let i = 0; i < length; i++) {
        randomStr += str.substr(Math.floor(Math.random() * (max - min + 1)) + min, 1); // 取两数之间的整数(包括这两个整数)
    }
    return randomStr;
};
// 获取时间戳
const getTimestamp = () => {
    return Math.round(new Date().getTime() / 1000);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3hDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3eENvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFN0IsTUFBTSxRQUFRLEdBQUc7SUFDZixLQUFLLEVBQUUsb0JBQW9CO0lBQzNCLFNBQVMsRUFBRSxrQ0FBa0M7SUFDN0MsS0FBSyxFQUFFLGtDQUFrQztJQUN6QyxlQUFlLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLENBQUM7SUFDOUQsZUFBZSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLG9CQUFvQixDQUFDLENBQUMsdUNBQXVDO0NBQ3ZHLENBQUE7QUFxQkMsNEJBQVE7QUFuQlYsVUFBVTtBQUNWLE1BQU0sV0FBVyxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2xDLElBQUksR0FBRyxHQUFHLGdFQUFnRSxDQUFBLENBQUMsT0FBTztJQUNsRixhQUFhO0lBQ2IsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFDaEIsR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUNYLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNsQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzVCLFNBQVMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFDLG9CQUFvQjtLQUNyRztJQUNELE9BQU8sU0FBUyxDQUFBO0FBQ2xCLENBQUMsQ0FBQTtBQUVELFFBQVE7QUFDUixNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUU7SUFDeEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFDaEQsQ0FBQyxDQUFBIn0=