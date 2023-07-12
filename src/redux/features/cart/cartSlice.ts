import { IProduct } from '@/types/globalTypes';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IinitialState {
  products: Array<IProduct>;
  total: number;
}

const initialState: IinitialState = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const isExist = state.products.find(
        ({ _id }) => _id === action.payload._id
      );
      if (isExist) {
        isExist.quantity = isExist.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      state.total += action.payload.price;
    },

    reduceQuantity: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.map((product) => {
        if (product._id === action.payload._id && product.quantity! > 1) {
          state.total -= action.payload.price;
          return { ...product, quantity: product.quantity! - 1 };
        } else {
          return product;
        }
      });
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        ({ _id }) => _id !== action.payload._id
      );
      state.total =
        state.total - action.payload.quantity! * action.payload.price;
    },
  },
});

export const { addToCart, reduceQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
