"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
    config.mysql = {
        // client: {
        //   // host
        //   host: 'youcheng-test.mysql.zhangbei.rds.aliyuncs.com',
        //   // 端口号
        //   port: '3306',
        //   // 用户名
        //   user: 'youcheng',
        //   // 密码
        //   password: 'qTemX6MPAU2P',
        //   // 数据库名
        //   database: 'qd_web_log',
        // },
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
    config.cluster = {
        listen: {
            port: 7001,
            hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
            // path: '/var/run/egg.sock',
        },
    };
    config.logger = {
        dir: `${process.cwd()}/crm-logs/egg/${appInfo.name}`,
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmxvY2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlnLmxvY2FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWUsQ0FBQyxPQUFtQixFQUFFLEVBQUU7SUFDckMsTUFBTSxNQUFNLEdBQStCLEVBQUUsQ0FBQztJQUM5QyxNQUFNLENBQUMsS0FBSyxHQUFHO1FBQ2IsWUFBWTtRQUNaLFlBQVk7UUFDWiwyREFBMkQ7UUFDM0QsV0FBVztRQUNYLGtCQUFrQjtRQUNsQixXQUFXO1FBQ1gsc0JBQXNCO1FBQ3RCLFVBQVU7UUFDViw4QkFBOEI7UUFDOUIsWUFBWTtRQUNaLDRCQUE0QjtRQUM1QixLQUFLO1FBQ0wsTUFBTSxFQUFFO1lBQ04sT0FBTztZQUNQLElBQUksRUFBRSwrQ0FBK0M7WUFDckQsTUFBTTtZQUNOLElBQUksRUFBRSxNQUFNO1lBQ1osTUFBTTtZQUNOLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSztZQUNMLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsT0FBTztZQUNQLFFBQVEsRUFBRSxZQUFZO1NBQ3ZCO1FBQ0QsbUJBQW1CO1FBQ25CLEdBQUcsRUFBRSxJQUFJO1FBQ1QscUJBQXFCO1FBQ3JCLEtBQUssRUFBRSxLQUFLO0tBQ2IsQ0FBQztJQUNGLE1BQU0sQ0FBQyxPQUFPLEdBQUc7UUFDZixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxXQUFXLEVBQUUsMkRBQTJEO1lBQ2xGLDZCQUE2QjtTQUM5QjtLQUNGLENBQUM7SUFDRixNQUFNLENBQUMsTUFBTSxHQUFHO1FBQ2QsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsT0FBTyxDQUFDLElBQUksRUFBRTtLQUNyRCxDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDIn0=