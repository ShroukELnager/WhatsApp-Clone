import { createSlice } from "@reduxjs/toolkit";





const favouriteSlice=createSlice({
    name:"favourite",
    initialState:{Fav:false},
    reducers:{
        
        
    switchFavourite(state){
       state.Fav = !state.Fav;

    }
    }})

export const  switchFavourite=favouriteSlice.actions;
export default favouriteSlice.reducer;