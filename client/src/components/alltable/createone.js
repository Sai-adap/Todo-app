import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./header"
import Sidebar from "./sidebar"
const Createone=()=>{
    const navigate=useNavigate()
    const [activity,setactivity]=useState("")
    const [status,setStatus]=useState("")
    const [time,setTime]=useState("")
    const [Action,setAction]=useState("")
    const handlecreate=()=>{
        if(activity.length){
            const username=localStorage.getItem("user")
            // const activity=localStorage.getItem("activity")
            // const status=localStorage.getItem("activity")
            // const time=localStorage.getItem("activity")
            // const Action=localStorage.getItem("activity")
            
            const data={
                username,
                activity,
                status,
                time,
                Action
               
            }
            axios.post("http://localhost:3002/create",data).then(()=>{
            alert("activity created")
            navigate('/mainpage')
        }).catch((err)=>{
            console.log(err)
        })
        }else{
            alert("please enter details")
        }
        
    }
    return (
        <>
        <Header/>
        <Sidebar/>
        <div className="create-page">
        <input className="input-activity" placeholder="enter activity" onChange={(e)=>{setactivity(e.target.value)}}/>
        <input className="input-activity" placeholer="enter status"  onChange={(e)=>{setStatus(e.target.value)}}/>
        <input className="input-activity" placeholer="enter time"  onChange={(e)=>{setTime(e.target.value)}}/>
        <input className="input-activity" placeholer="enter Action"  onChange={(e)=>{setAction(e.target.value)}}/>
        <button className="input-activity" onClick={handlecreate} >Submit</button>
        </div>

        </>
    )
}
export default Createone