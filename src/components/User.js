import { useEffect, useState } from "react";

const User = ({name}) =>{
const [count]=useState(0);

    useEffect(()=>{
        //Api Calls
    },[]);

    

    return (
    <div className="user-card">
        <h1>Count : {count}</h1>
        <h2>Name: {name}</h2>
        <h3>Location : Patna</h3>
        <h4>Contact: @lavkumar</h4>

    </div>
    );
}

export default User;