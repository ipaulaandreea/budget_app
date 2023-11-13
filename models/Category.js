const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category_name: String,
  type: String
});

module.exports = mongoose.model("Category", categorySchema);