import { fireEvent, render ,screen} from "@testing-library/react"
import Header from "../Header"
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

test("Should render Header component with login button",()=>{
    render(
        <BrowserRouter>
        <Provider store={appStore}>
            <Header/>
        </Provider>
        </BrowserRouter>
        
    );
    
    const loginButton = screen.getByRole("button",{name:"Login"});
    //const loginButton = screen.getByText("Login");
    //Assertiom
    expect(loginButton).toBeInTheDocument();

});

test("Should render Header component with Cart items 0",()=>{
    render(
        <BrowserRouter>
        <Provider store={appStore}>
            <Header/>
        </Provider>
        </BrowserRouter>
        
    );
    
    const cartItems = screen.getByText("Cart - (0 items)");
    //Assertiom
    expect(cartItems).toBeInTheDocument();

});

test("Should render Header component with Cart item",()=>{
    render(
        <BrowserRouter>
        <Provider store={appStore}>
            <Header/>
        </Provider>
        </BrowserRouter>
        
    );
    
    const cartItems = screen.getByText(/Cart/);
    //Assertiom
    expect(cartItems).toBeInTheDocument();

})

test("Should change login to logout onclick",()=>{
    render(
        <BrowserRouter>
        <Provider store={appStore}>
            <Header/>
        </Provider>
        </BrowserRouter>
        
    );
    
    const loginButton = screen.getByRole("button",{name:"Login"});
    
    fireEvent.click(loginButton);

    const logoutButton = screen.getByRole("button",{name:"Logout"});
    
    //Assertiom
    expect(logoutButton).toBeInTheDocument();

});