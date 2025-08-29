import { configureStore } from "@reduxjs/toolkit";
import FavouriteSlice from './FavouriteSlice'
import ActivePageSlice from './activePage'
import ArchiveSlice from './ArchiveSlice'
import UnreadSlice from './unreadList'


const store =configureStore({
    reducer:{
        Favourite:FavouriteSlice,
        ActivePage:ActivePageSlice,
        Archive:ArchiveSlice,
        Unread:UnreadSlice
    }
})
export default store