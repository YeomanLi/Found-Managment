const express = require('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../../controllers/userController')

/**
 * $route   POST users/register
 * @des     register a user
 * @access  public
 */
router.post('/register', userController.register)

/**
 * $route   POST users/login
 * @des     login feature
 * @access  public 
 */
router.post('/login', userController.login)

/**
 * $route   GET users/current
 * @des     authenticate user's token
 * @access  private
 */
router.get('/getInfo', passport.authenticate('jwt', { session: false}), userController.getInfo)
module.exports = router