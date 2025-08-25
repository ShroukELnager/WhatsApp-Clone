import { createSlice } from "@reduxjs/toolkit";




const ActivePageSlice=createSlice({
    name: "activePage",
    initialState:{activePage:'chat'},
    reducers:{
        changeActivePage:(state,action)=>{
         state.activePage=action.payload
        }
    }
})

export const { changeActivePage } = ActivePageSlice.actions

export default ActivePageSlice.reducer