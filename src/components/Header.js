import { useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../hooks/useOnlineStatus";

const Header = () => {

    const [btnName , setBtnName]=useState("Login");
    console.log("header render");

    //if no dependency array => useEffect is called on every render
    // if dependency array is empty =[] => useEffect  is called on initial render (just once)
    // if dependency array is [btnName] => alled everytime when btnName is updated.
    useEffect(()=>{
        console.log("useEffect called");
    },[btnName]);

    const onlineStatus=useOnlineStatus();

    return( 
        <div className="header">
            <div className="logo-container"> 
                <img className="logo" src={LOGO_URL}/>
            </div>
            <div className="nav-items">
                <ul>
                    <li>
                        Online Status : {onlineStatus?"Yes":"No"}
                    </li>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact Us</Link>
                    </li>
                    <li>
                        <Link to='/grocery'>Grocery</Link>
                    </li>
                    <li>Cart</li>
                    <button className="login" onClick={()=>{ 
                        btnName==="Login"
                        ? setBtnName("Logout")
                        : setBtnName("Login");
                    }}
                    >{btnName}</button>
                </ul>
            </div>
        </div>
    )
}

export default Header;