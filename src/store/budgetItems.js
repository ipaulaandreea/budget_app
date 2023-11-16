import { createSlice, createAsyncThunk, createAction, createReducer , current } from "@reduxjs/toolkit";
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
    incomeBudgetEntries: [],
    expensesBudgetEntries: [],

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
        state.expensesBudgetEntries[index].amount_actual -=
          transaction.amount;
      }
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
    })
  },
});

export const budgetItemActions = budgetItemSlice.actions;
export default budgetItemSlice.reducer;
export { fetchBudgetEntries };
