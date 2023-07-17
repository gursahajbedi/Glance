const U=require("../models/user.model")

const idfromname=async(username)=>{
    const user=await U.User.findOne({username}).then((res)=>{
        return res
    })
    return user.id
}

const commentview = async (req,res) =>{
    const {id}=req.params
    const postid=id
    const post=await U.Posts.findOne({"_id":postid}).then((res)=>{
        return res
    }).catch((err)=>{
        console.log(err)
    })
    return res.status(200).send({"comments":post.comments})
}

const addcomment = async (req,res) =>{
    const {id}=req.params
    const postid=id
    const {comment,username}=req.body
    const user_id=await idfromname(username)
    const userstring={"user":`${user_id}`,"comment":`${comment}`}
    const commentupdate=await U.Posts.findOneAndUpdate({"_id":postid},
    {$push:{comments:userstring}}
    ).then((res)=>{
        return res
    })
    return res.status(200).send({"success":commentupdate.comments})
    
}

const deletecomment=async (req,res)=>{
    const {id}=req.params
    const postid=id
    const {comment,username}=req.body
    const user_id=await idfromname(username)
    const userstring={"user":`${user_id}`,"comment":`${comment}`}
    const commentdelete=await U.Posts.findOneAndUpdate({"_id":postid},
    {$pull:{comments:userstring}}
    ).then((res)=>{
        return res
    })
    return res.status(200).send({"deleted":commentdelete.comments})
}

module.exports={deletecomment,addcomment,commentview}