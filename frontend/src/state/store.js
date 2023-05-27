import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import updateReducer from './updateSlice.js'
import menuReducer from './menuSlice.js'

export default configureStore({
    reducer: {
        auth: authReducer,
        update: updateReducer,
        menu: menuReducer,
    },
})