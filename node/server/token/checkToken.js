const jwt = require("jsonwebtoken");
const secretKey = "nibaba..";
module.exports =  (req, res) => {
  // 把token字符串的内容拿出来
  const token = (req.headers.authorization || "").slice(7);
  const verifiedToken = jwt.verify(token, secretKey);
  console.log(verifiedToken);
  if (res.error) {
    res.send({
      code: 401,
      message: "权限不足",
    });
    return;
  }
  console.log(req.user);
  // 判断用户是否登录
//   res.send({
//     code: 1,
//     message: "用户允许访问",
//     data: req.user.username,
//   });
  return next()
};
