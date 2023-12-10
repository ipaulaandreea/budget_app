import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getCategories from '../components/SetBudget/getCategories'

const fetchBudgetCategories = createAsyncThunk(
  "budgetCategory/fetchBudgetCategories",
  async () => {
    try {
      let { incomeCategories, expensesCategories } = await getCategories();
      console.log(incomeCategories, expensesCategories)
      return { incomeCategories, expensesCategories };
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; 
    }
  }
);


const budgetCategorySlice = createSlice({
    name: "budgetCategory",
    initialState: {
      expensesCategories: [],
      incomeCategories: [],
      isAddingIncomeCategory: false,
      isAddingExpensesCategory: false,

    },
    reducers: {
      addNewCategory(state, action) {
        const newCategory = action.payload;
         
        
            if (newCategory.type === 'income') {
              state.incomeCategories = [...state.incomeCategories, newCategory];
            } else {
              state.expensesCategories = [...state.expensesCategories, newCategory];
            }
          
          
      },

      addIncomeCategory(state, action) {
        state.isAddingIncomeCategory = true;
        state.isAddingExpensesCategory = false;
        
       
      },

      addExpenseCategory(state, action) {
        state.isAddingExpensesCategory = true;
        state.isAddingIncomeCategory = false;
       
      },

      cancelAdding(state, action) {
        state.isAddingExpensesCategory = false;
        state.isAddingIncomeCategory = false;

      }

    },
    extraReducers: (builder) => {
      builder.addCase(fetchBudgetCategories.fulfilled, (state, action) => {
        state.incomeCategories = action.payload.incomeCategories;
        state.expensesCategories = action.payload.expensesCategories;
      })
    }
  });
  
  export const budgetCategoryActions = budgetCategorySlice.actions;
  export {fetchBudgetCategories} ;
 
  export default budgetCategorySlice.reducer;