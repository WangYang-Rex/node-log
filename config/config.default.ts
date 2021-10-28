import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1626073505827_4266';

  // add your egg config in here
  config.middleware = [];
  // // add your special config in here
  // const bizConfig = {
  //   sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  // };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    origin: '*', // 匹配规则  域名+端口  *则为全匹配
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.multipart = {
    // mode: 'file',
    mode: 'stream',
    fieldSize: '50mb',
    whitelist() {
      return true;
    },
  };
  config.onerror = {
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      console.log('config onerror', err)
      ctx.body = 'error';
      ctx.status = 500;
    },
    json(err, ctx) {
      // json hander
      ctx.body = { message: 'error' };
      ctx.status = 500;
    },
  };

  // alinode性能监控平台
  config.alinode = {
    appid: '89393',
    secret: '51119364bc791d98b5d87a134ff70f8ebed420f3',
    server: 'wss://agentserver.node.aliyun.com:8080',
    // logdir: 'Node.js 性能平台日志输出地址绝对路径，与 NODE_LOG_DIR 保持一致。如：/tmp/',
    error_log: [
      '您的应用在业务层面产生的异常日志的路径，数组，可选，可配置多个',
      '例如：/root/.logs/error.#YYYY#-#MM#-#DD#.log',
      '不更改 Egg 默认日志输出路径可不配置本项目',
    ],
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    // ...bizConfig,
  };
};
