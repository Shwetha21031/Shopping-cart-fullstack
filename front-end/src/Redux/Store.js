import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "./ProductsSlice";
import loginSlice from "./loginSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer:{
        products : ProductsSlice,
        login : loginSlice,
        cart: cartSlice
    }   
})

export default store