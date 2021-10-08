const userIdMap = {
  黑草: 'liujunxiong',
  大洋: 'wangyang',
  林木: 'linmu.hzl',
  夏天: 'guowenfang',
  天晴: 'tianqing.hzz',
  竹风: 'zhufeng.th',
  迷雾: 'miwu.zq',
};


const crmTestDomainName = [ 'https://dingcrmapp.superboss.cc', 'https://dingcrmapp.superboss.cc' ];
const crmProductionDomainName = [ 'https://crmapp.superboss.cc', 'https://app4290.eapps.dingtalkcloud.com' ];
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

export { userIdMap, config, crmProductionDomainName, crmTestDomainName };
