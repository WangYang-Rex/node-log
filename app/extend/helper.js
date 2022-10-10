"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../lib/util");
module.exports = {
    /**
     * 分页器
     */
    page(list, pages) {
        // this 是 helper 对象，在其中可以调用其他 helper 方法
        // this.ctx => context 对象
        // this.app => application 对象
        const { page = 1, pageSize = 9999, } = pages;
        const resList = list.slice(pageSize * (page - 1), pageSize * page);
        return {
            page,
            pageSize,
            list: resList,
            count: list.length,
        };
    },
    log(message) {
        var date = `[${util_1.dateFormat('', 'YYYY-MM-DD HH:mm:ss')}]: `;
        console.log(date, message);
    },
    dateFormat(str, format = null) {
        return util_1.dateFormat(str, format);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdDO0FBT3hDLE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDZjs7T0FFRztJQUNILElBQUksQ0FBQyxJQUFVLEVBQUUsS0FBYztRQUM3Qix1Q0FBdUM7UUFDdkMseUJBQXlCO1FBQ3pCLDZCQUE2QjtRQUM3QixNQUFNLEVBQ0osSUFBSSxHQUFHLENBQUMsRUFDUixRQUFRLEdBQUcsSUFBSSxHQUNoQixHQUFHLEtBQUssQ0FBQztRQUNWLE1BQU0sT0FBTyxHQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN2RSxPQUFPO1lBQ0wsSUFBSTtZQUNKLFFBQVE7WUFDUixJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNuQixDQUFDO0lBQ0osQ0FBQztJQUNELEdBQUcsQ0FBRSxPQUFlO1FBQ2xCLElBQUksSUFBSSxHQUFHLElBQUksaUJBQVUsQ0FBQyxFQUFFLEVBQUUscUJBQXFCLENBQUMsS0FBSyxDQUFDO1FBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFDRCxVQUFVLENBQUUsR0FBUSxFQUFFLFNBQWMsSUFBSTtRQUN0QyxPQUFPLGlCQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ2hDLENBQUM7Q0FDRixDQUFDIn0=