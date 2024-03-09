import { fireEvent, render ,screen} from "@testing-library/react";
import {act} from "react-dom/test-utils"
import Header from "../Header";
import RestaurantMenu from "../RestaurantMenu";
import Cart from "../Cart";
import MOCK_DATA from "../../components/mocks/mockResMenu.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(()=>
    Promise.resolve({
        json: () =>Promise.resolve(MOCK_DATA),
        }
    )
)


it("Should load Restaurat Menu Component",async()=>{
    await act( async () => render(<BrowserRouter><Provider store={appStore}><Header/><RestaurantMenu/><Cart/></Provider></BrowserRouter>))

    const accordianHeader = screen.getByText("Maha Shivratri Special (22)");
    fireEvent.click(accordianHeader);

    const foodList=screen.getAllByTestId("food-items").length;

    expect(foodList).toBe(22);


    const addBtns=screen.getAllByRole("button",{name: "Add +"});

    fireEvent.click(addBtns[0]);

    expect(screen.getByText("Cart - (1 items)")).toBeInTheDocument();

    fireEvent.click(addBtns[1]);
    expect(screen.getByText("Cart - (2 items)")).toBeInTheDocument();
    
    expect(screen.getAllByTestId("food-items").length).toBe(24);

    fireEvent.click(screen.getByRole("button",{name: "Clear Cart"}));
    expect(screen.getAllByTestId("food-items").length).toBe(22);


    expect(screen.getByText("Cart is Empty. Add items to your cart")).toBeInTheDocument();


});
it("Should add one item in cart when add button click",async()=>{
    await act( async () => render(<BrowserRouter><Provider store={appStore}><Header/><RestaurantMenu/><Cart/></Provider></BrowserRouter>))

    const accordianHeader = screen.getByText("Maha Shivratri Special (22)");
    fireEvent.click(accordianHeader);

    const addBtns=screen.getAllByRole("button",{name: "Add +"});

    fireEvent.click(addBtns[0]);
    expect(screen.getByText("Cart - (1 items)")).toBeInTheDocument();
});

it("Should add 2 items once click on second add button",async()=>{
    await act( async () => render(<BrowserRouter><Provider store={appStore}><Header/><RestaurantMenu/><Cart/></Provider></BrowserRouter>))

    const accordianHeader = screen.getByText("Maha Shivratri Special (22)");
    fireEvent.click(accordianHeader);

    const addBtns=screen.getAllByRole("button",{name: "Add +"});

    
    fireEvent.click(addBtns[1]);
    expect(screen.getByText("Cart - (2 items)")).toBeInTheDocument();
});