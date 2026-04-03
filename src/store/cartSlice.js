import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 從環境變數讀取 API 路徑
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

/**
 * 異步 Action: 獲取購物車列表
 * 這裡會發送 GET 請求到 /api/:path/cart
 */
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}api/${API_PATH}/cart`);
      return response.data.data; // 回傳包含 carts 陣列與 final_total 的物件
    } catch (error) {
      console.error("抓取購物車失敗:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartData: {
      carts: [], // 存放購物車內的商品清單
    },
    totalQty: 0,   // 存放購物車總數量 (顯示在 Header)
    isLoading: false,
  },
  reducers: {
    // 如果有同步的動作（例如清空前端狀態）可以寫在這裡
  },
  extraReducers: (builder) => {
    builder
      // 當 fetchCart 開始執行時
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      // 當 fetchCart 成功回傳時
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartData = action.payload;
        
        // 重點：計算購物車內所有商品的 qty 總和
        // 如果你的 API 直接有回傳總數，也可以直接賦值
        state.totalQty = action.payload.carts.reduce((acc, item) => acc + item.qty, 0);
      })
      // 當 fetchCart 失敗時
      .addCase(fetchCart.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default cartSlice.reducer;