"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("../core/base_controller");
const slink_1 = require("../public/slink");
class SlinkController extends base_controller_1.default {
    async add() {
        // 根据参数判断短链是否生成过 没有的话生成，有的话直接返回
        // 获取post参数
        const { ctx } = this;
        const { keyword = '', link = '', } = ctx.request.body || {};
        console.log(keyword, link);
        const slink = await this.service.slink.add({ link, keyword });
        // const session = this.ctx.session;
        // session[link] = slink;
        // 测试log
        this.ctx.logger.info('hahaha');
        // 测试cookie
        // let count:any = this.ctx.cookies.get('count');
        // count = count ? Number(count) : 0;
        // this.ctx.cookies.set('count', String(++count));
        // 返回结果
        this.success('', `https://crmlog.superboss.cc/slink/jump/${slink}`);
    }
    async detail() {
        this.success('', true);
    }
    /**
     * 删除
     */
    async del() {
        const { ctx } = this;
        const { id, } = ctx.request.body || {};
        await this.service.slink.del(id);
        this.success('', true);
    }
    /**
     * 查询
     */
    async list() {
        // 获取参数
        const { ctx } = this;
        const { page = 1, pageSize = 10000, } = ctx.request.body || {};
        console.log(`list: page=${page} pageSize=${pageSize}`);
        const _list = await this.service.slink.getList();
        const __list = _list.slice((page - 1) * pageSize, page * pageSize);
        // 返回数据
        this.success('', {
            list: __list,
            count: _list.length,
            page,
            pageSize,
        });
    }
    /**
     * 链接跳转
     * @return
     */
    async jump() {
        const slink = this.ctx.params.slink;
        const link = await this.service.slink.get(slink);
        if (link) {
            this.ctx.response.redirect(link);
            return;
        }
        this.ctx.body = `  res: ${link}, 没有找到link
    ${slink_1.apiList}
    `;
    }
    api() {
        this.ctx.body = `
    ${slink_1.apiList}
    `;
    }
}
exports.default = SlinkController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpbmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbGluay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZEQUFpRDtBQUNqRCwyQ0FBMEM7QUFFMUMsTUFBcUIsZUFBZ0IsU0FBUSx5QkFBVTtJQUM5QyxLQUFLLENBQUMsR0FBRztRQUNkLCtCQUErQjtRQUMvQixXQUFXO1FBQ1gsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixNQUFNLEVBQ0osT0FBTyxHQUFHLEVBQUUsRUFDWixJQUFJLEdBQUcsRUFBRSxHQUNWLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNCLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFOUQsb0NBQW9DO1FBQ3BDLHlCQUF5QjtRQUV6QixRQUFRO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRS9CLFdBQVc7UUFDWCxpREFBaUQ7UUFDakQscUNBQXFDO1FBQ3JDLGtEQUFrRDtRQUVsRCxPQUFPO1FBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsMENBQTBDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNO1FBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLEdBQUc7UUFDUCxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sRUFDSixFQUFFLEdBQ0gsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDM0IsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUk7UUFDUixPQUFPO1FBQ1AsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixNQUFNLEVBQ0osSUFBSSxHQUFHLENBQUMsRUFDUixRQUFRLEdBQUcsS0FBSyxHQUNqQixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxhQUFhLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdkQsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqRCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsRUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFDbkUsT0FBTztRQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO1lBQ2YsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU07WUFDbkIsSUFBSTtZQUNKLFFBQVE7U0FDVCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUk7UUFDUixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDcEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsVUFBVSxJQUFJO01BQzVCLGVBQU87S0FDUixDQUFDO0lBQ0osQ0FBQztJQUVELEdBQUc7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRztNQUNkLGVBQU87S0FDUixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBckZELGtDQXFGQyJ9