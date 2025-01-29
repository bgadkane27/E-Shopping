import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/Product-slice";
import adminOrderSlice from "./admin/Order-slice"

import shopProductSlice from "./shop/Product-slice";
import shopCartSlice from "./shop/Cart-slice";
import shopAddressSlice from "./shop/Address-slice";
import shopOrderSlice from "./shop/Order-slice";
import shopSearchSlice from "./shop/Search-slice";
import shopReviewSlice from "./shop/Review-slice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,
    adminOrder: adminOrderSlice,
    shopProduct: shopProductSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
    },
});

export default store;
