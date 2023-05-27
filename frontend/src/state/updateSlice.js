import { createSlice } from "@reduxjs/toolkit";

export const updateSlice = createSlice({
    name: 'update',
    initialState: {
        updateTrigger: false
    },
    reducers: {
        // Used in UpdateVideo component to fire refresh in Video component
        refreshVideo: (state) => {
            state.updateTrigger = !(state.updateTrigger)
        },
    }
})

export const { refreshVideo } = updateSlice.actions

export default updateSlice.reducer