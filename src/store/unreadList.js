import { createSlice } from "@reduxjs/toolkit";

const UnreadSlice = createSlice({
  name: "unreadChat",
  initialState: { 
    unreadList: [], 
    
  },
  reducers: {
    addUnread(state, action) {
      const chat = action.payload;
      if (!state.unreadList.find((c) => c.contact === chat.contact)) {
        state.unreadList.push(chat);
      }
    },
    removeUnread(state, action) {
      const chat = action.payload;
      state.unreadList = state.unreadList.filter(
        (c) => c.contact !== chat.contact
      );
    },
  },
});

export const { addUnread, removeUnread } = UnreadSlice.actions;
export default UnreadSlice.reducer;
