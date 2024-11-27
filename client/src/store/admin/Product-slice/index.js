import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

const addProduct = createAsyncThunk(
  "product/addnewproduct",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

const getAllProduct = createAsyncThunk("product/getAllProducts", async () => {
  const response = await axios.get(
    "http://localhost:5000/api/admin/products/get"
  );
  return response?.data;
});

const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({ id, formData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/products/edit:${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

const deleteProduct = createAsyncThunk("product/deleteProduct", async (id) => {
  const response = await axios.delete(
    `http://localhost:5000/api/admin/products/delete:${id}`
  );
  return response.data;
});

const AdminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(getAllProduct.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductSlice.reducer;