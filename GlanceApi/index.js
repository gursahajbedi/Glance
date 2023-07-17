//package imports
const express=require('express')
const dotenv=require('dotenv')
const bodyParser=require('body-parser')
const cors=require('cors')
const path=require('path')

//file imports
const authentication=require('./routes/auth')
const db=require('./db/db')
const posts=require("./routes/posts")
const likes=require("./routes/like")
const comments=require('./routes/comment')
//dependencies
dotenv.config()
const app=express()
app.use(express.json())
app.use(bodyParser.urlencoded())
app.use(cors())

//route
app.use('/api/auth',authentication)
app.use('/api/posts',posts)
app.use('/api/likes',likes)
app.use('/api/comments',comments)

//for Render

const _dirname=path.dirname("")
const buildPath=path.join(_dirname , "../Glance/dist")
app.use(express.static(buildPath))

app.get("*",(req,res)=>{
    res.sendFile(
        path.resolve('../Glance/dist/index.html')
    )
})

//start
const start=async()=>{
    try{
        db(process.env.URI)
        app.listen(process.env.PORT, console.log("Running On Port 5000") )
    }
    catch(err){
        console.log(err)
    }
}
start()