"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("../core/base_controller");
class GithubrankController extends base_controller_1.default {
    /**
     * 存储,
     * 由 git@github.com:WangYang-Rex/github-rankofchina.git 自动推送过来
     */
    async add() {
        // 获取post参数
        const { ctx } = this;
        const { record_date = '', total_users = '', rank_list = [], } = ctx.request.body || {};
        // 测试log
        this.ctx.logger.info('record_date', record_date);
        this.ctx.logger.info('total_users', total_users);
        // this.ctx.logger.info('rank_list', rank_list);
        // console.log(record_date, total_users, rank_list);
        const res = await this.service.githubrank.add(ctx);
        // 返回结果
        this.success();
    }
    async list() {
        // 获取post参数
        const { ctx } = this;
        let { record_date = '', page = 1, pageSize = 10, } = ctx.request.body || {};
        console.log(`rank list: ${record_date} page ${page} pageSize ${pageSize}`);
        const list = await this.service.githubrank.list(ctx);
        this.success('查询成功', list);
    }
}
exports.default = GithubrankController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aHVicmFuay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdpdGh1YnJhbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2REFBaUQ7QUFFakQsTUFBcUIsb0JBQXFCLFNBQVEseUJBQVU7SUFDMUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLEdBQUc7UUFDZCxXQUFXO1FBQ1gsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixNQUFNLEVBQ0osV0FBVyxHQUFHLEVBQUUsRUFDaEIsV0FBVyxHQUFHLEVBQUUsRUFDaEIsU0FBUyxHQUFHLEVBQUUsR0FDZixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMzQixRQUFRO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2pELGdEQUFnRDtRQUNoRCxvREFBb0Q7UUFFcEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkQsT0FBTztRQUNQLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUk7UUFDZixXQUFXO1FBQ1gsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLEVBQ0YsV0FBVyxHQUFHLEVBQUUsRUFDaEIsSUFBSSxHQUFHLENBQUMsRUFDUixRQUFRLEdBQUcsRUFBRSxHQUNkLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxXQUFXLFNBQVMsSUFBSSxhQUFhLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDM0UsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNGO0FBckNELHVDQXFDQyJ9