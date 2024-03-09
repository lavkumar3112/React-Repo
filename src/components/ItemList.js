import React from 'react'
import { CDN_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addItems, removeItem } from '../utils/cartSlice';

const ItemList = ({items}) => {

    //console.log(items);
    const dispatch = useDispatch();

    const handleAddItem = (item) =>{
      //dispatch an action
      dispatch(addItems(item));

    }
    const handleRemoveItem =() =>{
      dispatch(removeItem());
    }
   
  return (
    <div>
            {items.map((item) => (<div data-testid="food-items" key={item.card.info.id} className='p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between'>
              
              <div className='w-9/12'>
                <div className='py-2'>
                    <span>{item.card.info.name}</span>
                    <span> - ₹ {item.card.info.price ? item.card.info.price/100 : item.card.info.defaultPrice/100}</span>
                </div>
                <p className='text-xs '>{item.card.info.description}</p>
                </div>
                <div  className='w-3/12 p-4'>
                  
                  <div className='absolute'>
                  <button className='p-2 ml-8 rounded-l bg-black text-white shadow-lg' onClick={handleRemoveItem}>-</button>
                  <button className='p-2 mr-12 my-12 rounded-lg bg-black text-white shadow-lg' onClick={()=>handleAddItem(item)}>Add + </button>
                  </div>
                  {item.card.info.imageId && <img src={CDN_URL+ item.card.info.imageId} alt='image'/>}
                </div>
            </div>
            ))}
        
    </div>
  )
}

export default ItemList