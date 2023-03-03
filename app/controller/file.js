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
        const { page = 1, pageSize = 20, filename } = ctx.request.body || {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBaUM7QUFDakMseUJBQTBCO0FBQzFCLDZCQUE4QjtBQUM5Qix3Q0FBeUM7QUFDekMsK0JBQWdDO0FBQ2hDLGdDQUFpQztBQUVqQyxNQUFNLE9BQU8sR0FBRztJQUNkLE1BQU0sRUFBRSxpQkFBaUI7SUFDekIsTUFBTSxFQUFFLFNBQVM7SUFDakIsV0FBVyxFQUFFLGtCQUFrQjtJQUMvQixlQUFlLEVBQUUsZ0NBQWdDO0NBQ2xELENBQUM7QUFFRixNQUFxQixnQkFBaUIsU0FBUSxnQkFBVTtJQUV0RCxLQUFLLENBQUMsSUFBSTtRQUNSLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxFQUNKLElBQUksR0FBRyxDQUFDLEVBQ1IsUUFBUSxHQUFHLEVBQUUsRUFDYixRQUFRLEVBQ1QsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksYUFBYSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUc7WUFDZCxNQUFNLEVBQUUsR0FBRztZQUNYLE9BQU8sRUFBRSxNQUFNO1lBQ2YsSUFBSSxFQUFFO2dCQUNKLElBQUk7Z0JBQ0osS0FBSzthQUNOO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsVUFBVTtRQUNkLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8s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