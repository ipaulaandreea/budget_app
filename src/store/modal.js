import { createSlice } from "@reduxjs/toolkit";

// const initialModalState = {
//   displayModal: false,
// };

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    displayModal: false,
    isEditting: false,
    isAdding: true,
  },
  reducers: {
    displayModal(state) {
      return {
        ...state,
        displayModal: true,
      };
    },
    hideModal(state) {      
      return {
        ...state,
        displayModal: false,
      };
    },

    isAdding(state) {
      return {
        ...state,
        displayModal: true,
        isAdding: true,
        isEditting: false,
      };
    },

    isEditting(state) {
      return {
        ...state,
        displayModal: true,
        isAdding: false,
        isEditting: true,
      };
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
