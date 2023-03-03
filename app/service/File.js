"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class File extends egg_1.Service {
    async list(ctx) {
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
    async merge() {
    }
}
exports.default = File;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBdUM7QUFFdkMsTUFBcUIsSUFBSyxTQUFRLGFBQU87SUFFdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFZO1FBQ3JCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDeEIsTUFBTSxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsUUFBUSxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNqRSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDaEUsTUFBTSxHQUFHLEdBQUcsc0JBQXNCLEtBQUssZ0NBQWdDLFFBQVEsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxRQUFRLEdBQUcsQ0FBQztRQUM3RyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNuRixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEMsT0FBTztZQUNMLEtBQUs7WUFDTCxJQUFJO1NBQ0wsQ0FBQztJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQTJGO1FBQ25HLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQy9ELE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDM0QsSUFBSSxHQUFHLEVBQUU7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7WUFDbkUsT0FBTztTQUNSO1FBQ0QsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2xDLE9BQU87WUFDUCxRQUFRO1lBQ1IsUUFBUTtZQUNSLE1BQU07WUFDTixNQUFNO1NBQ1AsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBUztRQUNwQixNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBSztJQUVYLENBQUM7Q0FDRjtBQXhDRCx1QkF3Q0MifQ==