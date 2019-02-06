const express = require('express')
const router = express.Router()
const passport = require('passport')
const infoController = require('../../controllers/infoController')

/**
 * $route   POST api/info/add
 * @des     add a fund info
 * @access  Private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), infoController.addInfo)

/**
 * $route   DELETE api/info/delete/:id
 * @des     delete a fund info
 * @access  Private
 */
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), infoController.deleteInfo)

/**
 * $route   POST api/info/edit/:id
 * @des     edit a fund info
 * @access  Private
 */
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), infoController.editInfo)

/**
 * $route   GET api/info/:id
 * @des     return a single fund info
 * @access  Private
 */
router.post('/:id', passport.authenticate('jwt', { session: false }), infoController.queryById)

/**
 * $route   POST api/info/
 * @des     return all fund info
 * @access  Private
 */
router.post('/', passport.authenticate('jwt', { session: false }), infoController.queryAllInfo)
module.exports = router