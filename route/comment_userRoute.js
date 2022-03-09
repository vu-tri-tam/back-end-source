const express = require('express')
const router = express.Router()
const comment_Model = require('../model/comment_user')
// const argon2 = require('argon2')
// const jwt = require('jsonwebtoken')
// const verifyToken = require('../middleWare/AuthVerify')

//@api get user: api/auth/register



//@route GET api/tken
//@desc check isset coin

router.get('/', async (req, res) => {
    try {
        const tokenMe = await comment_Model.find().exec();
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
    const { content, user, userName } = req.body
    console.log(req.body)

    try {
        const postNew = new comment_Model({
            content,
            user,
            userName

        })
        // const jsonProduct = productNew.toString();

        await postNew.save()
        // if (productNew.hasOwnProperty()) {
        //     res.json({ success: true, message: "Sản phầm đã tồn tại" })
        // }
        res.json({ success: true, message: "Tạo thành công token", comment: postNew })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})

module.exports = router
