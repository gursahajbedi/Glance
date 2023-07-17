import { useContext, useEffect,useState } from "react"
import { Context } from "../context/context"
import { NavLink } from "react-router-dom"
import axios from "axios"
import { Post } from "./post"
import { CreatePost } from "./posthandling"
import "./home.css"
import { Profile } from "./profile"

export default function Home(){
    const {value,dispatch}=useContext(Context)
    const [data,setdata]=useState()
    const [effect,changeeffect]=useState(false)
    const [show,setshow]=useState(false)
    const [isloading,setloading]=useState(true)
    const [showprofile,setshowprofile]=useState(false)
    const [profiledata,setprofiledata]=useState()

    const handlelogout=()=>{
        localStorage.removeItem("user")
        dispatch({type:"logout"})
        console.log(value.user)
    }

    useEffect(()=>{
        axios.get('https://glance-ed2v.onrender.com/api/posts').then((res)=>{
            const posts=res.data.result
            let data=posts.map((res)=>{
                if(res.profile.user.username===value.user.username){
                    setprofiledata(res.profile)
                }
                // eslint-disable-next-line react/jsx-key
                return <Post profilepic={res.profile.profile_pic}username={res.profile.user.username} data={res} changeeffect={changeeffect} setloading={setloading}/>
            })
            if(data){
                setdata(data)
                changeeffect((prev)=>!prev)
            }
        })
        setloading(false)
    },[effect])
    return(
        <div className="">
            <div className="bg-dark container-fluid text-white text-center py-4">
                <h1 className="display-3" style={{fontFamily:"'Lobster',cursive"}}>Glance</h1>
                <div className="container-fluid d-flex justify-content-center gap-5 pt-4">
                    <NavLink to={"/login"} className="text-decoration-none"><h5 className="text text-white" onClick={handlelogout}>Logout</h5></NavLink>
                    <h5 className="text text-white" onClick={()=>{setshow(true)}}>Create Post</h5>
                    <h5 className="text text-white" onClick={()=>{setshowprofile(true)}}>Your Profile</h5>
                </div>
            </div>

            <div className="container">
                {isloading ? "Loading...." : (data)}
            </div>

            {show && <CreatePost username={value.user.username} setshow={setshow} changeeffect={changeeffect} setloading={setloading}/>}

            {showprofile && (<div className="overlay d-flex justify-content-center align-items-center">
                <Profile username={value.user.username} setshowprofile={setshowprofile} data={profiledata}/>
            </div>)}
        </div>
    )
}