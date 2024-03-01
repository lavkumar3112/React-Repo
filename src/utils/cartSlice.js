import { createSlice } from "@reduxjs/toolkit";

const cartSlice =  createSlice({
    name:"cart",
    initialState: {
        items:[],
    },
    reducers:{
        addItems: (state,action)=>{
            //redux toolkit uses immer bts
            state.items.push(action.payload);
        },
        removeItem: (state)=> {
            state.items.pop();
        },
        clearCart: (state)=>{
            // RTK state either mutate state or return a new state;
           // state.items.length =0; // originalState=[]
            return {items: []}; // this new [] will be replaced inside originalState = []
        },
    }
})

export const {addItems,removeItem,clearCart}=cartSlice.actions;

export default cartSlice.reducer;