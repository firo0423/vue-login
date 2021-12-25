// 处理业务逻辑
const db = require("../db/db.js");
const createToken = require("./token/setToken.js");
const svgCaptcha = require("svg-captcha");
// 用于验证码校验
global.code;

exports.start = (req, res) => {};
// 登录注册处理 在这里签发token给前端客户端
exports.login = (req, res) => {
  let username = req.body.username;
  let pwd = req.body.password;
  let code = req.body.code;
  console.log(global.code);
  if (global.code == code) {
    // 查询语句
    let sql = "select * from student where username = " + '"' + username + '"';
    db.base(sql, username, (result) => {
      if (!result.length) {
        return res.json({ code: 403, message: "登录失败" });
      } else {
        // [ RowDataPacket { password: '123', username: 'admin', id: 1 } ]
        if (result[0].password == pwd) {
          let token = createToken(username);
          return res.json({ code: 200, message: "登录成功", token: token });
        }
        return res.json({ code: 401, message: "密码错误" });
      }
    });
  } else {
    return res.json({ code: 401, message: "验证码错误" });
  }
};

// 注册事件处理
exports.register = (req, res) => {
  let id = req.body.id;
  let username = req.body.username;
  let password = req.body.password;
  // 查询语句
  let sql = "select * from student where username =" + '"' + username + '"';
  // 插入语句
  let insert = "insert into student set ?";
  db.base(sql, username, (result) => {
    console.log(result.length);
    if (result.length !== 0) {
      return res.json({ status: 0, msg: "该用户名已经存在" });
    } else {
      db.base(insert, { id, username, password }, (result) => {
        console.log(result);
        if (result.affectedRows == 1) {
          console.log("c" + username);
          let token = createToken(username);
          return res.json({ status: 1, msg: "注册成功", token: token });
        }
        return res.json({ status: 2, msg: "注册失败" });
      });
    }
  });
};

exports.captcha = (req, res) => {
  var codeConfig = {
    size: 5, // 验证码长度
    ignoreChars: "0o1i", // 验证码字符中排除 0o1i
    noise: 2, // 干扰线条的数量
    fontSize: 42,
    color: true, //开启文字颜色
    background: "#cc9966", //背景色
    width: 90,
    height: 44,
  };
  const captcha = svgCaptcha.create(codeConfig);

  global.code = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
  var codeData = {
    img: captcha.data,
  };
  res.type("svg");
  res.status(200).send(captcha.data);
};
