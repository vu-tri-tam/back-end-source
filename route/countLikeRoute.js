const express = require('express')
const router = express.Router()
const countLike = require('../model/countLike')



//@route GET api/like
//@desc check isset like

router.get('/', async (req, res) => {
    try {
        const like = await countLike.find().exec();
        // console.log(product, 464646);
        res.json({ success: true, like })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})


//@router POST api/like
//@desc create like 
router.post('/', async (req, res) => {
    const { access_times, user } = req.body
    try {
        const newLike = new countLike({

            access_times,
            user
        })
        // const jsonProduct = productNew.toString();

        await newLike.save()
        // if (productNew.hasOwnProperty()) {
        //     res.json({ success: true, message: "Sản phầm đã tồn tại" })
        // }
        res.json({ success: true, message: "Thành công", totalLike: newLike })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }

})



//@router DELETE api/like
//@desc create like 
router.delete('/:id', async (req, res) => {
    try {
        const idDelete = { user: req.params.id }
        const recordDelete = await countLike.findOneAndDelete(idDelete)
        //user not auth
        if (!recordDelete) {
            return res.status(401).json({ success: false, message: 'Không thể xóa !' })
        }
        return res.json({ success: true, message: 'Xóa thành công!', products: recordDelete })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "internal server errors" })
    }
})
module.exports = router
