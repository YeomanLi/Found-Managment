const userModel = require("../model/User");
const User = userModel;
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const userController = {
  /**
   * register feature
   * use gravatar to generate an avatar
   * use bcrypt to encrypt user's password
   */
  async register(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        return res.status(400).json({ message: '此邮箱已被注册'})
      } else {
          const avatar = gravatar.url(req.body.email, {
            s: "200",
            r: "pg",
            d: "mm"
          });
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password,
            identity: req.body.identity
          })
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              // if (err) throw err;
              if (err)  console.log('错误' + err)
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.status(200).json(user))
                .catch(err => console.log(err));
            });
          });
      }
    } catch (error) {
      console.log(error)
    }
  },

  /**
   * login feature
   * use jsonwebtoken to generate a token
   */
  async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({ error: 'user does not exitst' })
      } else {
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) { return res.status(400).json({ error: 'wrong password'}) }
        else {
          const payload = { id: user.id, name: user.name, identity: user.identity}
          jwt.sign(
            payload,
            keys.secretOrPrivateKey,
            { expiresIn: '20000' },
            (err, token) => {
              if (err)  throw err
              res.status(200).json({ success: true, token: 'Bearer ' + token })
            }
          )
        }
      }
    } catch (error) {
      console.log(error)
    }
  },

  /**
   * authenticate user's token feature
   * use passport to authenticate user's token
   */
  getInfo (req, res) {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      identity: req.user.identity
    })
  }
};
module.exports = userController;
