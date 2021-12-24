// 处理业务逻辑
const db = require("../db/db.js");
const createToken = require("./token/setToken.js");

exports.start = (req, res) => {};
// 登录注册处理 在这里签发token给前端客户端
exports.login = (req, res) => {
  let username = req.body.username;
  let pwd = req.body.password;
  // 查询语句
  let sql = "select * from student where username = " + '"' + username + '"';
  db.base(sql, username, (result) => {
    if (!result.length) {
      return res.json({ code: 403, msg: "登录失败" });
    } else {
      // [ RowDataPacket { password: '123', username: 'admin', id: 1 } ]
      if (result[0].password == pwd) {
        let token = createToken(username);
        return res.json({ code: 200, msg: "登录成功", token: token });
      }
      return res.json({ code: 401, msg: "密码错误" });
    }
  });
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
          console.log('c'+username);
          let token = createToken(username);
          return res.json({ status: 1, msg: "注册成功", token: token });
        }
        return res.json({ status: 2, msg: "注册失败" });
      });
    }
  });
};