"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class BaseController extends egg_1.Controller {
    success(message = 'success', data = null) {
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
exports.default = BaseController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZV9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQWlDO0FBRWpDLE1BQU0sY0FBZSxTQUFRLGdCQUFVO0lBQ3JDLE9BQU8sQ0FBQyxVQUFrQixTQUFTLEVBQUUsT0FBWSxJQUFJO1FBQ25ELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHO1lBQ2QsTUFBTSxFQUFFLEdBQUc7WUFDWCxPQUFPO1lBQ1AsSUFBSTtTQUNMLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQUcsR0FBRyxXQUFXO1FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxjQUFjLENBQUMifQ==