import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    user:{},
    userLogin:{},
    userArr:[],
}

const userSlice = createSlice({
    name:'User',
    initialState: initialUserState,
    reducers:{
        getUser(state,action){ state.user = action.payload},
        ON_LOGIN(state,action){state.userLogin = action.payload},
        ON_LOGOUT(state,action){state.userLogin = action.payload},
        getUserArr(state,action){state.userArr = action.payload},
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer; 