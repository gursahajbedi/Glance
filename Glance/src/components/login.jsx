import { useContext, useState } from "react"
import { Context } from "../context/context"
import { NavLink } from "react-router-dom"
import axios from "axios"
import "./login.css"

export default function Login(){
    const [username, setUsername] = useState()
    const [password,setPassword]=useState()
    const {dispatch}=useContext(Context)
    const [err,seterr]=useState()
    const [loading,setloading]=useState(false)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setloading(true)
        const body={"username":username,"password":password}
        await axios.post("https://glance-ed2v.onrender.com/api/auth/login",body).then((res)=>{
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
        setloading(false)
    }
    return(
        <div className="container d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
            <form className="bg-white d-flex flex-row">
                <div className="d-flex flex-column align-items-center p-4">
                    <div className="display-3 contianer py-5 px-2"><h1 className="display-1" style={{fontFamily:"'Lobster',cursive"}}>Glance</h1></div>
                    {!loading?(
                    <div>
                        <div className="form-group container">
                            <label className="h2">Username</label>
                            <input type="text" id='username' onChange={(e)=>{setUsername(e.target.value)}} className="form-control border border-dark"/>
                        </div>
                        <div className="form-group container mt-4">
                            <label className="h2">Password</label>
                            <input id='username' type="password" onChange={(e)=>{setPassword(e.target.value)}} className="form-control border border-dark"/>
                        </div>
                        <div className="text-danger fs-5 px-3">
                            {err}
                        </div>
                        <div className="container py-2">
                            <NavLink to={"/home"}><button type="submit" className="btn btn-primary mt-4" onClick={handleSubmit}>Login</button></NavLink>
                        </div>
                        <div className="container mt-4">
                            <h5>Don't have an account ? <span><NavLink to={"/register"}>register here</NavLink></span></h5>
                        </div>
                    </div>
                    ):(
                        <div className="spinner-border container" role="status">
                            <span className="sr-only"></span>
                        </div> 
                    )
                    }
                </div>
                <div className="p-0 show">
                    <img src="loginImage.jpg" className="fill"></img>
                </div>
            </form>
        </div>
    )
}