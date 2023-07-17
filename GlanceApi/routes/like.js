const express=require("express")
const router=express.Router()

const {
    addlike,
    getlike,
    deletelike
}=require("../controllers/like")

router.route('/:id').post(addlike).patch(deletelike).get(getlike)

module.exports=router