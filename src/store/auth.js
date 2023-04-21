import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated:'false',

}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers:{
        login(state,action){state.isAuthenticated = action.payload},
        logout(state,action){state.isAuthenticated = action.payload},

    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;
