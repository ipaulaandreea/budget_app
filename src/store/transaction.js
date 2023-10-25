import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
      selectedTransaction: null,
    },
    reducers: {
      
      selectTransaction(state, action) {
        console.log('im in redux')
        state.selectedTransaction = action.payload;
       
      },

      deselectTransaction(state) {
        console.log('im in redux')
        state.selectedTransaction = null;
       
      },

    },
  });
  
  export const transactionActions = transactionSlice.actions;
  export default transactionSlice.reducer;