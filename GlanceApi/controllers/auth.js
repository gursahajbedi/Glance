const U =require("../models/user.model")
const validator=require("validator")
const hash=require("../hashing")

const login=async(req,res)=>{
    const {password,username}=req.body
    if(!username,!password){
        return res.status(404).send({err:"missing parameters"})
    }
    const found=await U.User.findOne({username}).then(
        (res)=>{
            return res
        }
    )
    if(!found){
        return res.status(401).send({err:"the username does not exists"})
    }
    const passwordverified=await hash.passcompare(password,found.password)
    if (passwordverified){
        const token = await hash.tokenize(found._id)
        return res.status(200).send({"username":found.username,"token":token})
    }
    if (!passwordverified){
        return res.status(402).send({err:"Incorrect Password"})
    }
}
const register=async(req,res)=>{
    const {email,password,username}=req.body
    if(!username || !password || !email){
        return res.status(404).send({err:"missing parameters"})
    }
    if(!validator.default.isEmail(email)){
        return res.status(401).send({err:"email format is incorrect."})
    }
    if(!validator.default.isStrongPassword(password)){
        return res.status(402).send({err:"enter a strong password: Uppercase,Lowercase,Special Characters,Number..etc.."})
    }
    const found1=await U.User.findOne({email})
    if(found1){
        return res.status(403).send({err:"account by the following email already exists."})
    }
    const found2=await U.User.findOne({username})
    if(found2){
        return res.status(403).send({err:"account by the following password already exists."})
    }
    const encryptedpass=await hash.encrypt(password)
    const signeduser=await U.User.create({"email":email,"password":encryptedpass,"username":username})
    //create profile
    await U.UserProfile.create({"user":signeduser.id,"bio":null})
    const token=await hash.tokenize(signeduser.id)
    return res.status(200).send({username:username,token:token})
    
}
const getallusers=async(req,res)=>{
    await U.User.find({}).then(
        (data)=>{
            if(data!=[]){
                return res.status(200).send({"users":data})
            }
        }
    )
}

module.exports={login,register,getallusers}