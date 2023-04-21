import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    carts:{cart:{},quantity:0},
    quantityAll:0,
    listCart: [],
    priceTotal: 0,
}

const cartSlice = createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        ADD_CART(state,action){state.carts.cart = action.payload},
        UPDATE_CART(state,action){
            state.listCart = action.payload;
            state.quantityAll = 0;
        },
        // DELETE_CART(state,action){state.filter},
        ADD_QUANTITY(state,action) {state.carts.quantity = action.payload},
        ADD_QUANTITYALL(state,action) {state.quantityAll += parseInt(action.payload)},
        ADD_QUANTITYLISTCART(state,action) {state.listCart.map(cart => {
            if(cart.cart._id.$oid === action.payload){
                cart.quantity += parseInt(state.quantityAll);
                state.quantityAll = 0; 
            }
            return cart;
        })},
        DELETE_CART(state,action){state.listCart.map(cart => {
            if(cart.cart._id.$oid === action.payload){
                const indexCart = state.listCart.indexOf(cart);
                state.listCart.splice(indexCart,1);
            }
            return cart
        })},
        PLUS_PRICE(state,action){
            const total = (total,num) => {
                return total + num
            }
            state.priceTotal = action.payload.reduce(total,0)
        },
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;