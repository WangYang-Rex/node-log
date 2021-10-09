"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const fs = require("fs");
const path = require("path");
const pump = require("mz-modules/pump");
const OSS = require("ali-oss");
const aliInfo = {
    region: 'oss-cn-hangzhou',
    bucket: 'newbcdn',
    accessKeyId: '81nVk8nRRQ3bmNju',
    accessKeySecret: 'oAoHvFpwYQXAqOOBTCfaAbmH12pT7i',
};
class FilterController extends egg_1.Controller {
    async list() {
        const { ctx } = this;
        const { page = 1, pageSize = 20, } = ctx.request.body || {};
        console.log(`list: page=${page} pageSize=${pageSize}`);
        const { count, list } = await ctx.service.file.list(ctx);
        this.ctx.body = {
            result: 200,
            message: '查询成功',
            data: {
                list,
                count,
            },
        };
    }
    /**
     * 保存到 oss 并获取对应的链接地址
     * file 模式
     */
    async fileUpload() {
        const { ctx } = this;
        const file = ctx.request.files[0];
        let result;
        const ossClient = new OSS(aliInfo);
        try {
            // https://help.aliyun.com/document_detail/111265.html
            // 处理文件，比如上传到云端
            result = await ossClient.put(file.filename, file.filepath);
        }
        catch (e) {
            console.log(e);
        }
        // finally {
        //   // 删除临时文件
        //   await fs.unlink(file.filepath);
        // }
        ctx.body = {
            result: 200,
            message: '上传成功',
            data: result.url,
        };
    }
    /**
     * 保存到 oss 并获取对应的链接地址
     * stream 模式
     */
    async streamUpload() {
        const stream = await this.ctx.getFileStream();
        const filename = stream.filename.toLowerCase();
        const filepath = `cdn/${filename}`;
        // 上传oss
        let result;
        const ossClient = new OSS(aliInfo);
        try {
            // https://help.aliyun.com/document_detail/111265.html
            // 处理文件，比如上传到云端
            result = await ossClient.putStream(filepath, stream);
        }
        catch (e) {
            console.log(e);
        }
        const cdnurl = `http://cdn.html-js.site/${filepath}`;
        await this.ctx.service.file.add({
            filename,
            filepath,
            ossurl: result.url,
            cdnurl,
            created: new Date(),
        });
        // const url = '/'
        this.ctx.body = {
            result: 200,
            message: '上传成功',
            data: cdnurl,
        };
    }
    /**
     * 保存到目录 /public/upload 下
     * stream 模式
     */
    async streamUpload1() {
        const stream = await this.ctx.getFileStream(); // 获取stream
        const filename = stream.filename.toLowerCase(); // 获取fieldname
        // 存储本地
        const target = path.join(this.config.baseDir, 'app/public/upload', filename); // 生成目标地址
        const writeStream = fs.createWriteStream(target); // 创建fs对象
        await pump(stream, writeStream); // 保存文件
        // const url = '/'
        this.ctx.body = {
            result: 200,
            message: '上传成功',
            data: 100,
        };
    }
    async delete() {
        const { id } = this.ctx.request.body || {};
        this.service.file.delete(id);
        this.ctx.body = {
            result: 200,
            message: '删除成功',
            data: true,
        };
    }
}
exports.default = FilterController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBaUM7QUFDakMseUJBQTBCO0FBQzFCLDZCQUE4QjtBQUM5Qix3Q0FBeUM7QUFDekMsK0JBQWdDO0FBRWhDLE1BQU0sT0FBTyxHQUFHO0lBQ2QsTUFBTSxFQUFFLGlCQUFpQjtJQUN6QixNQUFNLEVBQUUsU0FBUztJQUNqQixXQUFXLEVBQUUsa0JBQWtCO0lBQy9CLGVBQWUsRUFBRSxnQ0FBZ0M7Q0FDbEQsQ0FBQztBQUVGLE1BQXFCLGdCQUFpQixTQUFRLGdCQUFVO0lBRXRELEtBQUssQ0FBQyxJQUFJO1FBQ1IsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixNQUFNLEVBQ0osSUFBSSxHQUFHLENBQUMsRUFDUixRQUFRLEdBQUcsRUFBRSxHQUNkLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxJQUFJLGFBQWEsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN2RCxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHO1lBQ2QsTUFBTSxFQUFFLEdBQUc7WUFDWCxPQUFPLEVBQUUsTUFBTTtZQUNmLElBQUksRUFBRTtnQkFDSixJQUFJO2dCQUNKLEtBQUs7YUFDTjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFVBQVU7UUFDZCxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FB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