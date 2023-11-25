import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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
// const addNewCategory = createAction('budgetCategory/addNewCategory');

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

    },

    addNewCategory(state, action) {
      const newCategory = action.payload;
      if (newCategory.type === 'income') {
        state.incomeCategories = [...state.incomeCategories, newCategory];
      } else {
        state.expensesCategories = [...state.expensesCategories, newCategory];
      }
      state.isAddingCategory = false; // Assuming you want to reset the flag after adding
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.incomeCategories = action.payload.incomeCategories;
      state.expensesCategories = action.payload.expensesCategories;

      // const newCategory = action.payload;
      //   if (newCategory.type === 'income') {
      //     state.incomeCategories = [...state.incomeCategories, newCategory];
      //   } else {
      //     state.expensesCategories = [...state.expensesCategories, newCategory];
      //   }

    })
    // .addCase(categorySlice.addNewCategory, (state, action) => {
    //   const newCategory = action.payload;
    //   if (newCategory.type === 'income') {
    //     state.incomeCategories = [...state.incomeCategories, newCategory];
    //   } else {
    //     state.expensesCategories = [...state.expensesCategories, newCategory];
    //   }
    // });
  },

});

export const categoryActions = categorySlice.actions;
export { fetchCategories};
// export {addNewCategory}
export default categorySlice.reducer;
