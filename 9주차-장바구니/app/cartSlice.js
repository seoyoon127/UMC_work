import { createSlice} from '@reduxjs/toolkit';
import cartItems from '../constants/cartItems';

const initialState = {
  items: cartItems, 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.amount++;
      }
    },
    decrease: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && item.amount > 0) {
        item.amount--;
      }
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
    calculateTotals:(state)=>{
      const totalAmount = state.items.reduce((sum, item) => sum + item.amount, 0);
      const totalPrice = state.items.reduce((sum, item) => sum + (item.amount * item.price), 0);
      state.totalAmount=totalAmount;
      state.totalPrice=totalPrice;
    }
  },

});



export const { increase, decrease, removeItem, clearCart, calculateTotals} = cartSlice.actions;
export default cartSlice.reducer;