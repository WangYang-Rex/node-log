import { Service, Context } from 'egg';

export default class File extends Service {

  async list(ctx: Context) {
    const { request } = ctx;
    const { page = 1, pageSize = 10, filename } = request.body || {};
    const where = filename ? ' where filename LIKE "filename"' : '';
    const sql = `SELECT * from file ${where} ORDER BY created DESC limit ${pageSize * (page - 1)}, ${pageSize} `;
    const list = await this.app.mysql.query(sql);
    const countRes = await this.app.mysql.query(`SELECT count(*) from file ${where} `);
    const count = countRes[0]['count(*)'];
    return {
      count,
      list,
    };
  }

  async add(params: { filename: string, filepath: string, ossurl: string, cdnurl: string, created:any }) {
    const { filename, filepath, ossurl, cdnurl, created } = params;
    const res = await this.app.mysql.get('file', { filename });
    if (res) {
      console.log(res, '有重复数据，执行更新命令---------');
      await this.app.mysql.update('file', { created }); // 更新 error 表中的记录
      return;
    }
    await this.app.mysql.insert('file', {
      created,
      filename,
      filepath,
      ossurl,
      cdnurl,
    });
  }

  async delete(id:string) {
    await this.app.mysql.delete('file', { id });
  }
}
