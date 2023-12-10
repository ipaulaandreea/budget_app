import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
      selectedTransaction: null,
      selectedMonth: null,
      selectedYear: null,
      newTransaction: {
        description: null,
        type: null,
        category_name: null,
        amount: null, 
        month: null, 
        year: null
      },
      isAdded: false
      
    },
    reducers: {
      
      selectTransaction(state, action) {
        state.selectedTransaction = action.payload;
       
      },

      deselectTransaction(state) {
        state.selectedTransaction = null;
       
      },

      selectMonth(state, action){
        state.selectedMonth=action.payload
      },

      selectYear(state, action){
        state.selectedYear=action.payload
      },

      addTransaction(state, action) {
        console.log('Payload:', action.payload);
 
        state.newTransaction.description = action.payload.description
        state.newTransaction.type = action.payload.type
        state.newTransaction['category_name'] = action.payload['category_name']
        state.newTransaction.amount= action.payload.amount
        state.newTransaction.month = action.payload.month 
        state.newTransaction.year = action.payload.year
        
      },
      
      isAddedChange(state){
        state.isAdded= true;
      },

      resetNewTransaction(state){
        state.isAdded = false;
        state.newTransaction.description = null;
        state.newTransaction.type = null;
        state.newTransaction['category_name'] = null;
        state.newTransaction.amount= null;
        state.newTransaction.month = null;
        state.newTransaction.year = null;
      }

    },
  });
  
  export const transactionActions = transactionSlice.actions;
  export default transactionSlice.reducer;