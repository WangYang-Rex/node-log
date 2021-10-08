import { Context, Service } from 'egg';
import { sendMessageParams } from './../public/dd';
import {
  getErrorKey, getErrorStack, parseError, SourceMapParams,
} from './../public/error';
import { getGitInfo } from './../git';

type Source = {
  source: {
    line: string;
    source: string;
    name: string;
    column: string;
  };
};
/**
 * Test Service
 */
export default class Error extends Service {
  async parseError(ctx: Context) {
    const queryObj = ctx.query as any;
    const fileObj = getErrorStack(queryObj.error);
    console.log('-------------------------------=============================================------------------------------');
    if (!Object.keys(fileObj).length) {
      console.log(fileObj, queryObj, '不是常规错误不需要解析,后续再考虑....');
      return;
    }
    const error = await parseError({ ...queryObj, ...fileObj });

    if (error) {
      const { errorMk, errorInfo } = error as {
        errorMk: string;
        errorInfo: SourceMapParams & Source & { visible: string };
      };
      const errorKey = getErrorKey({
        ...queryObj,
        ...errorInfo.source,
      });
      const result = await this.app.mysql.get('error', { key: errorKey });

      console.log(
        errorKey,
        'errorKey:------------------------------------------------------------------------------------划分线',
      );
      if (result) {
        console.log(`id:${result.id}有重复数据，执行更新命令---------`);
        if (result.modifier_error === '已修复') {
          await this.app.mysql.update('error', {
            count: ++result.count,
            id: result.id,
            error_count: 1,
            modifier_error: '未修复',
            new_date: new Date(),
          }); // 更新 error 表中的记录
        } else {
          await this.app.mysql.update('error', {
            count: ++result.count,
            id: result.id,
            error_count: ++result.error_count,
            new_date: new Date(),
          }); // 更新 error 表中的记录
        }
        // 更新
        return;
      }
      const gitUser = getGitInfo({ errType: errorInfo.errType, file_name: errorInfo.source.source, line: errorInfo.source.line });
      const mysqlData = {
        key: errorKey,
        user_name: errorInfo.userName,
        user_id: errorInfo.userId,
        corp_id: errorInfo.corpId,
        corp_name: errorInfo.cname,
        terminal_type: errorInfo.errType,
        error_type: errorInfo.errorType,
        hash: errorInfo.hash,
        line: errorInfo.source.line,
        column: errorInfo.source.column,
        file_name: errorInfo.source.source,
        count: 1,
        name: errorInfo.source.name,
        error_message: errorInfo.errorMessage,
        error: queryObj.error,
        visible: errorInfo.visible,
        created: new Date(),
        new_date: new Date(),
        modifier_error: '未修复',
        error_count: 1,
        assign_user_name: gitUser ? gitUser.name : '无',
      };
      const _insert = await this.app.mysql.insert('error', mysqlData);
      console.log(_insert, '新增输入到mysql-------------');
      console.log(gitUser, '---------gitUser');
      errorMk ? sendMessageParams({
        title: '有新的bug了！！！',
        text: errorMk as string,
        msgtype: 'markdown',
      }, ctx) : null;

      gitUser ? sendMessageParams({
        msgtype: 'text',
        content: `${gitUser.name}有新的bug了,错误信息名称: ${mysqlData.name},错误次数：${mysqlData.error_count} 其他：${mysqlData.error_type} ${mysqlData.terminal_type}`,
        atUserIds: [ gitUser.name ],
      }, ctx) : null;
    }
  }

  async list(ctx: Context) {
    const { request } = ctx;
    const {
      page = 1,
      pageSize = 10,
      visible,
      error_type,
      name,
      user_name,
      corp_name,
      terminal_type,
      modifier_error,
      assign_user_name,
      sort = 'error_count',
    } = request.body || {};
    const params = {
      visible,
      error_type,
      name,
      user_name,
      corp_name,
      terminal_type,
      modifier_error,
      assign_user_name,
    };
    let where = 'file_name NOT LIKE "%不%"'; // 模糊查询 egg-mysql不支持 改为手动拼接sql语句
    Object.keys(params).map(key => {
      if (params[key]) {
        where += ` and ${key}="${params[key]}" `;
      }
    });
    const orderBy = `${sort} DESC`; // 'error_count DESC';
    const offset = pageSize * (page - 1);
    const sql = `SELECT * from error where ${where} ORDER BY ${orderBy} limit ${offset}, ${pageSize} `;
    console.log('--------sql', sql);
    const list = await this.app.mysql.query(sql);
    const countRes = await this.app.mysql.query(
      `SELECT count(*) from error where ${where} `,
    );
    const count = countRes[0]['count(*)'];
    // const query = Object.keys(params).reduce((_query, key) => {
    //   if (params[key]) {
    //     return {
    //       ..._query,
    //       [key]: params[key],
    //     };
    //   }
    //   return _query;
    // }, {});
    // console.log(query, '--------query');
    // const count = await this.app.mysql.count('error', query);
    // console.log(count, '--------count');
    // const where = Object.keys(query).length ? { where: query } : {}; // WHERE 条件
    // //  orders: [], // 排序方式 ['created_at','desc'], ['id','desc']
    // const list = await this.app.mysql.select('error', { // 搜索 post 表
    //   limit: pageSize, // 返回数据量
    //   offset: pageSize * (page - 1), // 数据偏移量
    //   orders: [[ 'created', 'desc' ]],
    //   ...where,
    // });
    return {
      count,
      list,
    };
  }
  async state(ctx: Context) {
    const { request } = ctx;
    const { id } = request.body || {};
    const result = await this.app.mysql.get('error', { id });
    if (result) {
      await this.app.mysql.update('error', {
        id: result.id,
        modifier_error: '已修复',
        error_count: 0,
      }); // 更新 error 表中的记录
      return '修改成功';
    }
    return '没有查询到该数据';
  }
  async assignUserName(ctx: Context) {
    const { request } = ctx;
    const { id, assign_user_name } = request.body || {};
    const result = await this.app.mysql.get('error', { id });
    if (result) {
      await this.app.mysql.update('error', { id: result.id, assign_user_name }); // 更新 error 表中的人员
      result.assign_user_name !== '无' ? sendMessageParams({
        msgtype: 'text',
        content: ` ${assign_user_name}被${result.assign_user_name}指定了新的bug,错误信息名称: ${result.name},其他：${result.error_type} ${result.terminal_type}`,
        atUserIds: [ assign_user_name, result.assign_user_name ],
      }, ctx) : null;
      return '修改成功';
    }
    return '没有查询到该数据';
  }
  async addLog(ctx: Context) {
    const { request } = ctx;
    const { id, log } = request.body || {};
    const result = await this.app.mysql.get('error', { id });
    if (result) {
      await this.app.mysql.update('error', { id: result.id, log: `${result.log},-----分隔符---- ${log}` }); // 更新 error log
      // sendMessageParams({
      //   msgtype: 'text',
      //   content: `bug跟踪:${log},id:${id},错误信息名称: ${result.name},错误次数：${result.count} 其他：${result.error_type} ${result.terminal_type}`,
      //   atUserIds: [ result.assign_user_name ],
      // }, ctx);
      return '更新成功';
    }
    return '没有查询到该数据';
  }
}
