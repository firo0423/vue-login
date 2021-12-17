// 处理业务逻辑
const db = require('./db.js')
exports.start = (req, res) => {}
// 登录注册处理
exports.login = (req, res) => {
	let username = req.body.username
	let pwd = req.body.password
	// 查询语句
	let sql = 'select * from student where username = '+'"'+ username+'"'
	db.base(sql, username, (result) => {
		if (!result.length) {
			return res.json({ status: 0, msg: '登录失败' })
		} else {
			// [ RowDataPacket { password: '123', username: 'admin', id: 1 } ]
			if (result[0].password == pwd) {
				return res.json({ status: 1, msg: '登录成功' })
			}
			return res.json({ status: 0, msg: '密码错误' })
		}
	})
}
