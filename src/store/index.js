import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './modal'
import transactionReducer from './transaction'
import budgetItemReducer, {fetchBudgetEntries} from './budgetItems'
import categoryReducer, {fetchCategories} from './addcategoriestocategoriespage'
import budgetCategoryReducer, {fetchBudgetCategories} from './budgetcategories'

const store = configureStore({
    reducer: { 
      modal: modalReducer, 
      transaction: transactionReducer,
      budgetItem: budgetItemReducer,
      category: categoryReducer, 
      budgetCategory: budgetCategoryReducer
      
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
  });

  store.dispatch(fetchCategories());
  store.dispatch(fetchBudgetCategories());
  store.dispatch(fetchBudgetEntries());
  // store.dispatch(addNewCategory())

  
  export default store;