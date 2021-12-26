const jwt = require('jsonwebtoken');
const secretKey = "nibaba..";
const refreshKey = 'niyeye..'
//登录时：核对用户名和密码成功后，应用将用户的id（图中的user_id）作为JWT Payload的一个属性
exports.setAccessToken = (user_id)=>{
    const token = jwt.sign({
        user_id: user_id
    }, secretKey, {
        expiresIn: '10s' //过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
    });
    return token;
};

exports.setRefreshToken = (user_id)=>{
    const token = jwt.sign({
        user_id: user_id
    }, refreshKey, {
        expiresIn: '600s' 
    });
    return token;
};