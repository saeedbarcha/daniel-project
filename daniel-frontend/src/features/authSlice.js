import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
};

const authSlice = createSlice ({
    name:'auth',
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            // How are you storing the token from the response?
            state.userInfo = action.payload;
            // Using local storage could help for debugging
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout:(state, action) =>{
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
});


export const { setCredentials, logout } = authSlice.actions;
export const selectIsAuthanticated = (state) => state.auth.isAuthanticated;
export default authSlice.reducer;