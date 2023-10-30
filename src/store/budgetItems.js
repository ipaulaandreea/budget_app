import { createSlice } from "@reduxjs/toolkit";

const budgetItemSlice = createSlice({
    name: "budgetItem",
    initialState: {
      selectedBudgetItem: null,
    },
    reducers: {
      
      selectBudgetItem(state, action) {
        state.selectedBudgetItem = action.payload;
       
      },

      deselectTransaction(state) {
        state.selectedBudgetItem = null;
       
      },

    },
  });
  
  export const budgetItemActions = budgetItemSlice.actions;
  export default budgetItemSlice.reducer;