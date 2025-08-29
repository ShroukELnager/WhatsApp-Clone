import { configureStore } from "@reduxjs/toolkit";
import ActivePageSlice from './activePage';
import ArchiveSlice from './ArchiveSlice';
import UnreadSlice from './unreadList';
import FavouriteSlice from './FavouriteSlice'


const store =configureStore({
    reducer:{
        Favourite:FavouriteSlice,
        ActivePage:ActivePageSlice,
        Archive:ArchiveSlice,
        Unread:UnreadSlice
    }
})
export default store