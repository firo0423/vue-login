// node项目入口
// 创建express服务器
const express = require("express");
const app = express();
// 注册解析 表单数据的 body-parser 用来解析node.js body内容
const bodyParser = require("body-parser");
// 将请求响应设置content-type设置为application/json
const router = require("./router/router");
// express-jwt用于将jwt字符串转化成json对象
const expressJWT = require("express-jwt");

app.use("/api/*", function (req, res, next) {
  // 设置请求头为允许跨域
  res.header("Access-Control-Allow-Origin", "*");
  // 设置服务器支持的所有头信息字段
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  // 设置服务器支持的所有跨域请求的方法
  res.header("Access-Control-Allow-Methods", "POST,GET");
  // next()方法表示进入下一个路由
  next();
});
// post 专门收取前端传来的表单数据
app.use(bodyParser.urlencoded({ extended: false }));
// 处理json格式的参数 没有这个就接收不了json文件
app.use(bodyParser.json());
// 配置路由
app.use(router);


// 定义secret密钥 在这写完了以后自动就验证了 就不需要自己加验证过程
const secretKey = "nibaba..";
// 解析密钥转化为json字符串 unless 表示以这个路径的不需要token
// /xxx/表示正则表达式 \\用来转译 /\^/xx\/ ^表示以^/xx开头
// algorithms:['HS256']加密规则必须添加 
// JWT里面还可以加 credentialRequired:true //设置为false游客也能访问 就没有校验了
app.use(
  expressJWT({
    secret: secretKey,
    algorithms: ["HS256"],
  }).unless({ path: [/^\/api\//] })
);

// 用来处理未授权响应
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    if (err.message === "jwt expired") {
      console.log(err.message);
      res.status(401).send("登录已经过期");
      return;
    }
    if (
      err.message === "invalid signature" ||
      err.message === "invalid token"
    ) {
      res.status(401).send("错误的登录授权，请重新登录");
      return;
    }
    //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
    console.log(err.message);
    res.status(403).send("权限不足请登录");
  }
});


// 服务器已经启动
app.listen("4000", function () {
  console.log("running...");
});
