const mongoose=require('mongoose')

const User=mongoose.model("User",mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    }
}))

const UserProfile=mongoose.model("Profile",mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    bio:{
        type:String,
        required:false
    },
    profile_pic:{
        type:String,
        required:false,
        default:"https://i1.sndcdn.com/artworks-aHErbOLHNoRpBWb3-Rng7vg-t500x500.jpg"
    },
    created_on:{
        type:Date,
        default:Date.now()
    }
}))

const Posts=mongoose.model("Posts",mongoose.Schema({
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true
    },
    image:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        required:true
    },
    comments:[{
        user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        comment:{type:String}
    }],
    likes:[{
        user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    }]
    

}))

module.exports={User,UserProfile,Posts}