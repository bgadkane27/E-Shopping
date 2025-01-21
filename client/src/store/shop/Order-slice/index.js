import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {    
    approvalURL: null,
    isLoading: false,
    orderId:  null,
};

export const createNewOrder = createAsyncThunk(
    "order/createNewOrder",
    async (orderData) => {
        const response = await axios.post(
            `http://localhost:5000/api/shop/order/create`, 
            orderData
        );
        return response.data;
    }
);

export const capturePayment = createAsyncThunk(
    "order/capturePayment",
    async ({orderId, paymentId, payerId}) => {
        const response = await axios.post(
            `http://localhost:5000/api/shop/order/capture`, 
            {orderId, paymentId, payerId}
        );
        return response.data;
    }
);

const shoppingOrderSlice = createSlice({
    name: "shoppingOrderSlice",
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
                sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload.orderId));                
            })
            .addCase(createNewOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.approvalURL = null;
                state.orderId = null;
            });
    }           
});

export default shoppingOrderSlice.reducer;
