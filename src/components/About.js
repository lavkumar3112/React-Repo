import User from "./User";
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component{
    constructor(props){
        super(props);
        //console.log("Parent COnstructor");
    }
    componentDidMount(){
        //console.log("Parent Component did mount");
    }

    render(){
       // console.log("Parent Render");
    return (
        <div>
        <h1>About</h1>
        
        <UserClass name={"Lav Kumar(Class)"} location={"Dehradun(Class)"}/>
        
        
        </div>

    )
    }
}
export default About;