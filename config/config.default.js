"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
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
        domainWhiteList: ['*'],
    };
    config.cors = {
        origin: '*',
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
    return Object.assign({}, config);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcuZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlLENBQUMsT0FBbUIsRUFBRSxFQUFFO0lBQ3JDLE1BQU0sTUFBTSxHQUFHLEVBQWdDLENBQUM7SUFFaEQsMENBQTBDO0lBQzFDLHVFQUF1RTtJQUN2RSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcscUJBQXFCLENBQUM7SUFFbkQsOEJBQThCO0lBQzlCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLHFDQUFxQztJQUNyQyxzQkFBc0I7SUFDdEIsZ0ZBQWdGO0lBQ2hGLEtBQUs7SUFDTCxNQUFNLENBQUMsUUFBUSxHQUFHO1FBQ2hCLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxLQUFLO1lBQ2IsVUFBVSxFQUFFLElBQUk7U0FDakI7UUFDRCxlQUFlLEVBQUUsQ0FBRSxHQUFHLENBQUU7S0FDekIsQ0FBQztJQUNGLE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDWixNQUFNLEVBQUUsR0FBRztRQUNYLFlBQVksRUFBRSxnQ0FBZ0M7S0FDL0MsQ0FBQztJQUVGLE1BQU0sQ0FBQyxTQUFTLEdBQUc7UUFDakIsZ0JBQWdCO1FBQ2hCLElBQUksRUFBRSxRQUFRO1FBQ2QsU0FBUyxFQUFFLE1BQU07UUFDakIsU0FBUztZQUNQLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUNGLENBQUM7SUFDRixnQkFBZ0I7SUFDaEIsTUFBTSxDQUFDLE9BQU8sR0FBRztRQUNmLEtBQUssRUFBRSxPQUFPO1FBQ2QsTUFBTSxFQUFFLDBDQUEwQztRQUNsRCxNQUFNLEVBQUUsd0NBQXdDO1FBQ2hELGdFQUFnRTtRQUNoRSxTQUFTLEVBQUU7WUFDVCxpQ0FBaUM7WUFDakMsMkNBQTJDO1lBQzNDLHlCQUF5QjtTQUMxQjtLQUNGLENBQUM7SUFDRixrREFBa0Q7SUFDbEQseUJBQ0ssTUFBTSxFQUVUO0FBQ0osQ0FBQyxDQUFDIn0=