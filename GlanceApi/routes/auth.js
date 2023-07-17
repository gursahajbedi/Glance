const express=require('express')
const router=express.Router()

const{
    login,
    register,
    getallusers
}=require('../controllers/auth')

const{
    profileview,
    changeview
}=require('../controllers/userprofile')

router.route('/login').post(login).get(getallusers)
router.route('/register').post(register).get(getallusers)
router.route('/profiles').get(profileview).patch(changeview)

module.exports=router