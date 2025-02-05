import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {      
    isLoading: false,
    reviews: []    
};

export const addReview = createAsyncThunk(
    "review/addReview",
    async (formData) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/shop/review/add`,
            formData
        );
        return response.data;
    }
);

export const getReview = createAsyncThunk(
    "review/getReview",
    async (productId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/review/${productId}`, 
        );
        return response.data;
    }
);

const reviewSlice = createSlice({
    name: "reviewSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload.data;              
            })
            .addCase(getReview.rejected, (state, action) => {
                state.isLoading = false;
                state.reviews = []
            });
    }           
});

export default reviewSlice.reducer;
