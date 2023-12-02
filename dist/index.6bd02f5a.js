/**
 * 
 * <div id="parent">
 *  <div id="child">
 *      <h1></h1>
 *  <div>
 * <div>
 */ const parent = React.createElement("div", {
    id: "parent"
}, React.createElement("div", {
    id: "child"
}, [
    React.createElement("h1", {}, "This is heading"),
    React.createElement("h2", {}, "This is heading 2")
]));
//JSX
console.log(parent);
const heading = React.createElement("h1", {
    id: "heading"
}, "This is React Web");
console.log(heading); //object
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);

//# sourceMappingURL=index.6bd02f5a.js.map
