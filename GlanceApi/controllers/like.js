const U=require('../models/user.model')

const idfromname=async(username)=>{
    const user=await U.User.findOne({username}).then((res)=>{
        return res
    })
    return user.id
}

const addlike=async(req,res)=>{
    //here id is postid
    const {id}=req.params
    const {username}=req.body
    const user_id=await idfromname(username)
    const userstring={"user":`${user_id}`} 
    const likeupdate=await U.Posts.findOneAndUpdate({"_id":id},
    {$push:{likes:userstring}},
    {
        new:true
    }
    ).then((res)=>{
        return res
    })
    res.status(200).send({'success':likeupdate})
}

const getlike=async(req,res)=>{
    const {id}=req.params
    const likes=await U.Posts.findOne({"_id":id}).then((res)=>{return res}).catch((err)=>{console.log(err)})
    if (likes!=null){
        res.status(200).send({"likes":likes.likes})
    }
}

const deletelike=async(req,res)=>{
    const {id}=req.params
    const {username}=req.body
    const user_id=await idfromname(username)
    const userstring={"user":`${user_id}`} 
    const dellike=await U.Posts.findOneAndUpdate({"_id":id},
    {$pull:{likes:userstring}},
    {
        new:true
    }
    ).then((res)=>{
        return res
    })
    res.status(200).send({"deleted":dellike.likes})
}

module.exports={addlike,getlike,deletelike}