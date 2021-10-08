import Controller from '../core/base_controller';
import { apiList } from '../public/slink';

export default class SlinkController extends Controller {
  public async add() {
    // 根据参数判断短链是否生成过 没有的话生成，有的话直接返回
    // 获取post参数
    const { ctx } = this;
    const {
      keyword = '',
      link = '',
    } = ctx.request.body || {};
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
    const {
      id,
    } = ctx.request.body || {};
    await this.service.slink.del(id);
    this.success('', true);
  }

  /**
   * 查询
   */
  async list() {
    // 获取参数
    const { ctx } = this;
    const {
      page = 1,
      pageSize = 10000,
    } = ctx.request.body || {};
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
    ${apiList}
    `;
  }

  api() {
    this.ctx.body = `
    ${apiList}
    `;
  }
}
