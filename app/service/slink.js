"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const random = require("string-random");
const moment = require("moment");
class Slink extends egg_1.Service {
    async add({ link, keyword }) {
        console.log(link, keyword);
        const res = await this.app.mysql.get('slink', { link });
        if (res) {
            return res.slink;
        }
        const slink = this.createSlink(link);
        const obj = {
            link,
            slink,
            keyword,
            create: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            visit: 0,
        };
        await this.app.mysql.insert('slink', obj);
        return slink;
    }
    async get(slink) {
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
    async del(id) {
        await this.app.mysql.delete('slink', { id });
    }
    async getList() {
        return await this.app.mysql.query('select * FROM slink ORDER BY id DESC');
        // return await this.app.mysql.select('slink');
        // select * FROM slink ORDER BY id DESC
    }
    createSlink(link) {
        console.log(link);
        const shortlink = random(8, { letters: true });
        return shortlink;
    }
}
exports.default = Slink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpbmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbGluay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE4QjtBQUM5Qix3Q0FBeUM7QUFDekMsaUNBQWtDO0FBQ2xDLE1BQU0sS0FBTSxTQUFRLGFBQU87SUFFekIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0IsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN4RCxJQUFJLEdBQUcsRUFBRTtZQUNQLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztTQUNsQjtRQUNELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsTUFBTSxHQUFHLEdBQU87WUFDZCxJQUFJO1lBQ0osS0FBSztZQUNMLE9BQU87WUFDUCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztZQUN4RCxLQUFLLEVBQUUsQ0FBQztTQUNULENBQUM7UUFDRixNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUMsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFZO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ25CLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDbkMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNWLEtBQUssRUFBRSxFQUFFLEdBQUcsQ0FBQyxLQUFLO2dCQUNsQixhQUFhLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQzthQUNoRSxDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzdELENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQVM7UUFDakIsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDMUUsK0NBQStDO1FBQy9DLHVDQUF1QztJQUN6QyxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQVc7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0MsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGO0FBRUQsa0JBQWUsS0FBSyxDQUFDIn0=