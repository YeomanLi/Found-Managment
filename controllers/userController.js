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
  register(req, res) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          return res.status(400).json({ message: "email already registered" });
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
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              // if (err) throw err;
              if (err)  console.log('错误' + err)
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
      })
      .catch(err => console.log(err));
  },

  /**
   * login feature
   * use jsonwebtoken to generate a token
   */
  login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then(user => {
      if (!user) {
        return res.status(404).json({ error: "user does not exist" });
      } else {
        bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ error: "wrong password" });
          } else {
            const payload = { id: user.id, name: user.name };
            jwt.sign(
              payload,
              keys.secretOrPrivateKey,
              { expiresIn: "1h" },
              (err, token) => {
                if (err) throw err;
                res.json({ success: true, token: 'Bearer ' + token });
              }
            );
          }
        });
      }
    });
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
