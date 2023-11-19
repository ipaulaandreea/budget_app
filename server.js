const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/budget_app_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Category = require("./models/Category");

app.get("/api/getcategories", async (req, res) => {
  console.log("GET categories!!!!!!");
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

const Transaction = require("./models/Transaction");
app.get("/api/transactions", async (req, res) => {
  console.log("GET transactions!!!!!!");
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

const BudgetEntry = require("./models/BudgetEntry");
app.get("/api/budget", async (req, res) => {
  console.log("GET budget entries!!!!!!");
  try {
    const budgetEntries = await BudgetEntry.find();
    res.json(budgetEntries);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/api/addcategory", async (req, res) => {
  try {
    const { category_name, type } = req.body;
    const newCategory = new Category({ category_name, type });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/addtransaction", async (req, res) => {
  try {
    const { category_name, type, amount, description, month, day, year, amountDifference } = req.body;
    const newTransaction = new Transaction({
      category_name,
      type,
      amount,
      description,
      month, 
      day, 
      year
    });
    await newTransaction.save();
    await updateBudgetAmount(category_name, amount, month, year, amountDifference)

    res.status(201).json(newTransaction);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put('/api/update-budget-amount', async (req, res) => {
  const { category_name, amount, month, year, amountDifference } = req.body;
  console.log('im in server.js')
  try {
    await updateBudgetAmount(category_name, amount, month, year, amountDifference);
    res.status(200).json({ message: 'Amount updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


async function updateBudgetAmount(category_name, amount, month, year, amountDifference) {
  try {
    const budgetCategory = await BudgetEntry.findOne({ category_name, month, year });

    if (!budgetCategory) {
      console.error("Budget category not found");
      return;
    }
    let formerAmount = parseFloat(budgetCategory.amount_actual)
    // budgetCategory.amount_actual = parseFloat(budgetCategory.amount_actual);
    console.log("formerAmount:", formerAmount);
    console.log("amountDifference:", amountDifference);
    
    let updatedAmount = parseFloat(formerAmount) + parseFloat(amountDifference);
    console.log("updatedAmount:", updatedAmount);


    // budgetCategory.amount_actual += amount;

    console.log("Before update - Budget Category:", budgetCategory);

    await BudgetEntry.findOneAndUpdate(
      { category_name, month, year },
      { amount_actual: updatedAmount }
    );
    console.log("After update - Budget Category:", await BudgetEntry.findOne({ category_name, month, year }));


    console.log("Amount_actual updated successfully");
  } catch (error) {
    console.error(error);
  }
}

app.put("/api/updatetransaction/:id", async (req, res) => {
  try {
    const updatedData = req.body;
    const id = req.params.id;
    console.log("updatetransaction call");
    console.log("Received data:", updatedData, "for ID:", id);
    

    await Transaction.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({ success: true, message: "Data updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.delete("/api/deletetransaction/:id", async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findById(transactionId);
  const category_name = transaction.category_name;
  const amount = transaction.amount;
  const month = transaction.month;
  const year = transaction.year;

  try {
    await Transaction.findByIdAndDelete(transactionId);
    await deleteBudgetAmount(category_name, month, year, amount)
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/addbudgetentry", async (req, res) => {
  try {
    const data = req.body;
    const newBudgetEntry = new BudgetEntry({
      category_name: data.categoryData['category_name'],
      amount_expected: data.categoryData['amount_expected'],
      month: data.categoryData.month,
      year: data.categoryData.year,
      type: data.categoryData.type,
      amount_actual: data.categoryData['amount_actual'],
    });
    await newBudgetEntry.save();
    res.status(201).json(newBudgetEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function deleteBudgetAmount(category_name, month, year, amount) {
  try {
    const budgetCategory = await BudgetEntry.findOne({ category_name, month, year });

    if (!budgetCategory) {
      console.error("Budget category not found");
      return;
    }
    budgetCategory.amount_actual = parseFloat(budgetCategory.amount_actual);
    amount = parseFloat(amount);

    budgetCategory.amount_actual -= amount;


    await BudgetEntry.findOneAndUpdate(
      { category_name, month, year },
      { amount_actual: budgetCategory.amount_actual }
    );

    console.log("Amount_actual updated successfully");
  } catch (error) {
    console.error(error);
  }
}
