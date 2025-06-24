import { createSlice } from '@reduxjs/toolkit';
import { fetchCartDataAsync } from './action';

const initialState = {
  cartData: [], // Assuming your cart data is an object
  status: 'idle',
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartDataAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartData = action.payload;
      })
      .addCase(fetchCartDataAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
