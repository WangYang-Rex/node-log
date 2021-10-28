"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("../core/base_controller");
const wxConfig_1 = require("../public/wxConfig");
const crypto = require('crypto');
class Wxapi extends base_controller_1.default {
    async test() {
        const { ctx } = this;
        const query = ctx.request.query;
        const { api } = query;
        if (api) {
            switch (api) {
                case 'getAccessToken': {
                    const access_token = await this.service.wxapi.getAccessToken();
                    this.success('getAccessToken', access_token);
                    break;
                }
                case 'getJsApiTicket': {
                    const jsapi_ticket = await this.service.wxapi.getJsApiTicket();
                    this.success('success', jsapi_ticket);
                    break;
                }
                // case 'getAccessToken': {
                //   await this.getAccessToken();
                //   break;
                // }
                default: {
                    this.success('未找到对应的api');
                }
            }
        }
        else {
            this.success('未找到api参数');
        }
    }
    // async getAccessToken () {
    //   const access_token = await this.service.wxapi.getAccessToken();
    //   this.success('getAccessToken', access_token);
    // }
    // 微信接入验证 https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html
    async callback() {
        const { ctx } = this;
        const query = ctx.request.query;
        //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
        const { signature = '', timestamp = '', nonce = '', echostr = '', } = query;
        console.log(signature, timestamp, nonce, echostr);
        //2.将token、timestamp、nonce三个参数进行字典序排序
        let array = [wxConfig_1.WXConfig.Token, timestamp, nonce];
        array.sort();
        //3.将三个参数字符串拼接成一个字符串进行sha1加密
        let tempStr = array.join('');
        const hashCode = crypto.createHash('sha1'); //创建加密类型 
        var resultCode = hashCode.update(tempStr, 'utf8').digest('hex'); //对传入的字符串进行加密
        //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
        if (resultCode === signature) {
            this.ctx.body = echostr;
        }
        else {
            this.ctx.body = 'mismatch';
        }
        // this.success('wxapi callback', WXConfig)
    }
}
exports.default = Wxapi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3hhcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3eGFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZEQUFpRDtBQUNqRCxpREFBOEM7QUFDOUMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLE1BQXFCLEtBQU0sU0FBUSx5QkFBVTtJQUUzQyxLQUFLLENBQUMsSUFBSTtRQUNSLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFFaEMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFHLEdBQUcsRUFBRTtZQUNOLFFBQU8sR0FBRyxFQUFFO2dCQUNWLEtBQUssZ0JBQWdCLENBQUMsQ0FBQztvQkFDckIsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDL0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFDN0MsTUFBTTtpQkFDUDtnQkFDRCxLQUFLLGdCQUFnQixDQUFDLENBQUM7b0JBQ3JCLE1BQU0sWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQy9ELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUN0QyxNQUFNO2lCQUNQO2dCQUNELDJCQUEyQjtnQkFDM0IsaUNBQWlDO2dCQUNqQyxXQUFXO2dCQUNYLElBQUk7Z0JBQ0osT0FBTyxDQUFDLENBQUM7b0JBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtpQkFDMUI7YUFDRjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELDRCQUE0QjtJQUM1QixvRUFBb0U7SUFDcEUsa0RBQWtEO0lBQ2xELElBQUk7SUFFSixpR0FBaUc7SUFDMUYsS0FBSyxDQUFDLFFBQVE7UUFDbkIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUVoQyxxREFBcUQ7UUFDckQsTUFBTSxFQUNKLFNBQVMsR0FBRyxFQUFFLEVBQ2QsU0FBUyxHQUFHLEVBQUUsRUFDZCxLQUFLLEdBQUcsRUFBRSxFQUNWLE9BQU8sR0FBRyxFQUFFLEdBQ2IsR0FBRyxLQUFLLENBQUE7UUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRWxELHFDQUFxQztRQUNyQyxJQUFJLEtBQUssR0FBRyxDQUFDLG1CQUFRLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFYiw0QkFBNEI7UUFDNUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUztRQUNyRCxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxhQUFhO1FBRTlFLHdDQUF3QztRQUN4QyxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7U0FDNUI7UUFDRCwyQ0FBMkM7SUFDN0MsQ0FBQztDQUNGO0FBcEVELHdCQW9FQyJ9