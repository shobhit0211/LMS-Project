import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        user: null,
        isAuthenicated: false,
    }

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
       userLoggedIn:(state , action) => {
        state.user = action.payload.user;
        state.isAuthenicated = true;
       },
       userLoggedOut: (state) => {
        state.user = null;
        state.isAuthenicated = false;
       }
    }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
