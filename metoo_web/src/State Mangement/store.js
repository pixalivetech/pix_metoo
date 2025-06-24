import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducer';
import { fetchCartDataAsync } from './action';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
export default store;