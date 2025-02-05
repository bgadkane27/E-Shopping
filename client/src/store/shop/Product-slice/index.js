import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const getAllShopProducts = createAsyncThunk(
  "product/getAllProduct",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    }).toString();
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
    );
    return response?.data;
  }
);

export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
    );
    return response?.data;
  }
);

const ShopProductSlice = createSlice({
  name: "shoppingProduct",
  initialState,
  reducers: {
    setproductDetails: (state) => {
      state.productDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllShopProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllShopProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getAllShopProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(getProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null
      });
  },
});
export const { setproductDetails } = ShopProductSlice.actions;
// export { getAllShopProducts, getProductDetails };
export default ShopProductSlice.reducer;
