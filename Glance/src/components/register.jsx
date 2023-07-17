import { useContext, useState } from "react"
import { Context } from "../context/context"
import axios from "axios"
import { NavLink } from "react-router-dom"
import "./register.css"


export default function Register(){
    const [email, setEmail] = useState()
    const [username, setUsername]=useState()
    const [password,setPassword]=useState()
    const [err,seterr]=useState()
    const {dispatch}=useContext(Context)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const body={"username":username,"password":password,"email":email}
        console.log(body)
        await axios.post("https://glance-ed2v.onrender.com/api/auth/register",body).then((res)=>{
                if(res.status==200){
                    localStorage.setItem("user",JSON.stringify(res.data))
                    dispatch({payload:res.data,type:'login'})
                }
                else{
                    seterr(res.response.data.err)
                }
            }
        ).catch((err)=>{
            seterr(err.response.data.err)
        })
    }
    return(
        <div className="container d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
            <form className="p-0 d-flex bg-white">
                <div className="d-flex flex-column align-items-center p-4">
                    <div className="display-3 contianer py-5 px-2"><h1 className="display-1" style={{fontFamily:"'Lobster',cursive"}}>Glance</h1></div>
                    <div className="form-group container">
                        <label className="h2">Email</label>
                        <input id='email' type='email' onChange={(e)=>{setEmail(e.target.value)}} className="form-control border border-dark"/>
                    </div>
                    <div className="form-group container mt-3">
                        <label className="h2">Username</label>
                        <input id='username' type='text' onChange={(e)=>{setUsername(e.target.value)}} className="form-control border border-dark"/>
                    </div>
                    <div className="form-group container mt-3">
                        <label className="h2">Password</label>
                        <input id='username' type='password' onChange={(e)=>{setPassword(e.target.value)}} className="form-control border border-dark"/>
                    </div>
                    <div className="text-danger fs-5 px-3">
                        {err}
                    </div>
                    <div className="container py-2">
                        <button className="btn btn-primary mt-4" onClick={handleSubmit} type="submit">Register</button>
                    </div>
                    <div className="container pt-3">
                        <h5>Already have an account ? <span><NavLink to={"/login"}>login here</NavLink></span></h5>
                    </div>
                </div>
                <div className="p-0 show">
                    <img src="registerImage.jpg" className="fill"></img> 
                </div>
            </form>
        </div>
    )
}