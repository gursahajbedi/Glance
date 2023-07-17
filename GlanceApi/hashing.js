const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const encrypt=async(password)=>{
    if(password){
        const salt= await bcrypt.genSalt(10)
        const hash= await bcrypt.hash(password,salt)
        return hash
    }
    else{
        Error("Password is not provided, Please Try Again")
    }
}
const passcompare=async(password,hash)=>{
    const result= await bcrypt.compare(password,hash)
    return result
}

const tokenize=async(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:"3d"})
}

module.exports={encrypt,tokenize,passcompare}

