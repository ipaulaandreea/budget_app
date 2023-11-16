const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: Number,
  category_name: String,
  day: Number,
  month: Number,
  year: Number,
  description: String,
  type: String
});

module.exports = mongoose.model("Transaction", transactionSchema);