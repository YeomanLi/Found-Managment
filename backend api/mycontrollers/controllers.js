const userModel = require('../model/User')
const User = userModel
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const controllers = {
    testAPI (req, res) {
        res.json({ message: 'This is a test for my api'})
    },

    testID: (req, res) => {
        const idParam = req.params.id
        res.send(idParam)
    },

    register: (req, res) => {
       User.findOne({email: req.body.email}) 
           .then((user) => {
               if (user) {
                   return res.json({ message: 'email already registered' })
               } else {
                //    generate an avatar
                   const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'})
                   const newUser = new User({
                       name: req.body.name,
                       email: req.body.email,
                       avatar,
                       password: req.body.password
                   })
                //    use bcrypt to encrypt user's password
                   bcrypt.genSalt(10, (err, salt) => {
                       bcrypt.hash(newUser.password, salt, (err, hash) => {
                           if (err) throw   err
                           newUser.password = hash
                           newUser.save()
                                  .then(user => res.json(user))
                                  .catch(err => console.log(err))
                       })
                   })
               }
           })
           .catch(err => console.log(err))
    }
}
module.exports = controllers