import cartSlice from "./cartSlice";
import userReducer from "./userSlice";

const { configureStore } = require("@reduxjs/toolkit");

const appStore=configureStore({
    reducer :{
        cart:cartSlice,
        user:userReducer,
    }
});
export default appStore;