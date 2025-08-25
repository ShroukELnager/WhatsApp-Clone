import { configureStore } from "@reduxjs/toolkit";
import favouriteSlice from './favouriteSlice'
import ActivePageSlice from './activePage'



const store =configureStore({
    reducer:{
        Favourite:favouriteSlice,
        ActivePage:ActivePageSlice
    }
})
export default store