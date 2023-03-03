"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const fs = require("fs");
const path = require("path");
const pump = require("mz-modules/pump");
const OSS = require("ali-oss");
const fse = require("fs-extra");
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
    /**
     * 保存到目录 /public/upload 下
     * stream 模式
     */
    async chunkUpload() {
        const stream = await this.ctx.getFileStream(); // 获取stream
        const fields = stream.fields; // 表单数据
        console.log();
        // const filename = stream.filename.toLowerCase(); // 获取fieldname
        // 存储本地
        const target = path.join(this.config.baseDir, 'app/public/upload', fields.fileName); // 生成目标地址
        const writeStream = fs.createWriteStream(target); // 创建fs对象
        await pump(stream, writeStream); // 保存文件
        // const url = '/'
        this.ctx.body = {
            result: 200,
            message: '上传成功',
            data: 100,
        };
    }
    /**
     * 保存到目录 /public/upload 下
     * stream 模式
     */
    async merge() {
        const { fileName, chunklist, size } = this.ctx.request.body || {};
        console.log(fileName, chunklist);
        const target = path.join(this.config.baseDir, 'app/public/upload', fileName); // 生成目标地址
        const arr = chunklist.map((chunk, index) => {
            return new Promise(resolve => {
                const chunkDir = path.join(this.config.baseDir, 'app/public/upload', chunk); // 生成目标地址
                const readStream = fse.createReadStream(chunkDir); // 读取切片
                // 删除切片
                readStream.on('end', () => {
                    fse.unlinkSync(chunkDir); // 读取完毕后，删除已经读取过的切片路径
                    resolve(true);
                });
                // 写入目标文件 合并切片
                readStream.pipe(fse.createWriteStream(target, {
                    start: index * size,
                    end: (index + 1) * size,
                }));
            });
        });
        await Promise.all(arr);
        console.log('文件合并完成');
        // // 上传oss
        let result;
        const ossClient = new OSS(aliInfo);
        const filepath = `cdn/${fileName}`;
        try {
            // https://help.aliyun.com/document_detail/111265.html
            // 处理文件，比如上传到云端
            result = await ossClient.put(filepath, target);
        }
        catch (e) {
            console.log(e);
        }
        fse.unlinkSync(target); // 上传完毕后，删除对应文件
        const cdnurl = `http://cdn.html-js.site/${filepath}`;
        await this.ctx.service.file.add({
            filename: fileName,
            filepath,
            ossurl: result.url,
            cdnurl,
            created: new Date(),
        });
        this.ctx.body = {
            result: 200,
            message: '删除成功',
            data: true,
        };
    }
}
exports.default = FilterController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBaUM7QUFDakMseUJBQTBCO0FBQzFCLDZCQUE4QjtBQUM5Qix3Q0FBeUM7QUFDekMsK0JBQWdDO0FBQ2hDLGdDQUFpQztBQUVqQyxNQUFNLE9BQU8sR0FBRztJQUNkLE1BQU0sRUFBRSxpQkFBaUI7SUFDekIsTUFBTSxFQUFFLFNBQVM7SUFDakIsV0FBVyxFQUFFLGtCQUFrQjtJQUMvQixlQUFlLEVBQUUsZ0NBQWdDO0NBQ2xELENBQUM7QUFFRixNQUFxQixnQkFBaUIsU0FBUSxnQkFBVTtJQUV0RCxLQUFLLENBQUMsSUFBSTtRQUNSLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxFQUNKLElBQUksR0FBRyxDQUFDLEVBQ1IsUUFBUSxHQUFHLEVBQUUsR0FDZCxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxhQUFhLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDdkQsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRztZQUNkLE1BQU0sRUFBRSxHQUFHO1lBQ1gsT0FBTyxFQUFFLE1BQU07WUFDZixJQUFJLEVBQUU7Z0JBQ0osSUFBSTtnQkFDSixLQUFLO2FBQ047U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxVQUFVO1FBQ2QsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUss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