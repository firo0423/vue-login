// node项目入口
// 创建express服务器
const express = require('express')
const app = express()
// 注册解析 表单数据的 body-parser 用来解析node.js body内容 
const bodyParser = require('body-parser')
// 将请求响应设置content-type设置为application/json
const router = require('./router.js')


app.use('/api/*', function (req, res, next) {
	// 设置请求头为允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    // 设置服务器支持的所有头信息字段
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    // 设置服务器支持的所有跨域请求的方法
    res.header("Access-Control-Allow-Methods", "POST,GET");
    // next()方法表示进入下一个路由
    next();
});
// post 专门收取前端传来的表单数据
app.use(bodyParser.urlencoded({extended:false}))
// 处理json格式的参数 没有这个就接收不了json文件
app.use(bodyParser.json())
// 配置路由
app.use(router)
// 服务器已经启动
app.listen('4000',function(){
    console.log('running...')
})
