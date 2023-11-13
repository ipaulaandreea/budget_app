import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getBudgetEntries from '../components/SetBudget/getBudgetEntries'

const fetchBudgetEntries = createAsyncThunk(
  "budgetItem/fetchBudgetEntries",
  async () => {
    try {
      let { budgetIncomeCategories, budgetExpensesCategories } = await getBudgetEntries();
      return { budgetIncomeCategories, budgetExpensesCategories };
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; 
    }
  }
);

const budgetItemSlice = createSlice({
    name: "budgetItem",
    initialState: {
      selectedBudgetItem: null,
      incomeBudgetEntries: [],
      expensesBudgetEntries: []
    },
    reducers: {
      
      selectBudgetItem(state, action) {
        state.selectedBudgetItem = action.payload;
       
      },

      deselectTransaction(state) {
        state.selectedBudgetItem = null;
       
      },

    },

  extraReducers: (builder) => {
    builder.addCase(fetchBudgetEntries.fulfilled, (state, action) => {
      state.incomeBudgetEntries = action.payload.budgetIncomeCategories;
      state.expensesBudgetEntries = action.payload.budgetExpensesCategories;
    });
  }
});
  
  export const budgetItemActions = budgetItemSlice.actions;
  export default budgetItemSlice.reducer;
  export {fetchBudgetEntries} ;