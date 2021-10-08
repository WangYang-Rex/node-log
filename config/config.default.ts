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
  // the return config will combines to EggAppConfig
  return {
    ...config,
    // ...bizConfig,
  };
};
