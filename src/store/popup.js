import { createSlice } from '@reduxjs/toolkit';

const initialPopupState = {
    isPopup: false,
    productPopup:[]
};
const popupSlice = createSlice({
    name: 'Pop Up',
    initialState: initialPopupState,
    reducers:{
        showPopup(state){state.isPopup = true},
        hidePopup(state){state.isPopup = false},
        getProduct(state,action){state.productPopup = action.payload}
    }
})

export const popupActions = popupSlice.actions;
export default popupSlice.reducer;
