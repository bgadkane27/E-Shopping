import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    cart: [],
};

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userID, productId, quantity }) => {
        const response = await axios.post(
            `http://localhost:5000/api/shop/cart/add`,
            { userID, productId, quantity }
        );
        return response?.data;
    }
);

export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async (userID) => {
        const response = await axios.get(
            `http://localhost:5000/api/shop/cart/get/${userID}`
        );
        return response?.data;
    }
);

export const updateCartItem = createAsyncThunk(
    "cart/updateCartItem",
    async ({ userID, productId, quantity }) => {
        const response = await axios.put(
            `http://localhost:5000/api/shop/cart/update`,
            { userID, productId, quantity }
        );
        return response?.data;
    }
);

export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async ({ userID, productId }) => {
        const response = await axios.delete(
            `http://localhost:5000/api/shop/cart/delete/${userID}/${productId}`
        );
        return response?.data;
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload.data;
            })
            .addCase(addToCart.rejected, (state) => {
                state.isLoading = false;
                state.cart = [];
            })
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload.data;
            })
            .addCase(fetchCartItems.rejected, (state) => {
                state.isLoading = false;
                state.cart = [];    
            })
            .addCase(updateCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload.data;
            })
            .addCase(updateCartItem.rejected, (state) => {
                state.isLoading = false;
                state.cart = [];    
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload.data;
            })
            .addCase(deleteCartItem.rejected, (state) => {
                state.isLoading = false;
                state.cart = [];    
            });
    }}
);

export default cartSlice.reducer;
