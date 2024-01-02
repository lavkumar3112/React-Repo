import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";


const Body = () => {

    //local State Vasriable - Super powerful variable
    const [listOfRestaurents,setListOfRestaurent]=useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText,setSearchText]=useState("");

    // Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
    console.log("Body rendered");

    useEffect(()=>{
        console.log("render useEffect");
        fetchData();
    },[]);

    const fetchData= async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.6234486&lng=85.1323779&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        console.log(json.data.cards[1]);

        console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
            //Optional Chaining
        setListOfRestaurent(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    };

    // Conditional rendering
    // if(listOfRestaurents.length === 0){
    //     return <Shimmer />;
    // }


    return  listOfRestaurents.length === 0 ? (
    <Shimmer />
     ) : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" className="search-box" value={searchText} onChange={(e)=>{
                        setSearchText(e.target.value);
                    }}/>
                    <button onClick={() => {
                        //Filter res card and update UI
                        //searchText
                        console.log(searchText);
                        console.log(listOfRest);
                        const filteredRestaurent = listOfRestaurents.filter((res) => res.info.name.tolowerCase().includes(searchText.toLowerCase()));
                        setFilteredRestaurant(filteredRestaurent);


                    }}>Search</button>
                </div>
                <button className="filter-btn" onClick={()=>{
                    const filteredList=listOfRestaurents.filter(
                        (res)=>res.info.avgRating>4
                    );
                    setListOfRestaurent(filteredList);
                }}
                >
                    Top Rated Restaurent</button>
            </div>
            <div className="res-container">
                {
                    filteredRestaurant.map((restaurent) => (
                    <RestaurantCard key={restaurent.info.id}resData={restaurent}/>
                ))}
                    
            </div>
        </div>
    );
};
export default Body;