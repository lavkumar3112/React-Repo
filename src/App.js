
import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import {createBrowserRouter , RouterProvider , Outlet} from "react-router-dom";
import RestaurentMenu from "./components/RestaurentMenu";



const AppLayout = () =>{
    return (
        <div className="app">
            <Header/>
            <Outlet />
        </div>
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
                element: <About/>,
            },
            {
                path:"/contact",
                element: <Contact/>,
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurentMenu/>,
            }
        ],
        errorElement: <Error/>
    },
    
    
])

const root=ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);

 