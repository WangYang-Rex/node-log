"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const { controller, router } = app;
    /** slink */
    router.post('/slink/add.rjson', controller.slink.add);
    router.post('/slink/list.rjson', controller.slink.list);
    router.post('/slink/del.rjson', controller.slink.del);
    router.post('/slink/detail.rjson', controller.slink.detail);
    router.get('/slink/jump/:slink', controller.slink.jump);
    router.post('/file/list.rjson', controller.file.list);
    router.post('/file/delete.rjson', controller.file.delete);
    router.post('/file/upload/stream1.rjson', controller.file.streamUpload1);
    router.post('/file/upload/stream.rjson', controller.file.streamUpload);
    router.post('/file/upload/file.rjson', controller.file.fileUpload);
    router.post('/file/upload/chunk.rjson', controller.file.chunkUpload);
    router.post('/file/merge.rjson', controller.file.merge);
    router.post('/rank/add.rjson', controller.githubrank.add);
    router.post('/rank/list.rjson', controller.githubrank.list);
    router.post('/rank/del.rjson', controller.githubrank.del);
    // router.get('/', controller.home.index);
    // router.post([ '/error/list.rjson', '/list' ], controller.error.list);
    // router.post('/error/list/state.rjson', controller.error.state);
    // router.post('/error/add/log.rjson', controller.error.addLog);
    // router.post('/error/assign/userName.rjson', controller.error.assignUserName);
    // router.post('/git/notifyCommit', controller.error.gitNotifyCommit);
    // router.get('/el.jpg', controller.error.parse);
    router.get('/wxapi/callback.rjson', controller.wxapi.callback);
    router.get('/wxapi/test.rjson', controller.wxapi.test);
    // router.get('/wxapi/getAccessToken.rjson', controller.wxapi.getAccessToken);
    router.get('/hello.rjson', controller.home.index);
    router.redirect('/', '/index.html', 302);
    router.get('/*', controller.home.index);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esa0JBQWUsQ0FBQyxHQUFnQixFQUFFLEVBQUU7SUFDbEMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFFbkMsWUFBWTtJQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RCxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RCxNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEQsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRCxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekUsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZFLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckUsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXhELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxRCxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTFELDBDQUEwQztJQUMxQyx3RUFBd0U7SUFDeEUsa0VBQWtFO0lBQ2xFLGdFQUFnRTtJQUNoRSxnRkFBZ0Y7SUFDaEYsc0VBQXNFO0lBQ3RFLGlEQUFpRDtJQUVqRCxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3RELDhFQUE4RTtJQUU5RSxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWxELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQyJ9