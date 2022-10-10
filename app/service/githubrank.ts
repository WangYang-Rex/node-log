import { Context, Service } from 'egg';

class Githubrank extends Service {

  async add(ctx: Context) {
    const { request } = ctx;
    let {
      record_date = '',
      total_users = '',
      rank_list = [],
    } = request.body || {};
    this.ctx.logger.info(`rank add: record_date=${record_date} total_users=${total_users} rank_list=${rank_list.length}`);
    // save ranklist
    if (rank_list && rank_list.length > 0) {
      rank_list.map(async (item, index) => {
        if (item.name) {
          let obj = {
            record_date,
            total_users,
            ranknum: index + 1,
            "name": item.name,
            "login": item.login,
            "location": item.location,
            "company": item.company,
            "blog": item.blog,
            "email": item.email,
            "avatar_url": item.avatar_url,
            "followers": item.followers,
          }
          await this.app.mysql.insert('ranklist', obj);
        }
      })
    }
    
    return [];
  }
  async list(ctx: Context) {
    const { request } = ctx;
    let {
      page = 1,
      pageSize = 10,
      record_date = '',
    } = request.body || {};
    if (!record_date) {
      record_date = new Date().toISOString().slice(0, 10)
    }
    const offset = pageSize * (page - 1);
    let list = await this.app.mysql.query(`SELECT * FROM ranklist WHERE record_date="${record_date}" ORDER BY ranknum limit ${offset}, ${pageSize} `);
    const countRes = await this.app.mysql.query(
      `SELECT count(*) FROM ranklist WHERE record_date="${record_date}" `,
    );
    const count = countRes[0]['count(*)'];
    // let list = await this.app.mysql.query(`select * FROM ranklist`);
    return {
      list,
      count
    }
  }
}

export default Githubrank;