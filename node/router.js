const express = require('express')
const router = express.Router()
const services = require('./services.js')
// router.get('/',services.start)
// 登录功能
router.post('/api/login',services.login)


module.exports = router
