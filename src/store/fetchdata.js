import { createSlice } from "@reduxjs/toolkit";

const initialFetchDataState = {
    data:[],
}

const fetchDataSlice = createSlice({
    name: 'fetch Data',
    initialState: initialFetchDataState,
    reducers:{
        getData(state,action){state.data=action.payload},
    }
})

export const fetchDataActions = fetchDataSlice.actions;
export default fetchDataSlice.reducer;