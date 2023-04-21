import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './popup';
import categoryReducer from './category';
import fetchdataReducer from './fetchdata';
import authReducer from './auth';
import userReducer from './user'
import cartReducer from './cart';

const store = configureStore({
    reducer: {
        popup: popupReducer,
        category: categoryReducer,
        fetchdata: fetchdataReducer,
        auth: authReducer,
        user: userReducer,
        cart: cartReducer,
    }
});

export default store;