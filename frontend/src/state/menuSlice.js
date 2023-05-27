import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        isProfileMenuOpen: false
    },
    reducers: {
        // Used in UpdateVideo component to fire refresh in Video component
        setIsProfileMenuOpen: (state) => {
            state.isProfileMenuOpen = state.isProfileMenuOpen? false: true
        },
    }
})

export const { setIsProfileMenuOpen } = menuSlice.actions

export default menuSlice.reducer