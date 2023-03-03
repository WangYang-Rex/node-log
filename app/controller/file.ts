import { Controller } from 'egg';
import fs = require('fs');
import path = require('path');
import pump = require('mz-modules/pump');
import OSS = require('ali-oss');
import fse = require('fs-extra');

const aliInfo = {
  region: 'oss-cn-hangzhou',
  bucket: 'newbcdn',
  accessKeyId: '81nVk8nRRQ3bmNju',
  accessKeySecret: 'oAoHvFpwYQXAqOOBTCfaAbmH12pT7i',
};

export default class FilterController extends Controller {

  async list() {
    const { ctx } = this;
    const {
      page = 1,
      pageSize = 20,
    } = ctx.request.body || {};
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
    let result:any;
    const ossClient = new OSS(aliInfo);
    try {
      // https://help.aliyun.com/document_detail/111265.html
      // 处理文件，比如上传到云端
      result = await ossClient.put(file.filename, file.filepath);
    } catch (e) {
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
    let result:any;
    const ossClient = new OSS(aliInfo);
    try {
      // https://help.aliyun.com/document_detail/111265.html
      // 处理文件，比如上传到云端
      result = await ossClient.putStream(filepath, stream);
    } catch (e) {
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
    console.log(fileName, chunklist)
    const target = path.join(this.config.baseDir, 'app/public/upload', fileName); // 生成目标地址

    const arr = chunklist.map((chunk: any, index: number) => { 
      return new Promise(resolve => {
        const chunkDir = path.join(this.config.baseDir, 'app/public/upload', chunk); // 生成目标地址
        const readStream = fse.createReadStream(chunkDir); // 读取切片
        // 删除切片
        readStream.on('end', () => {
          fse.unlinkSync(chunkDir)// 读取完毕后，删除已经读取过的切片路径
          resolve(true)
        })
        // 写入目标文件 合并切片
        readStream.pipe(fse.createWriteStream(target, {
          start: index * size,
          end: (index + 1) * size,
        }))
      })
     
    })
    await Promise.all(arr);
    console.log('文件合并完成');

    // // 上传oss
    let result: any;
    const ossClient = new OSS(aliInfo);
    const filepath = `cdn/${fileName}`;
    try {
      // https://help.aliyun.com/document_detail/111265.html
      // 处理文件，比如上传到云端
      result = await ossClient.put(filepath, target)
    } catch (e) {
      console.log(e);
    }

    fse.unlinkSync(target)// 上传完毕后，删除对应文件

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
