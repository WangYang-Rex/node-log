import { dateFormat } from '../lib/util'

type PageType = {
  page: number,
  pageSize: number,
};

module.exports = {
  /**
   * 分页器
   */
  page(list:any[], pages:PageType) {
    // this 是 helper 对象，在其中可以调用其他 helper 方法
    // this.ctx => context 对象
    // this.app => application 对象
    const {
      page = 1,
      pageSize = 9999,
    } = pages;
    const resList:any = list.slice(pageSize * (page - 1), pageSize * page);
    return {
      page,
      pageSize,
      list: resList,
      count: list.length,
    };
  },
  log (message: string) {
    var date = `[${dateFormat('', 'YYYY-MM-DD HH:mm:ss')}]: `;
    console.log(date, message)
  },
  dateFormat (str: any, format: any = null) {
    return dateFormat(str, format)
  }
};
