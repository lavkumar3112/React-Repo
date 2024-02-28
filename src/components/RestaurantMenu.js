import React, { useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../hooks/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";


const RestaurantMenu = () =>{

    
    const {resId} = useParams();
    //Prop Drilling
    //const dummy="Dummy Data";

    const resInfo = useRestaurantMenu(resId);
    //console.log(resInfo);
    const [showIndex,setShowIndex]=useState(null);

   

    if(resInfo === null ){
        <Shimmer/>
    }
    
    // const {name,cuisines, costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info;

     //const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
    
     console.log(resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

     //const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c=>c.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
     //console.log(categories);

    return (
        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{resInfo?.cards[0]?.card?.card?.info?.name}</h1>
            <p className="fot-bold text-lg"> {resInfo?.cards[0]?.card?.card?.info?.cuisines.join(", ")} - {resInfo?.cards[0]?.card?.card?.info?.costForTwoMessage}</p>
            {/* categories accordions*/}
            {resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c=>c.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory").map((category,index)=>(
                //controlled components
                <RestaurantCategory key={category?.card?.card.title} data={category?.card?.card} showItems={index ===showIndex ? true :false}
                    setShowIndex = {()=>setShowIndex(index)}
                    
                />
            ))}
        </div>
    );
};
export default RestaurantMenu;
