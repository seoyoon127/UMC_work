import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const fetchMusicList = createAsyncThunk(
  'musics/fetchMusicList',
  async (_, thunkAPI) => {
    try{
      const response = await axios.get('http://localhost:8080/matthw');
      console.log(response.data);
      return response.data;
    }catch(error){
      return thunkAPI.rejectWithValue('에러가 발생했습니다. 데이터 요청 경로를 확인해주세요!');
    }
  
  },
);

const initialState = {
  entities: [],
  loading: 'idle',
  error:null,
  totalAmount: 0,
  totalPrice: 0,
} ;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (state, action) => {
      const { id } = action.payload;
      const item = state.entities.find(item => item.id === id);
      if (item) {
        item.amount++;
      }
    },
    decrease: (state, action) => {
      const { id } = action.payload;
      const item = state.entities.find(item => item.id === id);
      if (item && item.amount > 0) {
        item.amount--;
      }
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      state.entities = state.entities.filter(item => item.id !== id);
    },
    clearCart: (state) => {
      state.entities = [];
    },
    calculateTotals:(state)=>{
      state.totalAmount=state.entities.reduce((sum, item) => sum + item.amount, 0);
      state.totalPrice=state.entities.reduce((sum, item) => sum + (item.amount * item.price), 0);
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(fetchMusicList.pending, (state)=>{
      state.loading='pending';
      state.error=null;
    })
      .addCase(fetchMusicList.fulfilled, (state,action)=>{
      state.loading='succeeded';
      state.entities=action.payload;
    })
      .addCase(fetchMusicList.rejected, (state,action)=>{
      state.loading='failed';
      state.error=action.payload;
      alert(action.payload);
    });
  }
});



export const { increase, decrease, removeItem, clearCart, calculateTotals} = cartSlice.actions;
export default cartSlice.reducer;
export { fetchMusicList };