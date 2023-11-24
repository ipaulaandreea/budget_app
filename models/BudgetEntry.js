const mongoose = require("mongoose");

const budgetEntrySchema = new mongoose.Schema({
  amount_expected: Number,
  amount_actual: Number,
  category_name: String,
  type: String,
  month: String,
  year: String
});

module.exports = mongoose.model("BudgetEntry", budgetEntrySchema);
