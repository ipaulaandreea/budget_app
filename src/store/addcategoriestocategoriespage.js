import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getCategories from "./../components/SetBudget/getCategories";

const fetchCategories = createAsyncThunk(
  "budgetCategory/fetchCategories",
  async () => {
    try {
      let { incomeCategories, expensesCategories } = await getCategories();
      console.log(incomeCategories, expensesCategories)
      return { incomeCategories, expensesCategories };
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Rethrow the error to let Redux Toolkit handle it
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    expensesCategories: [],
    incomeCategories: [],
    isAddingCategory: false,
  },
  reducers: {
    
    addCategory(state, action) {
      state.isAddingCategory = true;
     
    },
    cancelAdding(state, action) {
      state.isAddingCategory = false;

    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.incomeCategories = action.payload.incomeCategories;
      state.expensesCategories = action.payload.expensesCategories;
    });
  },

});

export const categoryActions = categorySlice.actions;
export { fetchCategories };
export default categorySlice.reducer;
