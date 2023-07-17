const express=require('express')
const router=express.Router()

const {
    commentview,
    addcomment,
    deletecomment
} = require('../controllers/comment')

router.route('/:id').get(commentview).post(addcomment).patch(deletecomment)

module.exports=router


