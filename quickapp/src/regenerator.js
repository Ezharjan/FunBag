// 注意：仅用于注入类库函数，不允许存储页面组件等数据
const injectRef = Object.getPrototypeOf(global) || global

// 注入regeneratorRuntime
injectRef.regeneratorRuntime = require('@babel/runtime/regenerator')
// 如果使用的 hap-toolkit 版本低于0.0.38(babel 版本低于 7)，则按下面的方式引入
// injectRef.regeneratorRuntime = require('babel-runtime/regenerator')