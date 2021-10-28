import { Controller } from 'egg';

class BaseController extends Controller {
  success(message: string = 'success', data: any = null) {
    this.ctx.body = {
      result: 200,
      message,
      data,
    };
  }

  notFound(msg = 'not found') {
    this.ctx.throw(404, msg);
  }
}

export default BaseController;
