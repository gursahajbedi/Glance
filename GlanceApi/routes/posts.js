const express=require('express')
const router=express.Router()


const {
    allposts,
    newpost,
    deletepost,
    postview,
}=require("../controllers/posts")

router.route("/").get(allposts).post(newpost)
router.route("/:id").delete(deletepost).get(postview)

module.exports=router