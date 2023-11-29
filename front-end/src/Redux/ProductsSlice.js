import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('products', async () => {

    try {
        const response = await axios.get("http://127.0.0.1:8000/items/");
        return response.data;
    } catch (error) {
        throw error; 
    }
});
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: null,
        temp:[],
    },
    reducers:{
        getAllProducts: (state,action)=>{
            state.temp = state.items
        },

        search: (state,action)=>{
            const filteredItem = state.items.filter((item) =>
                item.title.toLowerCase().includes(action.payload)
        );
            state.temp = filteredItem
        },


        sortAsc: (state,action)=>{
            state.temp.sort((a, b) => a.price - b.price);
        },


        sortDsc: (state,action)=>{
                state.temp.sort((a, b) => b.price - a.price);
              },
        

        filterByCategory: (state,action)=>{
            let filtered = state.items.filter((item)=>{
                if(item.category === action.payload){
                    return item
                }
            })
            state.temp = [...filtered]
            },
        },

    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.status = 'pending';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.items = action.payload;
            state.temp = action.payload;
            state.status = 'fulfilled'; 
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'rejected';
        });
    }
});

export default productsSlice.reducer;
export const {search,sortAsc,sortDsc,filterByCategory,getAllProducts ,addToCart} = productsSlice.actions
