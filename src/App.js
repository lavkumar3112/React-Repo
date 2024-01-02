
import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";











const AppLayout = () =>{
    return (
        <div className="app">
            <Header/>
            <Body />
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



const root=ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout/>);

 