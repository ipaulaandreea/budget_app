import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: {
      isAddingCategory: false,
    },
    reducers: {
      
      addCategory(state, action) {
        state.isAddingCategory = true;
       
      },

    },
  });
  
  export const categoryActions = categorySlice.actions;
  export default categorySlice.reducer;