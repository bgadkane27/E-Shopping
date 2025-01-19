import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    approvalURL: null,
    orderId:  null
};

export const createNewOrder = createAsyncThunk(
    "order/createNewOrder",
    async ({orderData}) => {
        const response = await axios.post(
            `http://localhost:5000/api/shop/order/create`, 
            orderData
        );
        return response?.data;
    }
)

const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvalURL = action.payload.approvalURL;
                state.orderId = action.payload.orderId;
            })
            .addCase(createNewOrder.rejected, (state) => {
                state.isLoading = false;
                state.approvalURL = null;
                state.orderId = null;
            })            
    }
})

export default orderSlice.reducer;
