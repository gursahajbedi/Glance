import { useContext, useEffect, useState } from "react"
import {Context} from "../context/context"
import "./post.css"
import axios from "axios"
import { Comment } from "./comment"
import { Profile } from "./profile"
import { HeartIcon, HeartIconActive, CommentIcon, DeletePostIcon} from "../../images/svg.jsx"

export const Post=(prop)=>{
    const {value}=useContext(Context)
    const currentuser=value.user.username
    const [isliked,setliked]=useState(false)
    const [like,setlike]=useState(0)
    const [show,setshow]=useState(false)
    const [showprofile,setshowprofile]=useState(false)
    

    const findlike=async()=>{
        const result=await axios.get(`api/likes/${prop.data._id}`).then((res)=>{
            console.log('Already liked')
            return res
        })
        return result
    }

    const handleuserlike=async()=>{
        const user=await axios.get('api/auth/login').then((res)=>{
                const userfind=res['data']['users']
                let found=userfind.filter((item)=>{
                    if(item.username===currentuser){
                        const found=item._id
                        return found
                    }
                })
            return found[0]._id
        })
        return user
    }

    useEffect(()=>{
        const program=async()=>{
            const result=await findlike()
            const likearr=result.data.likes
            setlike(likearr.length)
            
            const user=await handleuserlike()

            likearr.map((item)=>{
                if(item.user===user){
                    setliked(true)
                }
            })
        }
        program()
    },[value])

    const handlelike=async()=>{
        await axios.post(`api/likes/${prop.data._id}`,{"username":currentuser}).then(async()=>{
            console.log("Liked")
            setliked(true)
            const result=await findlike()
            setlike(result.data.likes.length)

        })
    }

    const handleunlike=async()=>{
        await axios.patch(`api/likes/${prop.data._id}`,{"username":currentuser}).then(async()=>{
            console.log("Unliked")
            setliked(false)
            const result=await findlike()
            setlike(result.data.likes.length)
        })
    }

    const handleDelete=async()=>{
        prop.setloading(true)
        await axios.delete(`api/posts/${prop.data._id}`).then(()=>{
            console.log("post deleted successfully")
            prop.changeeffect((prev)=>!prev)
            prop.setloading(false)
        })
    }
    return(
        <div className="my-5 rounded-5 p-0 container d-flex flex-column bg-light border border-5">
                <div className="d-flex align-items-center justify-content-between bg-dark text-light py-3 rounded-top-5 container-fluid">
                    <div className="container d-flex align-items-center py-2">
                        <div className="pfp-container bg-dark rounded-3">
                            <img src={prop.profilepic} className="pfp"></img>
                        </div>
                        <h5 className="texte ms-3" onClick={()=>setshowprofile(true)}>@{prop.username}</h5>
                    </div>
                    <div className="container text-end">
                        {prop.username===value.user.username && (<button className="border-0 bg-dark rounded" onClick={handleDelete}><DeletePostIcon/></button>)}
                    </div>
                </div>
                <div className="container-fluid image-container p-0">
                    <img src={prop.data.image} className="image"></img>
                </div>
                <div className="d-flex container mt-3 p-0">
                    {isliked && (<button className="border-0" onClick={handleunlike}><HeartIconActive/></button>)}
                    {!isliked && (<button className="border-0" onClick={handlelike}><HeartIcon/></button>)}
                    <button className="border-0" onClick={()=>setshow(true)}><CommentIcon/></button>
                </div>
                <div className="container-fluid fw-bold fs-5 ms-2 my-2 ">
                            {like} likes
                </div>
                <div className="container-fluid mb-4">
                    <div className="h3 text-secondary">@{prop.username} <span className="text-dark">{prop.data.caption}</span></div>
                </div>
                {show && (<div className="overlay d-flex justify-content-center align-items-center">
                    <Comment postid={prop.data._id} setshow={setshow}/>
                </div>)}
                {showprofile && (<div className="overlay d-flex justify-content-center align-items-center">
                    <Profile username={prop.username} setshowprofile={setshowprofile} data={prop.data.profile}/>
                </div>)}
        </div>
    )
}