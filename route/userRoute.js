const express = require('express')
const router = express.Router()
const user = require('../model/user')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleWare/AuthVerify')

//@api get user: api/auth/register
router.post('/register', async (req, res) => {
    // console.log(req.body)
    const { userName, passWord } = req.body
    // console.log(req.body);
    if (!userName || !passWord)
        return res.status(400).json({ success: false, message: "lỗi userName và passWord" })
    try {
        const users = await user.findOne({ userName })
        if (users) {
            return res.status(400).json({ success: false, message: "lỗi userName đã tồn tại" })
        }

        const hashPass = await argon2.hash(passWord)
        const newUser = new user({
            userName,
            passWord: hashPass,
            verify: false,
            role: false,
            total_assets: null,
            wallet: []
        })
        await newUser.save();
        // console.log(newUser);

        //return token
        const accessToken = jwt.sign({
            userId: newUser._id
        }, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true,
            message: "user created successfully",
            accessToken
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server error" })
    }

})


//@route GET api/auth
//@desc check isset user
router.get('/', verifyToken, async (req, res) => {
    console.log(req.body)
    try {
        const users = await user.findById(req.userId).exec()
        console.log(users);
        if (!users)
            return res.status(400).json({ success: false, message: "không tìm thấy user" })
        res.json({ success: true, users })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})


//@api post user: api/auth/login 
router.post('/login', async (req, res) => {
    const { userName, passWord } = req.body

    if (!userName || !passWord) {
        return res.status(400).json({ success: false, message: "chưa nhập username và password" })
    }
    try {
        const users = await user.findOne({ userName })
        console.log(users, 888);
        if (!users) {
            return res.status(400).json({ success: false, message: 'tên đăng nhập không đúng' })

        }
        const passWordValid = await argon2.verify(users.passWord, passWord)

        if (!passWordValid)
            return res.status(400).json({ success: false, message: "mật khẩu không đúng" })

        //all good
        const accessToken = jwt.sign({ userId: users._id, verify: users.verify, role: users.role, wallet: users.wallet }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: "Đăng nhập thành công", accessToken })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})


//@router PUT api/products
//@desc update Products 
router.patch('/:id', verifyToken, async (req, res) => {
    const { userName, passWord, verify, role, total_assets } = req.body
    // console.log(req.body)
    if (!userName)
        return res.status(400).json({ success: false, message: 'Vui lòng nhập tên người dùng' })
    const hashPass = await argon2.hash(passWord)
    try {
        let updateUser = {
            userName,
            passWord: hashPass,
            verify,
            total_assets,
            role,
            wallet
        }

        const userIdUpdation = { _id: req.params.id }

        updateUser = await user.findOneAndUpdate(userIdUpdation, updateUser, { new: true })
        // console.log(updateUser)
        if (!updateUser) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateUser })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})



//@router PUT api/products
//@desc update Products 
router.patch('/verify/:id', async (req, res) => {
    const { total_assets } = req.body
    // console.log(req.params.id)
    if (!total_assets)
        return res.status(400).json({ success: false, message: 'cần phải có số dư để cập nhật' })
    // const hashPass = await argon2.hash(passWord)
    try {
        let updateUser = {
            total_assets

        }

        const userIdUpdation = { _id: req.params.id }
        updateUser = await user.findOneAndUpdate(userIdUpdation, updateUser, { new: true })
        // console.log(updateUser)
        if (!updateUser) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateUser })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})


//@router PUT api/products
//@desc update Products 
router.patch('/updateWallet/:id', async (req, res) => {
    const { wallet } = req.body
    console.log(req.body)
    if (!wallet)
        return res.status(400).json({ success: false, message: 'cần phải có số dư để cập nhật' })
    // const hashPass = await argon2.hash(passWord)
    try {
        let updateUser = {
            wallet: wallet || []

        }

        const userIdUpdation = { _id: req.params.id }
        updateUser = await user.findOneAndUpdate(userIdUpdation, updateUser, { new: true })
        // console.log(updateUser)
        if (!updateUser) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy người dùng nào như vậy!' })
        }
        return res.json({ success: true, message: 'Cập nhật thành công!', updateUser })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})

module.exports = router
