"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("../core/base_controller");
const wxConfig_1 = require("../public/wxConfig");
const crypto = require('crypto');
class Wxapi extends base_controller_1.default {
    sign() {
    }
    // 微信接入验证 https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html
    async callback() {
        const { ctx } = this;
        const query = ctx.request.query;
        //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
        const { signature = '', timestamp = '', nonce = '', echostr = '', } = query;
        console.log(signature, timestamp, nonce, echostr);
        //2.将token、timestamp、nonce三个参数进行字典序排序
        let array = [wxConfig_1.WXConfig.token, timestamp, nonce];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3hhcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3eGFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZEQUFpRDtBQUNqRCxpREFBOEM7QUFDOUMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLE1BQXFCLEtBQU0sU0FBUSx5QkFBVTtJQUUzQyxJQUFJO0lBRUosQ0FBQztJQUVELGlHQUFpRztJQUMxRixLQUFLLENBQUMsUUFBUTtRQUNuQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBRWhDLHFEQUFxRDtRQUNyRCxNQUFNLEVBQ0osU0FBUyxHQUFHLEVBQUUsRUFDZCxTQUFTLEdBQUcsRUFBRSxFQUNkLEtBQUssR0FBRyxFQUFFLEVBQ1YsT0FBTyxHQUFHLEVBQUUsR0FDYixHQUFHLEtBQUssQ0FBQTtRQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFbEQscUNBQXFDO1FBQ3JDLElBQUksS0FBSyxHQUFHLENBQUMsbUJBQVEsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9DLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUViLDRCQUE0QjtRQUM1QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQ3JELElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWE7UUFFOUUsd0NBQXdDO1FBQ3hDLElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7U0FDekI7YUFBTTtZQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztTQUM1QjtRQUNELDJDQUEyQztJQUM3QyxDQUFDO0NBQ0Y7QUFyQ0Qsd0JBcUNDIn0=