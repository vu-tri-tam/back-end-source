const express = require('express')
const router = express.Router()
const coinMe = require('../model/coinMe')
// const argon2 = require('argon2')
// const jwt = require('jsonwebtoken')
// const verifyToken = require('../middleWare/AuthVerify')

//@api get user: api/auth/register



//@route GET api/tken
//@desc check isset coin

router.get('/', async (req, res) => {
    try {
        const tokenMe = await coinMe.find().exec();
        // console.log(product, 464646);
        res.json({ success: true, tokenMe })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})


//@router POST api/token
//@desc create token 
router.post('/', async (req, res) => {
    const { name, symbol, image, current_price, market_cap, total_volume, circulating_supply, total_supply, max_supply, date, user_verify_kyc } = req.body
    if (!name)
        return res.status(400).json({ success: false, message: 'Vui lòng nhập tên sản phẩm' })
    try {
        const tokenNew = new coinMe({
            name, symbol, image, current_price, market_cap, total_volume, circulating_supply, total_supply, max_supply, date
        })
        // const jsonProduct = productNew.toString();

        await tokenNew.save()
        // if (productNew.hasOwnProperty()) {
        //     res.json({ success: true, message: "Sản phầm đã tồn tại" })
        // }
        res.json({ success: true, message: "Tạo thành công token", products: tokenNew })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})

//@router PUT api/products
//@desc update Products 
router.patch('/:id', async (req, res) => {
    const { name, symbol, image, current_price, market_cap, total_volume, circulating_supply, total_supply, max_supply, user_verify_kyc, date } = req.body
    if (!name)
        return res.status(400).json({ success: false, message: 'Vui lòng nhập tên coin' })
    // const hashPass = await argon2.hash(passWord)
    try {

        let updateCoinId = {
            name,
            symbol,
            image,
            current_price,
            market_cap,
            total_volume,
            circulating_supply,
            total_supply,
            max_supply,
            user_verify_kyc,
            date
        }

        const userIdUpdation = { _id: req.params.id }

        updateForCoin = await coinMe.findOneAndUpdate(userIdUpdation, updateCoinId, { new: true })
        console.log(updateForCoin)
        if (!updateForCoin) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy coin nào !' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateForCoin })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})
module.exports = router
