import React from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../hooks/useRestaurantMenu";


const RestaurantMenu = () =>{

    
    const {resId} = useParams();
    const resInfo = useRestaurantMenu(resId);
   // console.log(resInfo);
    

   

    if(resInfo === null ){
        <Shimmer/>
    }
    
    // const {name,cuisines, costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info;

     //const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
    
     //console.log(itemCards);

    return (
        <div className="menu">
            <h1>{resInfo?.cards[2]?.card?.card?.info?.name}</h1>
            <p> {resInfo?.cards[2]?.card?.card?.info?.cuisines.join(", ")} - {resInfo?.cards[2]?.card?.card?.info?.costForTwoMessage}</p>
            <h2>Menu</h2>
            <ul>
                {resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards.map((item)=>(
                    <li key={item.card.info.id}>
                        {item.card.info.name} -{"Rs."}
                        {item.card.info.price/100 || item.card.info.defaultPrice/100}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default RestaurantMenu;
