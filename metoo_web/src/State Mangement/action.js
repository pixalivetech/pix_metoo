import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSingleCart } from '../Api/cart';
import { getUserId } from '../Utils/Storage';

// Define thunk action to fetch cart data asynchronously
export const fetchCartDataAsync = createAsyncThunk(
  'cart/fetchCartData',
  async () => {
    try {
      const userId = await getUserId();
      console.log("userId--->",userId)
      const response = await fetchSingleCart({ userId });
      return response.data;
    } catch (error) {
      // Handle errors appropriately (e.g., log, throw, etc.)
      throw Error('Failed to fetch cart data');
    }
  }
);

