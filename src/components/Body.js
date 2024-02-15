import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

const Body = () => {

    //local State Vasriable - Super powerful variable
    const [listOfRestaurants,setListOfRestaurant]=useState([]);
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
            "https://corsproxy.org/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.6234486&lng=85.1323779&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        //console.log(json.data.cards[1]);

        //console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
            //Optional Chaining
        setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    };

    // Conditional rendering
    // if(listOfRestaurents.length === 0){
    //     return <Shimmer />;
    // }


    return  (
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
                        const filteredRestaurant = listOfRestaurants.filter((res) => res.info.name.tolowerCase().includes(searchText.toLowerCase()));
                        setFilteredRestaurant(filteredRestaurant);


                    }}>Search</button>
                </div>
                <button className="filter-btn" onClick={()=>{
                    const filteredList=listOfRestaurants.filter(
                        (res)=>res.info.avgRating>4
                    );
                    setListOfRestaurant(filteredList);
                }}
                >
                    Top Rated Restaurant</button>
            </div>
            <div className="res-container">
                {
                    filteredRestaurant.map((restaurant) => (
                   <Link 
                   key={restaurant.info.id}
                   to ={"/restaurants/" + restaurant.data.id}> <RestaurantCard resData={restaurant}/></Link>
                ))}
                    
            </div>
        </div>
    );
};
export default Body;