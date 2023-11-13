const mongoose = require("mongoose");

const budgetEntrySchema = new mongoose.Schema({
  amount_expected: Number,
  amount_actual: Number,
  category_name: String,
  month: Number,
  year: Number,
});

module.exports = mongoose.model("BudgetEntry", budgetEntrySchema);
