const moongose = require('mongoose')
const schema = moongose.Schema
const commentSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'users'
    },
    userName: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

})
module.exports = moongose.model('comment', commentSchema)