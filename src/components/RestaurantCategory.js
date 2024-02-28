import React, { useState } from 'react'
import ItemList from './ItemList';

const RestaurantCategory = ({data,showItems,setShowIndex}) => {
    //console.log(data);

    const handleClick = () =>{
      //console.log("clicked");
      setShowIndex();
    }
  return (
    <div>
        {/* Header*/}
        <div className='w-1/2 mx-auto my-4 bg-gray-50 shadow-lg p-4 '>
        <div className='flex justify-between cursor-pointer' onClick={handleClick}>
            <span className='font-bold text-lg'>{data.title} ({data?.itemCards?.length})</span>
            {!showItems ? (<span>🔽</span>) : (<span>⬆️</span>)}
        </div>
        {/**accrodian Body */}
        {showItems && <ItemList items={data.itemCards}/>}
        </div>
    </div>
  )
}

export default RestaurantCategory