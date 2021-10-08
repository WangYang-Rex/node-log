# hackernews-async-ts

[Hacker News](https://news.ycombinator.com/) showcase using typescript && egg

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 10.x  （有个插件必须10以上版本）
- Typescript 2.8+



### 环境说明
- 本地开发 `yarn dev `
- 发布正式需要执行`yarn tsc`; `pm2 start pm2.json` 正式发布（运维脚本方式）




### 结构说明
- src 目录、pom.xml是Java 打war必须的
- js后缀文件只作为服务器上运行文件，本地开发以ts为准
- ts 在服务器有问题，后续在考虑




