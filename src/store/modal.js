import { createSlice } from "@reduxjs/toolkit";

// const initialModalState = {
//   displayModal: false,
// };

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    displayModal: false,
  },
  reducers: {
    
    displayModal(state) {
      console.log('im in redux')
      return {
      ...state, displayModal: true
      }
     
    },
    hideModal(state) {
      state.displayModal = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;