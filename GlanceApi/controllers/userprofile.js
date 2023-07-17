const U=require('../models/user.model')

const profileview=async(req,res)=>{
    const username=req.query.username
    console.log(username)
    if(!username,username==undefined){
        const all=await U.UserProfile.find({}).then((res)=>{return res})
        res.send({all})
    }
    else{
        const found=await U.User.findOne({"username":username}).then((res)=>{return res})
        if(found==[]){
            res.status(404).send({err:"No User Exists by that name"})
        }
        else{
            const userid=found.id
            const profile=await U.UserProfile.findOne({"user":userid}).then((res)=>{return res})
            console.log(profile)
            res.status(200).send({profile})
            
        }
    }    
}
const changeview=async(req,res)=>{
    const {bio,profile_pic}=req.body
    const username=req.query.username    
    const found=await U.User.findOne({username}).then((res)=>{return res})
    if(found==[]){
        res.status(404).send({err:"No User Exists by that name"})
    }
    else{
        const userid=found.id
        const profile=await U.UserProfile.findOneAndUpdate({"user":userid},{"bio":bio,"profile_pic":profile_pic}).then(
            (res)=>{
                return res
            }
        )
        res.status(200).send({success:profile})

    }
}

module.exports={profileview,changeview}