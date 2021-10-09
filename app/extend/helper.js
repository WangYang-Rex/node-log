"use strict";
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFLQSxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2Y7O09BRUc7SUFDSCxJQUFJLENBQUMsSUFBVSxFQUFFLEtBQWM7UUFDN0IsdUNBQXVDO1FBQ3ZDLHlCQUF5QjtRQUN6Qiw2QkFBNkI7UUFDN0IsTUFBTSxFQUNKLElBQUksR0FBRyxDQUFDLEVBQ1IsUUFBUSxHQUFHLElBQUksR0FDaEIsR0FBRyxLQUFLLENBQUM7UUFDVixNQUFNLE9BQU8sR0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDdkUsT0FBTztZQUNMLElBQUk7WUFDSixRQUFRO1lBQ1IsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDbkIsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDIn0=