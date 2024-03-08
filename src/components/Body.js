import { useEffect, useState ,useContext } from "react";
import Shimmer from "./Shimmer";
import RestaurantCard , {withPromtedLabel} from "./RestaurantCard";
import { Link } from "react-router-dom";
import useOnlineStatus from "../hooks/useOnlineStatus";
import UserContext from "../utils/UserContext";


const Body = () => {

    //local State Vasriable - Super powerful variable
    const [listOfRestaurants,setListOfRestaurant]=useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText,setSearchText]=useState("");

    const {loggedInUser,setUserName} =useContext(UserContext);

    const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

    //console.log(listOfRestaurants);

    // Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
    //console.log("Body rendered");

    useEffect(()=>{
        //console.log("render useEffect");
        fetchData();
    },[]);

    const fetchData= async () => {
        
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.590172&lng=85.1771294&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        //console.log(json?.data?.cards[1]);

        //console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
            //Optional Chaining
        setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    };

    const onlineStatus=useOnlineStatus();
    if(onlineStatus===false) return <h1>Looks like you are Offline!! Please check your internet connection.</h1>

    //Conditional rendering
    // if(listOfRestaurents.length === 0){
    //     return <Shimmer />;
    // }
    return listOfRestaurants.length===0?(
        <Shimmer/>): (
        <div className="body">
            <div className="filter flex">
                <div className="search p-4 m-4">
                    <input type="text" data-testid="searchInput"  className="border border-solid border-black" value={searchText} onChange={(e)=>{
                        setSearchText(e.target.value);
                    }}/>
                    <button className="px-4 py-1 bg-green-100 m-4 rounded-lg" onClick={() => {
                        //Filter res card and update UI
                        //searchText
                        console.log(searchText);
                        //console.log(listOfRestaurants);
                        const filteredRestaurant = listOfRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                        console.log(filteredRestaurant);
                        setFilteredRestaurant(filteredRestaurant);


                    }}>Search</button>
                </div>
                <div className="search p-4 m-4 flex items-center">
                <button className="px-4 py-1 bg-gray-100 rounded-lg" onClick={()=>{
                    const filteredList=listOfRestaurants.filter(
                        (res)=>res.info.avgRating>4
                    );
                    setFilteredRestaurant(filteredList);
                }}
                >
                    Top Rated Restaurant</button>
                </div>
                <div className="search p-4 m-4 flex items-center">
                    <label>UserName: </label>
                    <input className="border border-black p-2" value={loggedInUser} onChange={(e)=>setUserName(e.target.value)}/>
                </div>
                
            </div>
            <div className="flex flex-wrap">
                {
                    filteredRestaurant?.map((restaurant) => (
                   <Link 
                   key={restaurant.info.id}
                   to ={"/restaurants/" + restaurant?.info?.id}>
                    {
                    restaurant?.data?.promoted ? <RestaurantCardPromoted resData={restaurant}/> : <RestaurantCard resData={restaurant}/>
                    }
                    
                    </Link>
                ))}
                    
            </div>
        </div>
    );
};
export default Body;