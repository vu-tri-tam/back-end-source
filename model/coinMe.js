const moongose = require('mongoose')
const Schema = moongose.Schema
const CoinSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    symbol: {
        type: String,
        required: true

    },
    image: {
        type: String,
        required: true

    },
    current_price: {
        type: Number,
        required: true

    },
    market_cap: {
        type: Number,
        required: true

    },
    total_volume: {
        type: Number,
        required: true

    },
    circulating_supply: {
        type: Number,
        required: true

    },
    total_supply: {
        type: Number,
        required: true

    },
    max_supply: {
        type: Number,
        required: true

    },
    user_verify_kyc: [
        {
            id_user: {
                type: String
            },
            date_kyc: {
                type: Date,
                default: Date.now

            }
        }
    ],
    date: {
        type: Date,
        default: Date.now

    }
})
module.exports = moongose.model('coinPOLS', CoinSchema)