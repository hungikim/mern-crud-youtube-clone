import { createSlice } from "@reduxjs/toolkit";

export const updateSlice = createSlice({
    name: 'update',
    initialState: {
        updateTrigger: false,
        isUpdateFormVisible: false
    },
    reducers: {
        // Used in UpdateVideo component to fire refresh in Video component
        refreshVideo: (state) => {
            state.updateTrigger = !(state.updateTrigger)
        },
        toggleIsUpdateFormVisible: (state) => {
            state.isUpdateFormVisible = state.isUpdateFormVisible? false: true
        },
        setIsUpdateFormVisible: (state, action) => {
            state.isUpdateFormVisible = action.payload
        }
    }
})

export const { refreshVideo, toggleIsUpdateFormVisible, setIsUpdateFormVisible } = updateSlice.actions

export default updateSlice.reducer