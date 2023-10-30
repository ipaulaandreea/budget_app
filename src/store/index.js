import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './modal'
import transactionReducer from './transaction'
import budgetItemReducer from './budgetItems'
const store = configureStore({
    reducer: { 
      modal: modalReducer, 
      transaction: transactionReducer,
      budgetItem: budgetItemReducer
 
    },
  });
  
  export default store;