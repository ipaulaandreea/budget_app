import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './modal'
import transactionReducer from './transaction'
import budgetItemReducer from './budgetItems'
import categoryReducer from './addcategoriestocategoriespage'
import budgetCategoryReducer from './budgetcategories'
const store = configureStore({
    reducer: { 
      modal: modalReducer, 
      transaction: transactionReducer,
      budgetItem: budgetItemReducer,
      category: categoryReducer, 
      budgetCategory: budgetCategoryReducer
      
    },
  });
  
  export default store;