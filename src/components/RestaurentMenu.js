import React, { useState,useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";

const RestaurentMenu = () =>{

    const [resInfo , setResInfo]=useState(null);
    const {resId} = useParams();

    useEffect(()=>{
        fetchMenu();
    },[]);

    const fetchMenu = async () => {
        const data= await fetch(
            MENU_API+resId+"&catalog_qa=undefined&submitAction=ENTER"
        );
        const json = await data.json();
        console.log(json);
        setResInfo(json.data);
    };

    if(resInfo === null ){
        <Shimmer/>
    }
    
    const { name,cuisines,costForTwoMessage } = resInfo?.cards[0]?.card?.card?.info;

    const {itemCards} = resinfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
    
    console.log(itemCards);

    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines.join(", ") - costForTwoMessage}</p>
            <h1>{name}</h1>
            <h2>Menu</h2>
            <ul>
                <li>Biryani</li>
                <li>Biryani</li>
                <li>Biryani</li>
            </ul>
        </div>
    );
};
export default RestaurentMenu;
