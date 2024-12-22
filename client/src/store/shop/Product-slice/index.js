import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    productList: [],
  };

const getAllShopProducts = createAsyncThunk("product/getAllProduct", async () => {
    const response = await axios.get(
      "http://localhost:5000/api/shop/products/get"
    );
    return response?.data;
  });


const ShopProductSlice = createSlice({
    name: "shoppingProduct",
    initialState,
    reducer: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllShopProducts.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllShopProducts.fulfilled, (state, action) => {
          // console.log(action.payload);
          state.isLoading = false;
          state.productList = action.payload.data;
        })
        .addCase(getAllShopProducts.rejected, (state) => {
          state.isLoading = false;
          state.productList = [];
        });
    },
  });

export {getAllShopProducts};
export default ShopProductSlice.reducer;