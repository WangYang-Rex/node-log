import Controller from '../core/base_controller';
import { gitPull } from './../git';

export default class ErrorController extends Controller {
  public async parse() {
    const { ctx } = this;
    const queryObj = ctx.query as any;
    console.log(ctx.params[0]);
    if ([ 'compRenderError', 'js' ].includes(queryObj.errorType)) { // 访问资源被nginx转发，这里先这里处理
      await ctx.service.error.parseError(ctx);
    }
    ctx.body = `路由：${ctx.params[0]}`;
  }
  async list() {
    const { ctx } = this;
    const {
      page = 1,
      pageSize = 10,
    } = ctx.request.body || {};
    console.log(`list: page=${page} pageSize=${pageSize}`);
    const { count, list } = await ctx.service.error.list(ctx);
    // 返回数据
    this.success('查询成功', {
      list,
      count,
    });
  }
  async state() {
    const { ctx } = this;

    const _result = await ctx.service.error.state(ctx);
    // 返回数据
    this.success(_result);
  }
  async assignUserName() {
    const { ctx } = this;
    const _result = await ctx.service.error.assignUserName(ctx);
    // 返回数据
    this.success(_result);
  }
  async addLog() {
    const { ctx } = this;
    const _result = await ctx.service.error.addLog(ctx);
    // 返回数据
    this.success(_result);
  }
  async gitNotifyCommit() {
    const { ctx } = this;
    const queryObj = ctx.query as any;
    await gitPull(queryObj.type as 'pc'|'mobile');
    console.log(queryObj, '----------gitNotifyCommit');
    this.success('发送成功');
  }
}
