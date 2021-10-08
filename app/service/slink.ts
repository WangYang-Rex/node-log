import { Service } from 'egg';
import random = require('string-random');
import moment = require('moment');
class Slink extends Service {

  async add({ link, keyword }) {
    console.log(link, keyword);
    const res = await this.app.mysql.get('slink', { link });
    if (res) {
      return res.slink;
    }
    const slink = this.createSlink(link);
    const obj:any = {
      link,
      slink,
      keyword,
      create: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      visit: 0,
    };
    await this.app.mysql.insert('slink', obj);
    return slink;
  }

  async get(slink:string) {
    console.log(slink);
    const res = await this.app.mysql.get('slink', { slink });
    if (res && res.link) {
      await this.app.mysql.update('slink', {
        id: res.id,
        visit: ++res.visit,
        lastVisitTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      });
    }
    return res && res.link ? decodeURIComponent(res.link) : '';
  }

  async del(id:string) {
    await this.app.mysql.delete('slink', { id });
  }

  async getList() {
    return await this.app.mysql.query('select * FROM slink ORDER BY id DESC');
    // return await this.app.mysql.select('slink');
    // select * FROM slink ORDER BY id DESC
  }

  createSlink(link:string) {
    console.log(link);
    const shortlink = random(8, { letters: true });
    return shortlink;
  }
}

export default Slink;
