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
    // the return config will combines to EggAppConfig
    return Object.assign({}, config);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcuZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlLENBQUMsT0FBbUIsRUFBRSxFQUFFO0lBQ3JDLE1BQU0sTUFBTSxHQUFHLEVBQWdDLENBQUM7SUFFaEQsMENBQTBDO0lBQzFDLHVFQUF1RTtJQUN2RSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcscUJBQXFCLENBQUM7SUFFbkQsOEJBQThCO0lBQzlCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLHFDQUFxQztJQUNyQyxzQkFBc0I7SUFDdEIsZ0ZBQWdGO0lBQ2hGLEtBQUs7SUFDTCxNQUFNLENBQUMsUUFBUSxHQUFHO1FBQ2hCLElBQUksRUFBRTtZQUNKLE1BQU0sRUFBRSxLQUFLO1lBQ2IsVUFBVSxFQUFFLElBQUk7U0FDakI7UUFDRCxlQUFlLEVBQUUsQ0FBRSxHQUFHLENBQUU7S0FDekIsQ0FBQztJQUNGLE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDWixNQUFNLEVBQUUsR0FBRztRQUNYLFlBQVksRUFBRSxnQ0FBZ0M7S0FDL0MsQ0FBQztJQUVGLE1BQU0sQ0FBQyxTQUFTLEdBQUc7UUFDakIsZ0JBQWdCO1FBQ2hCLElBQUksRUFBRSxRQUFRO1FBQ2QsU0FBUyxFQUFFLE1BQU07UUFDakIsU0FBUztZQUNQLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUNGLENBQUM7SUFDRixrREFBa0Q7SUFDbEQseUJBQ0ssTUFBTSxFQUVUO0FBQ0osQ0FBQyxDQUFDIn0=