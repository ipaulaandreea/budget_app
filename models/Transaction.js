const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: Number,
  category_name: String,
  month: String,
  year: String,
  description: String,
  type: String
});

module.exports = mongoose.model("Transaction", transactionSchema);