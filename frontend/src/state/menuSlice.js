import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        isMobile: false,
        isMobileMenuVisible: false,
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
        },
        setIsMobile: (state, action) => {
            state.isMobile = action.payload
        },
        toggleIsMobileMenuVisible: (state) => {
            state.isMobileMenuVisible = state.isMobileMenuVisible? false : true
        },
    }
})

export const { toggleIsProfileMenuVisible, setSearchText, setIsMobile, toggleIsMobileMenuVisible } = menuSlice.actions

export default menuSlice.reducer