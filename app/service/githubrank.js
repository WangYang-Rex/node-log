"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class Githubrank extends egg_1.Service {
    async add(ctx) {
        const { request } = ctx;
        let { record_date = '', total_users = '', rank_list = [], } = request.body || {};
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
                    };
                    await this.app.mysql.insert('ranklist', obj);
                }
            });
        }
        return [];
    }
    async list(ctx) {
        const { request } = ctx;
        let { page = 1, pageSize = 10, record_date = '', } = request.body || {};
        if (!record_date) {
            record_date = new Date().toISOString().slice(0, 10);
        }
        const offset = pageSize * (page - 1);
        let list = await this.app.mysql.query(`SELECT * FROM ranklist WHERE record_date="${record_date}" ORDER BY ranknum limit ${offset}, ${pageSize} `);
        const countRes = await this.app.mysql.query(`SELECT count(*) FROM ranklist WHERE record_date="${record_date}" `);
        const count = countRes[0]['count(*)'];
        // let list = await this.app.mysql.query(`select * FROM ranklist`);
        return {
            list,
            count
        };
    }
    async del(ctx) {
        const { request } = ctx;
        let { record_date = '', } = request.body || {};
        if (!record_date) {
            record_date = new Date().toISOString().slice(0, 10);
        }
        await this.app.mysql.delete('ranklist', { record_date });
        return;
    }
}
exports.default = Githubrank;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aHVicmFuay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdpdGh1YnJhbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBdUM7QUFFdkMsTUFBTSxVQUFXLFNBQVEsYUFBTztJQUU5QixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQVk7UUFDcEIsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUN4QixJQUFJLEVBQ0YsV0FBVyxHQUFHLEVBQUUsRUFDaEIsV0FBVyxHQUFHLEVBQUUsRUFDaEIsU0FBUyxHQUFHLEVBQUUsR0FDZixHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsV0FBVyxnQkFBZ0IsV0FBVyxjQUFjLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RILGdCQUFnQjtRQUNoQixJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2xDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDYixJQUFJLEdBQUcsR0FBRzt3QkFDUixXQUFXO3dCQUNYLFdBQVc7d0JBQ1gsT0FBTyxFQUFFLEtBQUssR0FBRyxDQUFDO3dCQUNsQixNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUk7d0JBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSzt3QkFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRO3dCQUN6QixTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU87d0JBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSTt3QkFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO3dCQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVU7d0JBQzdCLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUztxQkFDNUIsQ0FBQTtvQkFDRCxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7aUJBQzlDO1lBQ0gsQ0FBQyxDQUFDLENBQUE7U0FDSDtRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBWTtRQUNyQixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLElBQUksRUFDRixJQUFJLEdBQUcsQ0FBQyxFQUNSLFFBQVEsR0FBRyxFQUFFLEVBQ2IsV0FBVyxHQUFHLEVBQUUsR0FDakIsR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7U0FDcEQ7UUFDRCxNQUFNLE1BQU0sR0FBRyxRQUFRLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsNkNBQTZDLFdBQVcsNEJBQTRCLE1BQU0sS0FBSyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xKLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUN6QyxvREFBb0QsV0FBVyxJQUFJLENBQ3BFLENBQUM7UUFDRixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEMsbUVBQW1FO1FBQ25FLE9BQU87WUFDTCxJQUFJO1lBQ0osS0FBSztTQUNOLENBQUE7SUFDSCxDQUFDO0lBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFZO1FBQ3BCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDeEIsSUFBSSxFQUNGLFdBQVcsR0FBRyxFQUFFLEdBQ2pCLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1NBQ3BEO1FBQ0QsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUN6RCxPQUFNO0lBQ1IsQ0FBQztDQUNGO0FBRUQsa0JBQWUsVUFBVSxDQUFDIn0=