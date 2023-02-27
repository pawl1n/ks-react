import { ProductType } from "../api/Products";
import { createSlice } from "@reduxjs/toolkit";

export interface CartItemType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
}

export const CartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItemType[],
  reducers: {
    addToCart: (state, action: { payload: ProductType }) => {
      const product = action.payload;
      const existingItem = state.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.push({
          ...product,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action: { payload: number }) => {
      const id = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        state.splice(state.indexOf(existingItem), 1);
      }
    },
    clearCart: (state) => {
      state.splice(0, state.length);
    },
    incrementQuantity: (state, action: { payload: number }) => {
      const id = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
      }
    },
    decrementQuantity: (state, action: { payload: number }) => {
      const id = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity--;

        if (existingItem.quantity === 0) {
          state.splice(state.indexOf(existingItem), 1);
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;
