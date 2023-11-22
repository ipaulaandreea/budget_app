import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
      selectedTransaction: null,
      selectedMonth: null,
      selectedYear: null,
      newTransaction: null,
      
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

      selectMonth(state, action){
        state.selectedMonth=action.payload
      },

      selectYear(state, action){
        state.selectedYear=action.payload
      },

      addTransaction(state, action) {
        state.newTransaction = action.payload;
      },

    },
  });
  
  export const transactionActions = transactionSlice.actions;
  export default transactionSlice.reducer;