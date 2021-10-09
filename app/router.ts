/* Router 主要用来描述请求 URL 和具体承担执行动作的 Controller 的对应关系， 框架约定了 app/router.js 文件用于统一所有路由规则。 */
import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  /** slink */
  router.post('/slink/add.rjson', controller.slink.add);
  router.post('/slink/list.rjson', controller.slink.list);
  router.post('/slink/del.rjson', controller.slink.del);
  router.post('/slink/detail.rjson', controller.slink.detail);
  // router.get('/slink/jump/:slink', controller.slink.jump);

  router.post('/file/list.rjson', controller.file.list);
  router.post('/file/delete.rjson', controller.file.delete);
  router.post('/file/upload/stream1.rjson', controller.file.streamUpload1);
  router.post('/file/upload/stream.rjson', controller.file.streamUpload);
  router.post('/file/upload/file.rjson', controller.file.fileUpload);

  // router.get('/', controller.home.index);
  // router.post([ '/error/list.rjson', '/list' ], controller.error.list);
  // router.post('/error/list/state.rjson', controller.error.state);
  // router.post('/error/add/log.rjson', controller.error.addLog);
  // router.post('/error/assign/userName.rjson', controller.error.assignUserName);
  // router.post('/git/notifyCommit', controller.error.gitNotifyCommit);
  // router.get('/el.jpg', controller.error.parse);

  router.get('/hello.rjson', controller.home.index);

  router.redirect('/', '/index.html', 302);
  router.get('/*', controller.home.index);
};
