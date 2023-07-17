const U = require("../models/user.model")

const allposts=async(req,res)=>{
    const posts=await U.Posts.find({}).populate({
        path:"profile",
        populate:{
            path:"user"
        }
    }).exec().then((result)=>{
        res.send({result})
    })
}
const newpost=async (req,res)=>{
    const username=req.query.username
    const {image,caption}=req.body
    if(username!=undefined){
        const user=await U.User.findOne({"username":username}).then((res)=>{return res})
        if(user){
            const userid=user.id
            const profile=await U.UserProfile.findOne({"user":userid}).then((res)=>{return res})
            if(profile){
                const profileid=profile.id
                const postcreated=await U.Posts.create({"profile":profileid,"image":image,"caption":caption}).then((res)=>{return res})
                res.status(200).send({post:postcreated})
            }
        }
    }

}
const deletepost=async(req,res)=>{
    const {id}=req.params
    if(id){
        const post=await U.Posts.findOneAndDelete({"_id":id}).then((res)=>{return res})
        res.status(200).send({delete:post})
    }
    else{
        res.status(404).send({err:"No id exists"})
    }
}
const postview=async(req,res)=>{
    const {id}=req.params
    
    if(id){
        const post=await U.Posts.findOne({"_id":id}).then((res)=>{return res})
        res.status(200).send({post})
    }
    else{
        res.status(404).send({err:"No id exists"})
    }
}

module.exports={newpost,allposts,deletepost,postview}