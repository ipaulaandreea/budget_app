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

// const increment = createAction('increment')
// const decrement = createAction('decrement')

// const amountReducer = createReducer(
//   {
//     counter: 0,
//     sumOfAmountPayloads: 0,
//     unhandledActions: 0,
//   },
//   (builder) => {
//     builder
//       .addCase(increment, (state, action) => {
//         // action is inferred correctly here
//         state.counter += action.payload
//       })
//       // You can chain calls, or have separate `builder.addCase()` lines each time
//       .addCase(decrement, (state, action) => {
//         state.counter -= action.payload
//       })
//       .addDefaultCase((state, action) => {})
//   }
// )

const budgetItemSlice = createSlice({
  name: "budgetItem",
  initialState: {
    selectedBudgetItem: null,
    incomeBudgetEntries: null,
    expensesBudgetEntries: null,
    selectedMonth: null,
    selectedYear: null,
  },

  reducers: {
    // addTransaction(state, action) {
    //   const transaction = action.payload;

    //   if (transaction.type === "income") {
    //     const index = state.incomeBudgetEntries.findIndex(
    //       (entry) => entry.category_name === transaction.category_name
    //     );

    //     if (index !== -1) {
    //       state.incomeBudgetEntries[index].amount_actual +=
    //         transaction.amount;
    //     }
    //   } else {
    //     const index = state.expensesBudgetEntries.findIndex(
    //       (entry) => entry.category_name === transaction.category_name
    //     );

    //     if (index !== -1) {
    //       state.expensesBudgetEntries[index].amount_actual +=
    //         transaction.amount;
    //     }
    //   }
    // },

    deleteTransaction(state, action) {
      const transaction = action.payload;
      const index = state.expensesBudgetEntries.findIndex(
        (entry) => entry.category_name === transaction.category_name
      );

      if (index !== -1) {
        state.expensesBudgetEntries[index].amount_actual -= transaction.amount;
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
