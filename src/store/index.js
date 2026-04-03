import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // 確保路徑對應到剛才寫的 slice
import messageReducer from './messageSlice';
export const store = configureStore({
  reducer: { cart: cartReducer, message: messageReducer }
});

export default store;