import { info } from 'console';
import Controller from '../core/base_controller';

export default class GithubrankController extends Controller {
  /**
   * 存储,
   * 由 git@github.com:WangYang-Rex/github-rankofchina.git 自动推送过来
   */
  public async add() {
    // 获取post参数
    const { ctx } = this;
    const {
      record_date = '',
      total_users = '',
      rank_list = [],
    } = ctx.request.body || {};
    // 测试log
    this.ctx.logger.info('record_date', record_date);
    this.ctx.logger.info('total_users', total_users);
    // this.ctx.logger.info('rank_list', rank_list);
    // console.log(record_date, total_users, rank_list);

    const res = await this.service.githubrank.add(ctx);

    // 返回结果
    this.success();
  }

  public async list() {
    // 获取post参数
    const { ctx } = this;
    let {
      record_date = '',
      page = 1,
      pageSize = 10,
    } = ctx.request.body || {};
    console.log(`rank list: ${record_date} page ${page} pageSize ${pageSize}`);
    const list = await this.service.githubrank.list(ctx);
    this.success('查询成功', list);
  }

  public async del() {
    // 获取post参数
    const { ctx } = this;
    let {
      record_date = '',
    } = ctx.request.body || {};
    await this.service.githubrank.del(ctx);
    this.success('操作成功');
  }
}