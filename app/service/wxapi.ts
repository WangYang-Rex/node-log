import { Service } from 'egg';
import { WXConfig } from '../public/wxConfig'
let https = require('https');
const crypto = require('crypto');
import { wxconfig_DB_Type } from '../lib/types';

class Wxapi extends Service {

  /**
   * access_token 应该全局存储与更新，这里写入到文件中
   */
  async _setAccessToken() {

    let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WXConfig.AppID}&secret=${WXConfig.AppSecret}`;
    // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb0ebfc55a6c688b0&secret=00af2fde7fe01eb04b68cbce80859d55
    
    //向微信服务器发送请求
    const res = await this.ctx.curl(url, { dataType: 'json' });
    if(!res.data) {
      return new Error("getAccessToken 请求返回数据为空");
    }
    this.ctx.helper.log(res.data);
    const {access_token, expires_in = 7200} = res.data;
    const update_data = {
      id: 1,
      access_token: access_token,
      access_token_expirein: expires_in,
      access_token_createtime: new Date().getTime(),
      access_token_expiretime: new Date().getTime() + (expires_in - 200) * 1000,
    }
    
    await this.app.mysql.update('wxconfig', update_data);
    return access_token;
  }

  /**
   * 获取access_token
   * @returns 
   */
  async getAccessToken() {
    let access_token: string;
    const record: wxconfig_DB_Type = await this.app.mysql.get('wxconfig', { id: 1 });
    this.ctx.helper.log(record);

    if(record.access_token_expiretime < new Date().getTime()) {
      this.ctx.helper.log('access_token已过期，请求新的access_token');
      access_token = await this._setAccessToken();
    } else {
      this.ctx.helper.log('access_token未过期，用老的access_token');
      access_token = record.access_token;
    }
    return access_token
  }

  /**
   * jsapi_ticket 应该全局存储与更新，这里写入到文件中
   */
  private async _setJsApiTicket() {
    const access_token: string = await this.getAccessToken();
    let url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
    
    //向微信服务器发送请求
    const res = await this.ctx.curl(url, { dataType: 'json' });
    if(!res.data) {
      return new Error("getAccessToken 请求返回数据为空");
    }
    this.ctx.helper.log(res.data);
    const {ticket, expires_in = 7200} = res.data;
    const update_data = {
      id: 1,
      jsapi_ticket: ticket,
      // access_token_expirein: expires_in,
      jsapi_ticket_createtime: new Date().getTime(),
      jsapi_ticket_expiretime: new Date().getTime() + (expires_in - 200) * 1000,
    }
    
    await this.app.mysql.update('wxconfig', update_data);
    return ticket;
  }

  /**
   * 获取jsapi_ticket
   * @returns 
   */
  async getJsApiTicket() {
    let jsapi_ticket: string;
    const record: wxconfig_DB_Type = await this.app.mysql.get('wxconfig', { id: 1 });
    this.ctx.helper.log(record);

    if(record.jsapi_ticket_expiretime < new Date().getTime()) {
      this.ctx.helper.log('jsapi_ticket已过期，请求新的jsapi_ticket');
      jsapi_ticket = await this._setJsApiTicket();
    } else {
      this.ctx.helper.log('jsapi_ticket未过期，用老的jsapi_ticket');
      jsapi_ticket = record.jsapi_ticket;
    }
    return jsapi_ticket
  }

  /**
   * 获取getSignPackage
   */
  async getSignPackage() {

  }
}

export default Wxapi;