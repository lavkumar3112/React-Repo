
import React from "react";
import ReactDOM from "react-dom/client";

const parent=React.createElement(
    "div",
    {id:"parent"},
    React.createElement(
        "div",
        {id:"child"},
        [React.createElement("h1",{},"This is heading"),React.createElement("h2",{},"This is heading Namaste React 👺")]
        )
);

//JSX


console.log(parent);


const heading= React.createElement(
    "h1",
    {id:"heading"},
    "This is React Web");
console.log(heading); //object
const root= ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);

 