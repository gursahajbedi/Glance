import {useRef ,useContext, useEffect, useState } from "react"
import { Context } from "../context/context"
import axios from 'axios'
import { DeleteCommentIcon, CloseIcon, SubmitComment, DeleteCommentIconSmall } from "../../images/svg"
import "./comment.css"


const UserComment = (prop) =>{
    
    const width=useRef(window.innerWidth)

    const handleCommentdeletion=async()=>{
        prop.setloading(true)
        await axios.patch(`https://glance-ed2v.onrender.com/api/comments/${prop.postid}`,{"username":prop.currentuser,"comment": prop.comment}).then(
            ()=>{
                console.log("Deleted Successfully")
                prop.seteffect((prev)=>!prev)
                prop.setloading(false)
            }
        )
    }

    return(
        <div className="d-flex flex-row gap-1 my-2 container">
            <div className="me-2 mobile fw-bold">{prop.username}</div>
            <div className="fw-normal mobile">{prop.comment}</div>
            {prop.username===prop.currentuser && (<button className="bg-dark border-0 delete p-0 ms-2" onClick={handleCommentdeletion}>{width.current>425?(<DeleteCommentIcon/>):(<DeleteCommentIconSmall/>)}</button>)}
        </div>
    )
}

export const Comment = (prop) =>{
    
    const {value} = useContext(Context)
    const currentuser=value.user.username
    const postid=prop.postid

    const [comment,setcomment]=useState()
    const [data,setdata]=useState()
    const [effectchange,seteffectchange]=useState(true)
    const [isloading,setloading]=useState(true)

    const handleComment=async(t)=>{
        t.preventDefault()
        setloading(true)
        await axios.post(`https://glance-ed2v.onrender.com/api/comments/${postid}`,{"username":currentuser,"comment":comment}).then(
            ()=>{
                console.log("Created Successfully")
                seteffectchange((prev)=>!prev)
                setloading(false)
            }
        )
    }
    

    useEffect(()=>{
        const program=async()=>{

            let data=await axios.get(`https://glance-ed2v.onrender.com/api/comments/${postid}`).then(
                (res)=>{
                    return res.data.comments
                }
            )
            .catch((err)=>{
                console.log(err)
            })
            
            
            data= await Promise.all(data.map(async(item)=>{
                const userlist=await axios.get('https://glance-ed2v.onrender.com/api/auth/login').then((res)=>{
                    let users=res.data.users
                    users=users.filter((x)=>{
                        if(x._id===item.user){
                            return x.username
                        }
                    })
                    return users
                })
                .catch((err)=>{
                    console.log(err)
                })
                const username=userlist[0].username
                
                // eslint-disable-next-line react/jsx-key
                return <UserComment username={username} comment={item.comment} postid={postid} currentuser={currentuser} seteffect={seteffectchange} setloading={setloading}/>
            }))
            setdata(data)
            setloading(false)
        }
        program()
    },[effectchange])

    

    return(
        <div className="container border border-dark bg-dark text-white">
            <button onClick={()=>prop.setshow(false)} className="bg-dark mt-3 border-0"><CloseIcon/></button>
            <div className="container h1 py-3">
                Comments:
            </div>
            <div className="container mb-4">
                {isloading?'Loading....':data}
            </div>
            <div>
                <form className="container form m-3 d-flex flex-row mb-5" onSubmit={handleComment}>
                    <input name="comment" type="text" className="form-control border border-dark" onChange={(t)=>{setcomment(t.target.value)}}/>
                    <button className="btn btn-outline-success border-5"><SubmitComment/></button>
                </form>
            </div>
        </div>
    )
}