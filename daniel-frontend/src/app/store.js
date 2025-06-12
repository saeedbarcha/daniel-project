
// import { configureStore } from '@reduxjs/toolkit';
// import { apiSlice } from '../features/ApiSlice';
// import { authReducer } from '../features/AuthSlice';

// export const Store = configureStore({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         auth: authReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(apiSlice.middleware),
// });
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";
import authSliceReducer from "../features/authSlice";

export const Store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})
