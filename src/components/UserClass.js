import React from 'react';

class UserClass extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userInfo: {
                name:"Dummy",
                location:"Default",
                avatar_url:"http://dummy-photo.com",
            }
        };
       // console.log(this.props.name + "Child Constructor");

    }
    async componentDidMount(){
        
        //console.log(this.props.name +"Child Component did mount");
        //Api Calls
        const data = await fetch("https://api.github.com/users/lavkumar");
        const json=await data.json();
        this.setState({
            userInfo:json,
        })
        console.log(json);
    }
    componentDidUpdate(){
        console.log("Did update");
    }
    componentWillUnmount(){
        console.log("Will UnMount");
    }
    render(){
        
        //console.log(this.props.name +"Child Render")
        const {name,location,avatar_url}=this.state.userInfo;
        return (
            <div className="user-card">
                <img src={avatar_url}/>
                <h2>Name: {name}</h2>
                <h3>Location : {location}</h3>

                <h4>Contact: @lavkumar</h4>
            </div>

        );
    }

}
export default UserClass;