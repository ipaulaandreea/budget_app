import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import getBudgetEntries from "../components/SetBudget/getBudgetEntries";

const fetchBudgetEntries = createAsyncThunk(
  "budgetItem/fetchBudgetEntries",
  async () => {
    try {
      let { budgetIncomeCategories, budgetExpensesCategories } =
        await getBudgetEntries();
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
    expensesBudgetEntries: [],
  },
  reducers: {
    deleteTransaction(state, action) {
      console.log("im in redux");

      console.log(current(state))

      const transaction = action.payload;

      state.expensesBudgetEntries = state.expensesBudgetEntries.map((entry) => {
        if (entry.category_name === transaction.category_name) {
          return {
            ...entry,
            amount_actual: entry.amount_actual - transaction.amount,
          };
        }
        return entry;
      });
      console.log(current(state))
    },

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
  },
});

export const budgetItemActions = budgetItemSlice.actions;
export default budgetItemSlice.reducer;
export { fetchBudgetEntries };
