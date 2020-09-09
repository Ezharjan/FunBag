/**
 * @description 用户模块路由定义，用于用户相关接口实现
 */
const router = require('koa-router')()
const mock = require('mockjs')
router.get("/add", async (ctx) => {
    ctx.body = mock.mock({
        "code": 0,
        "result": "Ok"
    })
});
router.get("/edit", async (ctx) => {
    ctx.body = mock.mock({
        "code": 0,
        "result": "Ok"
    })
});
router.get("/delete", async (ctx) => {
    ctx.body = mock.mock({
        "code": 0
    })
});
router.get("/list", async (ctx) => {
    ctx.body = mock.mock({
        "code": 0,
        "message": "",
        "result": {
            "item_list|10": [{
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
module.exports = router;