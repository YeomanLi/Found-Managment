const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    avatar: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    },

    password: {
        type: String,
        required: true
    },

    identity: {
        type: String,
        required: true
    }
})
const User = mongoose.model('User', userSchema)
module.exports = User