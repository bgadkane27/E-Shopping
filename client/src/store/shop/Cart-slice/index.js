import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    cartItems: [],
};

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId, quantity }) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/shop/cart/add`,
            { userId, productId, quantity }
        );
        return response?.data;
    }
);

export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItem",
    async (userId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`
        );
        return response?.data;
    }
);

export const updateCartItem = createAsyncThunk(
    "cart/updateCartItem",
    async ({ userId, productId, quantity }) => {
        const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`,
            { userId, productId, quantity }
        );
        return response?.data;
    }
);

export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async ({ userId, productId }) => {
        const response = await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/shop/cart/delete/${userId}/${productId}`
        );
        return response?.data;
    }
);

const cartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(addToCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(fetchCartItems.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];    
            })
            .addCase(updateCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(updateCartItem.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];    
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(deleteCartItem.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];    
            });
    }}
);

export default cartSlice.reducer;
