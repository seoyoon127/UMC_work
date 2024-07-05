import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    show:false, 
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal:(state)=>{
      state.show=true;
    },
    dropModal:(state)=>{
      state.show=false;
    }
  }
});



export const {showModal, dropModal} = modalSlice.actions;
export default modalSlice.reducer;