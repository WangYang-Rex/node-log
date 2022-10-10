"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnByb2QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcucHJvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlLENBQUMsT0FBbUIsRUFBRSxFQUFFO0lBQ3JDLE1BQU0sTUFBTSxHQUErQixFQUFFLENBQUM7SUFDOUMsTUFBTSxDQUFDLEtBQUssR0FBRztRQUNiLFdBQVc7UUFDWCxNQUFNLEVBQUU7WUFDTixPQUFPO1lBQ1AsSUFBSSxFQUFFLCtDQUErQztZQUNyRCxNQUFNO1lBQ04sSUFBSSxFQUFFLE1BQU07WUFDWixNQUFNO1lBQ04sSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLO1lBQ0wsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixPQUFPO1lBQ1AsUUFBUSxFQUFFLFlBQVk7U0FDdkI7UUFDRCxtQkFBbUI7UUFDbkIsR0FBRyxFQUFFLElBQUk7UUFDVCxxQkFBcUI7UUFDckIsS0FBSyxFQUFFLEtBQUs7S0FDYixDQUFDO0lBQ0YscUJBQXFCO0lBQ3JCLGNBQWM7SUFDZCxtQkFBbUI7SUFDbkIsdUZBQXVGO0lBQ3ZGLG9DQUFvQztJQUNwQyxPQUFPO0lBQ1AsS0FBSztJQUNMLE1BQU0sQ0FBQyxNQUFNLEdBQUc7UUFDZCxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFpQixPQUFPLENBQUMsSUFBSSxFQUFFO1FBQ3BELEtBQUssRUFBRSxNQUFNO1FBQ2IsWUFBWSxFQUFFLE1BQU07S0FDckIsQ0FBQztJQUVGLE1BQU0sQ0FBQyxNQUFNLEdBQUc7UUFDZCxNQUFNLEVBQUUsR0FBRztRQUNYLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRztRQUN4QixNQUFNLEVBQUUsUUFBUTtLQUNqQixDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDIn0=