const express = require('express')
const router = express.Router()
const verifyS = require('../model/accountVerify')
const verifyToken = require('../middleWare/AuthVerify')




//@router GET api/products
//@desc GET Products 
router.get('/verify-account', async (req, res) => {
    try {
        const verifyUser = await verifyS.find().exec();
        // console.log(verifyUser, 464646);
        res.json({ success: true, verifyUser })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})




//@api get user: api/auth/register
router.post('/', verifyToken, async (req, res) => {
    const { contries, cccdFrontSide, cccdBackSide, scanFace, QRcode } = req.body
    console.log(req.body.cccd);

    try {
        // const account = await accountVerify.find();
        // if () {
        //     return res.status(400).json({ success: false, message: "lỗi userName đã tồn tại" })
        // }

        // const hashPass = await argon2.hash(passWord)
        const newAccountVerify = new verifyS({
            contries,
            cccdFrontSide,
            cccdBackSide,
            scanFace,
            QRcode: QRcode || "",
            user: req.userId
        })
        await newAccountVerify.save();
        // console.log(newAccountVerify);

        //return token
        res.json({
            success: true,
            message: "successfully",
            accountVerify: newAccountVerify
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server error" })
    }

})


//@router PATCH api/products
//@desc PATCH   Products 
router.patch('/verify-account/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updateAccountVerify = new verifyS({
            contries,
            cccdFrontSide,
            cccdBackSide,
            scanFace,
            QRcode,
            user: req.userId
        })

        const verifyUser = await verifyS.findOneAndUpdate(id, updateAccountVerify).exec();
        if (!verifyUser) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy bản xác thực nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})

module.exports = router
