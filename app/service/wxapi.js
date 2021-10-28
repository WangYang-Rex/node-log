"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const wxConfig_1 = require("../public/wxConfig");
let https = require('https');
const crypto = require('crypto');
class Wxapi extends egg_1.Service {
    /**
     * access_token 应该全局存储与更新，这里写入到文件中
     */
    async _setAccessToken() {
        let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxConfig_1.WXConfig.AppID}&secret=${wxConfig_1.WXConfig.AppSecret}`;
        // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb0ebfc55a6c688b0&secret=00af2fde7fe01eb04b68cbce80859d55
        //向微信服务器发送请求
        const res = await this.ctx.curl(url, { dataType: 'json' });
        if (!res.data) {
            return new Error("getAccessToken 请求返回数据为空");
        }
        this.ctx.helper.log(res.data);
        const { access_token, expires_in = 7200 } = res.data;
        const update_data = {
            id: 1,
            access_token: access_token,
            access_token_expirein: expires_in,
            access_token_createtime: new Date().getTime(),
            access_token_expiretime: new Date().getTime() + (expires_in - 200) * 1000,
        };
        await this.app.mysql.update('wxconfig', update_data);
        return access_token;
    }
    /**
     * 获取access_token
     * @returns
     */
    async getAccessToken() {
        let access_token;
        const record = await this.app.mysql.get('wxconfig', { id: 1 });
        this.ctx.helper.log(record);
        if (record.access_token_expiretime < new Date().getTime()) {
            this.ctx.helper.log('access_token已过期，请求新的access_token');
            access_token = await this._setAccessToken();
        }
        else {
            this.ctx.helper.log('access_token未过期，用老的access_token');
            access_token = record.access_token;
        }
        return access_token;
    }
    /**
     * jsapi_ticket 应该全局存储与更新，这里写入到文件中
     */
    async _setJsApiTicket() {
        const access_token = await this.getAccessToken();
        let url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
        //向微信服务器发送请求
        const res = await this.ctx.curl(url, { dataType: 'json' });
        if (!res.data) {
            return new Error("getAccessToken 请求返回数据为空");
        }
        this.ctx.helper.log(res.data);
        const { ticket, expires_in = 7200 } = res.data;
        const update_data = {
            id: 1,
            jsapi_ticket: ticket,
            // access_token_expirein: expires_in,
            jsapi_ticket_createtime: new Date().getTime(),
            jsapi_ticket_expiretime: new Date().getTime() + (expires_in - 200) * 1000,
        };
        await this.app.mysql.update('wxconfig', update_data);
        return ticket;
    }
    /**
     * 获取jsapi_ticket
     * @returns
     */
    async getJsApiTicket() {
        let jsapi_ticket;
        const record = await this.app.mysql.get('wxconfig', { id: 1 });
        this.ctx.helper.log(record);
        if (record.jsapi_ticket_expiretime < new Date().getTime()) {
            this.ctx.helper.log('jsapi_ticket已过期，请求新的jsapi_ticket');
            jsapi_ticket = await this._setJsApiTicket();
        }
        else {
            this.ctx.helper.log('jsapi_ticket未过期，用老的jsapi_ticket');
            jsapi_ticket = record.jsapi_ticket;
        }
        return jsapi_ticket;
    }
    /**
     * 获取getSignPackage
     */
    async getSignPackage() {
    }
}
exports.default = Wxapi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3hhcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3eGFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE4QjtBQUM5QixpREFBNkM7QUFDN0MsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUdqQyxNQUFNLEtBQU0sU0FBUSxhQUFPO0lBRXpCOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGVBQWU7UUFFbkIsSUFBSSxHQUFHLEdBQUcsOEVBQThFLG1CQUFRLENBQUMsS0FBSyxXQUFXLG1CQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEksd0lBQXdJO1FBRXhJLFlBQVk7UUFDWixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzNELElBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ1osT0FBTyxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixNQUFNLEVBQUMsWUFBWSxFQUFFLFVBQVUsR0FBRyxJQUFJLEVBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ25ELE1BQU0sV0FBVyxHQUFHO1lBQ2xCLEVBQUUsRUFBRSxDQUFDO1lBQ0wsWUFBWSxFQUFFLFlBQVk7WUFDMUIscUJBQXFCLEVBQUUsVUFBVTtZQUNqQyx1QkFBdUIsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRTtZQUM3Qyx1QkFBdUIsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcs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