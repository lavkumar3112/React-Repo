import { useEffect, useState ,useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../hooks/useOnlineStatus";
import UserContext from "../utils/UserContext";

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

    const {loggedInUser}=useContext(UserContext);

    return( 
        <div className="flex justify-between bg-gray-200 shadow-lg">
            <div className="logo-container"> 
                <img className="w-40" src={LOGO_URL}/>
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4">
                        Online Status : {onlineStatus?"Yes":"No"}
                    </li>
                    <li className="px-4">
                        <Link to='/'>Home</Link>
                    </li>
                    <li className="px-4">
                        <Link to='/about'>About</Link>
                    </li>
                    <li className="px-4">
                        <Link to='/contact'>Contact Us</Link>
                    </li>
                    <li className="px-4">
                        <Link to='/grocery'>Grocery</Link>
                    </li>
                    <li className="px-4">Cart</li>
                    <button className="button" onClick={()=>{ 
                        btnName==="Login"
                        ? setBtnName("Logout")
                        : setBtnName("Login");
                    }}
                    >{btnName}</button>

                    <li className="px-4 font-bold">{loggedInUser}</li>
                </ul>
            </div>
        </div>
    )
}

export default Header;