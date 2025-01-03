import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/Product-slice";
import shopProductSlice from "./shop/Product-slice";
import shopCartSlice from "./shop/Cart-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,
    shopProduct: shopProductSlice,
    cart: shopCartSlice,
    },
});

export default store;
