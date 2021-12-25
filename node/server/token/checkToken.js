const jwt = require("jsonwebtoken");
const secretKey = "nibaba..";
module.exports = (req, res, next) => {
  // console.log(req);
  // 把token字符串的内容拿出来
  const token = (req.headers.authorization || "").slice(7);
  // 从这直接验证了，如果过期就抛出错误信息 下面的都不执行
  jwt.verify(token, secretKey, (err, decode) => {
    if (err) {
      console.log(err.message);
      if (err.message == "jwt expired" ) {
        res.status(401).send({ code: 401, message: "登录已过期请重新登录" });
      } else if (err.message == "jwt must be provided") {
        res.status(401).send({ code: 401, message: "尚未登录请登录" });
      } else{
        res.status(401).send({ code: 400, message: "状态错误，请重新登录" });
      }
      return
    }
    return next();
  });
};
