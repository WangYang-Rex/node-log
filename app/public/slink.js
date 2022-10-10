"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiList = void 0;
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
exports.apiList = apiList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpbmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbGluay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLE9BQU8sR0FBRzs7Ozs7Ozs7OztDQVVmLENBQUM7QUFFTywwQkFBTyJ9