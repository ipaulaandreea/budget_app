import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getBudgetEntries from "../components/SetBudget/getBudgetEntries";
const fetchBudgetEntries = createAsyncThunk(
  "budgetItem/fetchBudgetEntries",
  async ({ month, year }) => {
    try {
      let { budgetIncomeCategories, budgetExpensesCategories } =
        await getBudgetEntries(month, year);
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
    selectedMonth: null,
    selectedYear: null,
  },

  reducers: {
  
    deleteTransaction(state, action) {
      const transaction = action.payload;
      const expensesindex = state.expensesBudgetEntries.findIndex(
        (entry) => entry.category_name === transaction.category_name
      );
      const incomeindex = state.incomeBudgetEntries.findIndex(
        (entry) => entry.category_name === transaction.category_name
      );

      if (expensesindex !== -1) {
        state.expensesBudgetEntries[expensesindex].amount_actual -= transaction.amount;

        if (state.expensesBudgetEntries[expensesindex].amount_actual < 0) {
          state.expensesBudgetEntries[expensesindex].amount_actual = 0;
        }
      }
      
      if (incomeindex !== -1) {
        state.incomeBudgetEntries[incomeindex].amount_actual -= transaction.amount;

        if (state.incomeBudgetEntries[incomeindex].amount_actual < 0) {
          state.incomeBudgetEntries[incomeindex].amount_actual = 0;
        }
      }

    },

    selectBudgetItem(state, action) {
      state.selectedBudgetItem = action.payload;
    },

    deselectTransaction(state) {
      state.selectedBudgetItem = null;
    },

    selectMonth(state, action) {

      state.selectedMonth = action.payload;
    },
    selectYear(state, action) {
      state.selectedYear = action.payload;
      console.log(state.selectedYear)
    }
  },

    extraReducers: (builder) => {
      builder.addCase(fetchBudgetEntries.fulfilled, (state, action) => {
        console.log('Reducer: Fetch Budget Entries Fulfilled');
        console.log('Action Payload:', action.payload);
        state.incomeBudgetEntries= action.payload.budgetIncomeCategories.filter(entry => entry.month === state.selectedMonth && entry.year === state.selectedYear);
        state.expensesBudgetEntries= action.payload.budgetExpensesCategories.filter(entry => entry.month === state.selectedMonth && entry.year === state.selectedYear);
        console.log('state.incomeBudgetEntries', state.incomeBudgetEntries)
        console.log('state.expensesBudgetEntries', state.expensesBudgetEntries)
        }
      );
    },
  },
);

export const budgetItemActions = budgetItemSlice.actions;
export default budgetItemSlice.reducer;
export { fetchBudgetEntries };
