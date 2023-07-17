import axios from "axios"
import { useState } from "react"
import "./posthandling.css"
import { CloseIcon, Submit } from "../../images/svg"

export const CreatePost=(prop)=>{

    const [caption,setcaption]=useState()
    const [image,setimage]=useState()

    const handleCreate=async (t)=>{
        t.preventDefault()
        prop.setloading(true)

        await axios.post(`https://glance-ed2v.onrender.com/api/posts?username=${prop.username}`,{"caption":caption,"image":image}).then(()=>{
            prop.changeeffect((prev)=>(!prev))
        })
        prop.setloading(false)
        prop.setshow(false)
    }
    return(
        <div className="overlay d-flex justify-content-center align-items-center">
            <div className="container border border-dark bg-dark text-light">
                <button className="mt-3 bg-dark border-0" onClick={()=>prop.setshow(false)}><CloseIcon/></button>
                <h1 className="my-3">Create Post</h1>
                <form onSubmit={handleCreate} className="form container d-flex mb-5">
                    <div className="flex-fill">
                        <label className="h2">Image URL:</label>
                        <input name="image" className="mb-3 form-control border border-dark" placeholder="Image" type="text" onChange={(t)=>{setimage(t.target.value)}}/>

                        <label className="h2">Caption:</label>
                        <input name="caption" className="mb-3 form-control border border-dark" placeholder="Caption" type="text" onChange={(t)=>{setcaption(t.target.value)}}/>
                    </div>

                    <button className="mb-3 btn btn-outline-success border-5 ms-3 mt-3"><Submit/></button>
                </form>
            </div>
        </div>
    )
}