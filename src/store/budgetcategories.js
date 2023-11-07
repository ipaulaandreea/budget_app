import { createSlice } from "@reduxjs/toolkit";

const budgetCategorySlice = createSlice({
    name: "budgetCategory",
    initialState: {
      isAddingBudgetCategory: false,
    },
    reducers: {
      
      addBudgetCategory(state, action) {
        state.isAddingBudgetCategory = true;
       
      },

    },
  });
  
  export const budgetCategoryActions = budgetCategorySlice.actions;
  export default budgetCategorySlice.reducer;