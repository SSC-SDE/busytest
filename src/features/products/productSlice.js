// features/products/productsSlice.js
import { createSlice, createSelector ,createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('/api/products');
    return response.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default productsSlice.reducer;

export const selectProducts = (state) => state.products.list;

export const selectFilteredProducts = createSelector(
  [selectProducts],
  (products) => products.filter((product) => product.price < 100)
);