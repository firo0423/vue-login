const express = require('express')
const router = express.Router()
const services = require('../server/services')
const checkToken = require('../server/token/checkToken')
// router.get('/',services.start)
// 登录功能
router.post('/api/login',services.login)
router.post('/api/register',services.register)

router.get('/protected',checkToken,function (req, res) {
      res.send('ok')
  })


module.exports = router
