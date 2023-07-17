import { useContext, useEffect, useState } from "react"
import { Context } from "../context/context"
import "./profile.css"
import axios from "axios"
import { BackIcon, CloseIcon, EditIcon, Submit } from "../../images/svg"

export const Profile=(prop)=>{
    const {value}=useContext(Context)    
    const currentuser=value.user.username
    const [edit,setedit]=useState(false)
    const [user,setuser]=useState(false)
    const [pfp,setpfp]=useState()
    const [bio,setbio]=useState()

    useEffect(()=>{
        if (currentuser==prop.username){
            setuser(true)
        }
    },[value])

    const handleEdit=async(e)=>{
        e.preventDefault()
        await axios.patch(`api/auth/profiles?username=${currentuser}`,{"bio":bio,"profile_pic":pfp}).then((res)=>{
            console.log(res)
            setedit(false)
        })
    }

    return(
        <div className="overlay d-flex justify-content-center align-items-center">
            <div className="container border border-dark bg-dark text-light d-flex justify-content-center align-items-center flex-column">
                <button className="mt-3 border-0 bg-dark" onClick={()=>prop.setshowprofile(false)}><CloseIcon/></button>
                <h1 className="my-3">@{prop.username}</h1>
                <br/>
                {!edit &&(
                <div>
                    <div className="profile-container conatiner text-center ">
                        <h5>Profile Picture</h5>
                        <img className="border profile" src={prop.data.profile_pic}></img>
                    </div>
                    <br/>
                    <div className="text-center mt-4 container">
                        <h5>Bio</h5>
                        <p>" {prop.data.bio} "</p>
                    </div>
                </div>
                )}
                {edit &&(
                    <div>
                        <form className="text-center container d-flex gap-3 mb-4" onSubmit={handleEdit}>
                            <div className="container">
                                <label><h5>Profile Picture</h5></label>
                                <input type="text" name="profile_pic" className="form-control" onChange={(e)=>{setpfp(e.target.value)}}/>
                                <br/>
                                <label><h5>Bio</h5></label>
                                <input type="text" name="profile_pic" className="form-control" onChange={(e)=>{setbio(e.target.value)}}/>
                            </div>
                            <button type="submit" className="btn btn-outline-success border-5 my-0"><Submit/></button>
                        </form>
                    </div>
                )}
                <div className="gap-4 d-flex mb-4">
                    {user && !edit && (<button className="mt-3 btn btn-primary rounded-2" onClick={()=>setedit(true)}><EditIcon/></button>)}
                    {user && edit && (<button className="mt-3 btn btn-primary rounded-2" onClick={()=>setedit(false)}><BackIcon/></button>)}
                </div>
            </div>
        </div>
    )
}