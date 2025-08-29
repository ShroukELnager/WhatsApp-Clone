import { createSlice } from "@reduxjs/toolkit";

const ArchiveSlice = createSlice({
  name: "archiveChat",
  initialState: { 
    archiveList: [], 
    counter: 0 
  },
  reducers: {
    addArchive(state, action) {
      const chat = action.payload;
      if (!state.archiveList.find((c) => c.contact === chat.contact)) {
        state.archiveList.push(chat);
        state.counter += 1;
      }
    },
    removeArchive(state, action) {
      const chat = action.payload;
      state.archiveList = state.archiveList.filter(
        (c) => c.contact !== chat.contact
      );
      state.counter -= 1; 
    },
  },
});

export const { addArchive, removeArchive } = ArchiveSlice.actions;
export default ArchiveSlice.reducer;
