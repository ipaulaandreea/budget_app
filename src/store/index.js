import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './modal'
import transactionReducer from './transaction'
const store = configureStore({
    reducer: { 
      modal: modalReducer, 
      transaction: transactionReducer
 
    },
  });
  
  export default store;