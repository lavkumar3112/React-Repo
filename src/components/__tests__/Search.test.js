import { fireEvent, render,screen } from "@testing-library/react"
import Body from "../Body";
import MOCK_DATA from "../../components/mocks/mockRestaurantListData.json"
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(()=>{
    return Promise.resolve({
        json: ()=>{
            return Promise.resolve(MOCK_DATA);
        }
    });
});

it("Should Search resList for pizza text Input",async ()=>{
    
    await act(async ()=> render(<BrowserRouter
        ><Body/></BrowserRouter>));

        const cardsBeforeSearch  = screen.getAllByTestId("resCard");

        expect(cardsBeforeSearch.length).toBe(20);

        const searchBtn = screen.getByRole("button",{name:"Search"});

        const searchInput  = screen.getByTestId("searchInput");

        fireEvent.change(searchInput , {target: {value: "pizza"}});

        fireEvent.click(searchBtn);

        // screen should load 4 re cards

       const card =  screen.getAllByTestId("resCard");
       expect(card.length).toBe(4);

});

it("Should filter Top Rated Resaurents",async ()=>{
    
    await act(async ()=> render(<BrowserRouter
        ><Body/></BrowserRouter>));

        const cardsBeforeSearch  = screen.getAllByTestId("resCard");

        expect(cardsBeforeSearch.length).toBe(20);

        const topRatedBtn = screen.getByRole("button",{name:"Top Rated Restaurant"});

        fireEvent.click(topRatedBtn);

        const cardsAfterFilter = screen.getAllByTestId("resCard");
        expect(cardsAfterFilter.length).toBe(13);

    
});