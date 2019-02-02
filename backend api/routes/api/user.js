const express = require('express')
const router = express.Router()
const passport = require('passport')
const controller = require('../../mycontrollers/controllers')

/**
 * $route   POST users/register
 * @des     register a user
 * @access  public
 */
router.post('/register', controller.register)

/**
 * $route   POST users/login
 * @des     login feature
 * @access  public 
 */
router.post('/login', controller.login)

/**
 * $route   GET users/current
 * @des     authenticate user's token
 * @access  private
 */
router.get('/getInfo', passport.authenticate('jwt', { session: false}), controller.getInfo)
module.exports = router