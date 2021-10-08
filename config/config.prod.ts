import { EggAppConfig, PowerPartial, EggAppInfo } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {};
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'rm-uf6641yur4q7j47h7ko.mysql.rds.aliyuncs.com',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'sxwy_10110013228',
      // 数据库名
      database: 'qd_web_log',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  // config.cluster = {
  //   listen: {
  //     port: 10482,
  //     hostname: '0.0.0.0', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
  //     // path: '/var/run/egg.sock',
  //   },
  // };
  config.logger = {
    dir: `${process.cwd()}/crm-logs/egg/${appInfo.name}`,
    level: 'NONE',
    consoleLevel: 'NONE',
  };

  config.static = {
    prefix: '/',
    dir: `${process.cwd()}/`,
    maxAge: 31536000,
  };
  return config;
};
