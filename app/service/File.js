"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class File extends egg_1.Service {
    async list(ctx) {
        const { request } = ctx;
        const { page = 1, pageSize = 10, filename } = request.body || {};
        const where = filename ? ` where filename LIKE "%${filename}%" ` : '';
        const sql = `SELECT * from file ${where} ORDER BY created DESC limit ${pageSize * (page - 1)}, ${pageSize} `;
        const list = await this.app.mysql.query(sql);
        const countRes = await this.app.mysql.query(`SELECT count(*) from file ${where} `);
        const count = countRes[0]['count(*)'];
        return {
            count,
            list,
        };
    }
    async add(params) {
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
    async delete(id) {
        await this.app.mysql.delete('file', { id });
    }
}
exports.default = File;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBdUM7QUFFdkMsTUFBcUIsSUFBSyxTQUFRLGFBQU87SUFFdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFZO1FBQ3JCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDeEIsTUFBTSxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsUUFBUSxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNqRSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLDBCQUEwQixRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3RFLE1BQU0sR0FBRyxHQUFHLHNCQUFzQixLQUFLLGdDQUFnQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssUUFBUSxHQUFHLENBQUM7UUFDN0csTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDbkYsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLE9BQU87WUFDTCxLQUFLO1lBQ0wsSUFBSTtTQUNMLENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUEyRjtRQUNuRyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUMvRCxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzNELElBQUksR0FBRyxFQUFFO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztZQUMxQyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsaUJBQWlCO1lBQ25FLE9BQU87U0FDUjtRQUNELE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNsQyxPQUFPO1lBQ1AsUUFBUTtZQUNSLFFBQVE7WUFDUixNQUFNO1lBQ04sTUFBTTtTQUNQLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQVM7UUFDcEIsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBQ0Y7QUFwQ0QsdUJBb0NDIn0=