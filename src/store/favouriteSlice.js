import { createSlice } from "@reduxjs/toolkit";

const FavouriteSlice = createSlice({
  name: "Favourite",
  initialState: {
    Favourites: []
  },
  reducers: {
    addFavourite(state, action) {
      const chat = action.payload;
      if (!state.Favourites.find(c => c.contact === chat.contact)) {
        state.Favourites.push(chat);
      }
    },
    removeFavourite(state, action) {
      const chat = action.payload;
      state.Favourites = state.Favourites.filter(c => c.contact !== chat.contact);
    },
  },
});

export const { addFavourite, removeFavourite } = FavouriteSlice.actions;
export default FavouriteSlice.reducer;
