const moongose = require('mongoose')
const schema = moongose.Schema
const UserSchema = new schema({
    userName: {
        type: String,
        unique: true
    },
    passWord: {
        type: String

    },
    verify: {
        type: Boolean

    },
    role: {
        type: Boolean

    },
    wallet: [
        {
            total_swap: {
                type: Number
            },
            name_token: {
                type: String
            },
            image_token: {
                type: String
            },
            current_Price: {
                type: Number
            }


        }
    ],
    total_assets: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now

    }
})
module.exports = moongose.model('users', UserSchema)