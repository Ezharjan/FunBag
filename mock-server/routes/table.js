/**
 * @description 用户模块路由定义，用于用户相关接口实现
 */
const router = require('koa-router')()
const mock = require('mockjs');
// table/list
router.get("/list", async (ctx) => {
    ctx.body = mock.mock({
        "code": 0,
        "message": "",
        "result": {
            "list|10": [{
                "id|+1": 1,
                "userName": "@cname",
                "sex|1-2": 1,
                "state|1-5": 1,
                "interest|1-8": 1,
                "isMarried|0-1": 1,
                "birthday": "2000-01-01",
                "address": "@city",
                "time": "09:00:00"
            }],
            "page": 1,
            "page_size": 10,
            "total_count": 30
        }
    })
});

router.get("/list1", async (ctx) => {
    ctx.body = mock.mock({
        "code": 0,
        "message": "",
        "result": {
            "list|10": [{
                "id|+1": 1,
                "userName": "@cname",
                "sex|1-2": 1,
                "state|1-5": 1,
                "interest|1-8": 1,
                "isMarried|0-1": 1,
                "birthday": "2000-01-01",
                "address": "@city",
                "time": "09:00:00"
            }],
            "page": 1,
            "page_size": 10,
            "total_count": 30
        }
    })
});
router.get("/high/list", async (ctx) => {
    ctx.body = mock.mock({
        "code": 0,
        "message": "",
        "result": {
            "list|25": [{
                "id|+1": 1,
                "username": "Jack",
                "sex|1-2": 1,
                "age|10-50": 0,
                "state|1-5": 1,
                "interest|1-8": 1,
                "isMarried1|0-1": 1,
                "isMarried2|0-1": 1,
                "isMarried3|0-1": 1,
                "isMarried4|0-1": 1,
                "isMarried5|0-1": 1,
                "isMarried6|0-1": 1,
                "isMarried7|0-1": 1,
                "isMarried8|0-1": 1,
                "birthday": "2000-01-01",
                "address": "@city",
                "time": "09:00:00"
            }],
            page: 2,
            page_size: 5,
            total_count: 30
        }
    })
});
module.exports = router;