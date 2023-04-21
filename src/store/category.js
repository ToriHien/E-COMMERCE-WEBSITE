import { createSlice } from "@reduxjs/toolkit";

const initialCategoryState = {
    category:''
}

const categorySlice = createSlice({
    name: 'category',
    initialState: initialCategoryState,
    reducers: {
        getCategory(state,action){state.category = action.payload}
    }
})

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;

