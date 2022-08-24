import Header from "./header"
import Sidebar from "./sidebar"
import List from "./list"
import { useNavigate } from "react-router-dom"
const Mainpage=()=>{
    const navigate=useNavigate()
    return (
        <>
        <Header/>
        <Sidebar/>
        <div className="create-one">
            <h3  className="create-text" onClick={()=>navigate("/create")} >Add new activity</h3>
        </div>
        <List/>
        </>
    )
}
export default Mainpage