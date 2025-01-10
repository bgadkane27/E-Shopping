import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/Product-slice";
import shopProductSlice from "./shop/Product-slice";
import shopCartSlice from "./shop/Cart-slice";
import shopAddressSlice from "./shop/Address-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,
    shopProduct: shopProductSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice
    },
});

export default store;
