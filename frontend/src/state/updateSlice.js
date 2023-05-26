import { createSlice } from "@reduxjs/toolkit";

export const updateSlice = createSlice({
    name: 'update',
    initialState: {
        updateToggler: false
    },
    reducers: {
        // Used in UpdateVideo component to fire refresh in Video component
        refreshVideo: (state) => {
            state.updateToggler = !(state.updateToggler)
        },
    }
})

export const { refreshVideo } = updateSlice.actions

export default updateSlice.reducer