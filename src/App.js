
import React, {lazy,Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
//import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import {createBrowserRouter , RouterProvider , Outlet} from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import Login from "./components/Login";
// import Grocery from "./components/Grocery";


// Chunking
// COde Splitting
// Dynamic bundling
// lazy loading
// OnDemand Loading
// Dynamic Import

const Grocery = lazy(()=>import("./components/Grocery"));
const About = lazy(()=> import("./components/About"));


const AppLayout = () =>{

    const [userName,setUserName]=useState();

    //authentication
    useEffect(()=>{
        // Make an Api call and send username and password
        const data = {
            name: "Lav Kumar"
        }
        setUserName(data.name);

    },[])

    return (
        <Provider store={appStore}>
        <UserContext.Provider value={{loggedInUser:userName , setUserName}}>
        <div className="app">
            <Header/>
            <Outlet />
        </div>
        </UserContext.Provider>
        </Provider>
    );
};


// JSX - HTML-like or XML-like syntax
// JSX (transpiled before it reaches the JS ) - PARCEL -Babel

// JSX - React.createElement => ReactElement-JS Object => HTMLElement(render)

// const Heading = (
//     <h1 className="head"> 
//     Namaste React using JSX 
// </h1>
// );

//React Component
//Class Based Component -OLD
// Functional Component - NEW

// React Functional Component

// const HeadingComponent = () => {
//     return <h1>Namaste React Functional Component</h1>
// };

// // 
// const HeadingComponent2 = () => ( 
//     <div id="container">
//         {console.log("render javascript in html syntax")}
//     {Heading} 
//     <h1>Namaste React Functional Component 2</h1>
// </div>
// );

const appRouter=createBrowserRouter([
    {
        path:"/",
        element: <AppLayout/>,
        children :[
            {
                path: "/",
                element: <Body/>,
            },
            {
                path:"/about",
                element: (<Suspense fallback={<h1>Loading...</h1>}><About/></Suspense>),
            },
            {
                path:"/contact",
                element: <Contact/>,
            },
            {
                path:"/grocery",
                element: (<Suspense fallback={<h1>Loading ... </h1>}><Grocery/></Suspense>),
            },
            {
                path:"/login",
                element: <Login/>,
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu/>,
            },
            {
                path:"/cart",
                element: <Cart/>
            },
        ],
        errorElement: <Error/>
    },
    
    
])

const root=ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);

 