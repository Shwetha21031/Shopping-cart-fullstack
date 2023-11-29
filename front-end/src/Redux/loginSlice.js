import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState:{
        userName:"abc",
        password:'123',
        users: [],
        status: null,
    },
   reducers: {
    setUserDetails: (state,action) => {
        state.users = [...state.users , action.payload]
    }
   },
   
})

export default loginSlice.reducer
export const {registerUserDetails,setUserDetails} = loginSlice.actions