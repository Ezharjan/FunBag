/*
 * Koa重写FunBag后台
 */
const Koa = require('koa')
const Router = require('koa-router')
const logger = require('koa-logger')
const json = require('koa-json')
const static = require('koa-static')
const views = require('koa-views')
const bodyparser = require('koa-bodyparser')
const user = require('./routes/user')
const table = require('./routes/table')
const city = require('./routes/city')
const cors = require('@koa/cors')

// 创建Koa实例
const app = new Koa();

// 创建路由实例，并添加路由前缀
const router = new Router({
    prefix: '/api'
});

// 应用日志中间件
app.use(logger());
// 返回美化后的json
app.use(json());
// 设置静态服务目录
app.use(static(__dirname + '/static'));
// 设置访问页面
app.use(views(__dirname + '/views'));
// 应用post请求中间件
app.use(bodyparser());

// app应用CORS插件
app.use(cors());

// html:页面加载验证
router.get('/html', async (ctx, next) => {
    await ctx.render('index');
})

// 路由模块加载
router.use("/user", user.routes(), user.allowedMethods())
router.use("/table", table.routes(), table.allowedMethods())
router.use(city.routes(), city.allowedMethods())
app.use(router.routes())
app.use(router.allowedMethods());

// 启动端口监听
app.listen(4000);

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
})

console.log('app started on port 4000...')