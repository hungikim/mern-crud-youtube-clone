import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        isProfileMenuVisible: false,
        searchText: ""
    },
    reducers: {
        // Used in UpdateVideo component to fire refresh in Video component
        toggleIsProfileMenuVisible: (state) => {
            state.isProfileMenuVisible = state.isProfileMenuVisible? false: true
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload
        }
    }
})

export const { toggleIsProfileMenuVisible, setSearchText } = menuSlice.actions

export default menuSlice.reducer