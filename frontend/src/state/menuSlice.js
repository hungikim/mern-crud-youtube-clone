import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        isProfileMenuVisible: false
    },
    reducers: {
        // Used in UpdateVideo component to fire refresh in Video component
        toggleIsProfileMenuVisible: (state) => {
            state.isProfileMenuVisible = state.isProfileMenuVisible? false: true
        },
    }
})

export const { toggleIsProfileMenuVisible } = menuSlice.actions

export default menuSlice.reducer