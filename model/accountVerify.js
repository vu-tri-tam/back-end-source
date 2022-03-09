const moongose = require('mongoose')
const schema = moongose.Schema
const accountSchema = new schema({
    contries: {
        type: String
    },
    cccdFrontSide: {
        type: String

    },
    cccdBackSide: {
        type: String

    },
    scanFace: {
        type: String

    },
    QRcode: {
        type: String
    },
    user: {
        type: schema.Types.ObjectId,
        ref: 'users'

    }
})
module.exports = moongose.model('verify', accountSchema)