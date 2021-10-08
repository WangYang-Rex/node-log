const apiList = `
  api：
  - api: 获取 api 列表
  - add: /slink/add/:link 传入encodeURIComponent之后的链接，获取slink及短链
  - get: /slink/jump/:slink 传入 短链 获取原始的链接
  - jump: /slink/get/:slink 传入 短链 获取原始的链接 并重定向

  ps:
  - 支持原链接解密
  - 支持原链接查重，保证相同的链接不会重复生成短链
`;

export { apiList };
