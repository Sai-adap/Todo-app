import "./style.css"

const Header=()=>{
    return (
        <>
        <div className="header" >
            <h3 className="mainpage-name" >{localStorage.getItem("user")}</h3>
        </div>
        </>
    )
}
export default Header