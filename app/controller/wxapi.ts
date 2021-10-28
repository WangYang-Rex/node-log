import Controller from '../core/base_controller';
import { WXConfig } from '../public/wxConfig';
const crypto = require('crypto');

export default class Wxapi extends Controller {

  async test() {
    const { ctx } = this;
    const query = ctx.request.query;

    const { api } = query;
    if(api) {
      switch(api) {
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
          this.success('未找到对应的api')
        }
      }
    } else {
      this.success('未找到api参数')
    }
  }

  // async getAccessToken () {
  //   const access_token = await this.service.wxapi.getAccessToken();
  //   this.success('getAccessToken', access_token);
  // }

  // 微信接入验证 https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html
  public async callback() {
    const { ctx } = this;
    const query = ctx.request.query;

    //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
    const {
      signature = '',
      timestamp = '',
      nonce = '',
      echostr = '',
    } = query
    console.log(signature, timestamp, nonce, echostr);

    //2.将token、timestamp、nonce三个参数进行字典序排序
    let array = [WXConfig.Token, timestamp, nonce];
    array.sort();

    //3.将三个参数字符串拼接成一个字符串进行sha1加密
    let tempStr = array.join('');
    const hashCode = crypto.createHash('sha1'); //创建加密类型 
    var resultCode = hashCode.update(tempStr, 'utf8').digest('hex'); //对传入的字符串进行加密

    //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (resultCode === signature) {
      this.ctx.body = echostr;
    } else {
      this.ctx.body = 'mismatch';
    }
    // this.success('wxapi callback', WXConfig)
  }
}
