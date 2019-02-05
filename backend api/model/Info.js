const mongoose = require('mongoose')
const Schema = mongoose.Schema

const infoSchema = new Schema({
    type: {
        type: String
    },

    description: {
        type: String
    },

    income: {
        type: String,
        required: true
    },

    expend: {
        type: String,
        required: true
    },

    cash: {
        type: String,
        require: true
    },

    remark: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = Info = mongoose.model('Info', infoSchema)