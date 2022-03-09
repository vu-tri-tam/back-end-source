const moongose = require('mongoose')
const Schema = moongose.Schema
const countLike = new Schema({

    access_times: {
        type: Number

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'

    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = moongose.model('countLike', countLike)