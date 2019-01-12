const express = require('express')
const router = express.Router()
const controller = require('../../mycontrollers/controllers')

router.get('/test', controller.testAPI)
router.get('/test/:id', controller.testID)
router.post('/register', controller.register)
module.exports = router