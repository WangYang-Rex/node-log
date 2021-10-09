"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crmTestDomainName = exports.crmProductionDomainName = exports.config = exports.userIdMap = void 0;
const userIdMap = {
    黑草: 'liujunxiong',
    大洋: 'wangyang',
    林木: 'linmu.hzl',
    夏天: 'guowenfang',
    天晴: 'tianqing.hzz',
    竹风: 'zhufeng.th',
    迷雾: 'miwu.zq',
};
exports.userIdMap = userIdMap;
const crmTestDomainName = ['https://dingcrmapp.superboss.cc', 'https://dingcrmapp.superboss.cc'];
exports.crmTestDomainName = crmTestDomainName;
const crmProductionDomainName = ['https://crmapp.superboss.cc', 'https://app4290.eapps.dingtalkcloud.com'];
exports.crmProductionDomainName = crmProductionDomainName;
const config = {
    crm: {
        test: {
            domainName: crmTestDomainName,
        },
        production: {
            domainName: crmProductionDomainName,
            pc: {
                git: 'git@git2.superboss.cc:ding/dingding-crm-pc.git',
                branch: 'pre-release',
                domainName: 'https://crmapp.superboss.cc',
                directoryName: 'dingding-crm-pc',
            },
            mb: {
                git: 'git@git2.superboss.cc:ding/dingding-crm-mobile.git',
                branch: 'pre-release',
                domainName: 'https://crmapp.superboss.cc',
                directoryName: 'dingding-crm-mobile',
            },
        },
    },
};
exports.config = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sU0FBUyxHQUFHO0lBQ2hCLEVBQUUsRUFBRSxhQUFhO0lBQ2pCLEVBQUUsRUFBRSxVQUFVO0lBQ2QsRUFBRSxFQUFFLFdBQVc7SUFDZixFQUFFLEVBQUUsWUFBWTtJQUNoQixFQUFFLEVBQUUsY0FBYztJQUNsQixFQUFFLEVBQUUsWUFBWTtJQUNoQixFQUFFLEVBQUUsU0FBUztDQUNkLENBQUM7QUE0Qk8sOEJBQVM7QUF6QmxCLE1BQU0saUJBQWlCLEdBQUcsQ0FBRSxpQ0FBaUMsRUFBRSxpQ0FBaUMsQ0FBRSxDQUFDO0FBeUI5Qyw4Q0FBaUI7QUF4QnRFLE1BQU0sdUJBQXVCLEdBQUcsQ0FBRSw2QkFBNkIsRUFBRSx5Q0FBeUMsQ0FBRSxDQUFDO0FBd0JqRiwwREFBdUI7QUF2Qm5ELE1BQU0sTUFBTSxHQUFHO0lBQ2IsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFO1lBQ0osVUFBVSxFQUFFLGlCQUFpQjtTQUM5QjtRQUNELFVBQVUsRUFBRTtZQUNWLFVBQVUsRUFBRSx1QkFBdUI7WUFDbkMsRUFBRSxFQUFFO2dCQUNGLEdBQUcsRUFBRSxnREFBZ0Q7Z0JBQ3JELE1BQU0sRUFBRSxhQUFhO2dCQUNyQixVQUFVLEVBQUUsNkJBQTZCO2dCQUN6QyxhQUFhLEVBQUUsaUJBQWlCO2FBQ2pDO1lBQ0QsRUFBRSxFQUFFO2dCQUNGLEdBQUcsRUFBRSxvREFBb0Q7Z0JBQ3pELE1BQU0sRUFBRSxhQUFhO2dCQUNyQixVQUFVLEVBQUUsNkJBQTZCO2dCQUN6QyxhQUFhLEVBQUUscUJBQXFCO2FBQ3JDO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFa0Isd0JBQU0ifQ==