import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    addressList: []
}

export const addNewAddress = createAsyncThunk(
    "address/addNewAddress",
    async ({ formData }) => {
        const response = await axios.post(
            "http://localhost:5000/api/shop/address/add", 
            { formData });
        return response?.data
    }
)

export const editaAddress = createAsyncThunk(
    "address/editAddress",
    async ({ userId, addressId, formData }) => {
        const response = await axios.put(
            `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`, 
            { formData });
        return response?.data
    }
)

export const deleteAddress = createAsyncThunk(
    "address/deleteAddress",
    async ({ userId, addressId }) => {
        const response = await axios.delete(
            `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`,
            );
        return response?.data
    }
)

export const getAllAddress = createAsyncThunk(
    "address/getAllAddress",
    async ({ userId }) => {
        const response = await axios.get(
            `http://localhost:5000/api/shop/address/get/${userId}`
            );
        return response?.data
    }
)

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(addNewAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            })
            .addCase(getAllAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(getAllAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            })
    }

})

export default addressSlice.reducer;