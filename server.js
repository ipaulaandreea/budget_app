const authenticate = require("./middleware");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/budget_app_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Category = require("./models/Category");

app.get("/api/getcategories", authenticate, async (req, res) => {
  console.log("GET categories!!!!!!");
  const user = req.query.user;
  try {
    const categories = await Category.find({user});
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

const Transaction = require("./models/Transaction");
app.get("/api/transactions", authenticate, async (req, res) => {
  const user = req.query.user;
  console.log("GET transactions!!!!!!");
  try {
    const transactions = await Transaction.find({user});
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

const BudgetEntry = require("./models/BudgetEntry");
app.get("/api/budget", authenticate, async (req, res) => {
 
  console.log("GET budget entries!!!!!!");
  try {
    const { user, month, year } = req.body;

    const budgetEntries = await BudgetEntry.find(user, month, year);
    res.json(budgetEntries);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.get("/api/availablecategories", authenticate, async (req, res) => {
  console.log("GET availablecategories !!!!!!");
  try {
    const { user, month, year } = req.query; 

    const budgetEntries = await BudgetEntry.find({ user, month, year }); 
    res.json(budgetEntries);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});




app.post("/api/addcategory", authenticate, async (req, res) => {
  try {
    const { category_name, type, user } = req.body;
    const newCategory = new Category({ category_name, type, user });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/addtransaction", authenticate, async (req, res) => {
  try {
    const {
      user,
      category_name,
      type,
      amount,
      description,
      month,
      year,
      amountDifference,
    } = req.body;
    const newTransaction = new Transaction({
      user,
      category_name,
      type,
      amount,
      description,
      month,
      year,
    });
    await newTransaction.save();
    await updateBudgetAmount(
      user,
      category_name,
      amount,
      month,
      year,
      amountDifference
    );

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/update-budget-amount", authenticate, async (req, res) => {
  const { user,category_name, amount, month, year, amountDifference } = req.body;
  console.log("im in server.js");
  try {
    await updateBudgetAmount(
      user,
      category_name,
      amount,
      month,
      year,
      amountDifference
    );
    res.status(200).json({ message: "Amount updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function updateBudgetAmount(
  user,
  category_name,
  amount,
  month,
  year,
  amountDifference
) {
  try {
    const budgetCategory = await BudgetEntry.findOne({
      user,
      category_name,
      month,
      year,
    });

    if (!budgetCategory) {
      console.error("Budget category not found");
      return;
    }
    let formerAmount = parseFloat(budgetCategory.amount_actual);
    console.log("formerAmount:", formerAmount);
    console.log("amountDifference:", amountDifference);

    let updatedAmount = parseFloat(formerAmount) + parseFloat(amountDifference);
    console.log("updatedAmount:", updatedAmount);

    console.log("Before update - Budget Category:", budgetCategory);

    await BudgetEntry.findOneAndUpdate(
      { user,category_name, month, year },
      { amount_actual: updatedAmount }
    );
    console.log(
      "After update - Budget Category:",
      await BudgetEntry.findOne({ user,category_name, month, year })
    );

    console.log("Amount_actual updated successfully");
  } catch (error) {
    console.error(error);
  }
}

app.put("/api/updatetransaction/:id", authenticate, async (req, res) => {
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

app.delete("/api/deletetransaction/:id", authenticate, async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findById(transactionId);
  const category_name = transaction.category_name;
  const amount = transaction.amount;
  const month = transaction.month;
  const year = transaction.year;

  try {
    await Transaction.findByIdAndDelete(transactionId);
    await deleteBudgetAmount(category_name, month, year, amount);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/addbudgetentry", authenticate, async (req, res) => {
  try {
    const data = req.body;
    const newBudgetEntry = new BudgetEntry({
      user: data.categoryData["user"],
      category_name: data.categoryData["category_name"],
      amount_expected: data.categoryData["amount_expected"],
      month: data.categoryData.month,
      year: data.categoryData.year,
      type: data.categoryData.type,
      amount_actual: data.categoryData["amount_actual"],
    });
    await newBudgetEntry.save();
    res.status(201).json(newBudgetEntry);
    console.log("added filtered budget entry");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function deleteBudgetAmount(user,category_name, month, year, amount) {
  try {
    const budgetCategory = await BudgetEntry.findOne({
      user,
      category_name,
      month,
      year,
    });

    if (!budgetCategory) {
      console.error("Budget category not found");
      return;
    }
    budgetCategory.amount_actual = parseFloat(budgetCategory.amount_actual);
    amount = parseFloat(amount);

    budgetCategory.amount_actual -= amount;

    await BudgetEntry.findOneAndUpdate(
      { user,category_name, month, year },
      { amount_actual: budgetCategory.amount_actual }
    );

    console.log("Amount_actual updated successfully");
  } catch (error) {
    console.error(error);
  }
}

app.delete("/api/deletecategory/:id", authenticate, async (req, res) => {
  const categoryId = req.params.id;
  try {
    await Category.findByIdAndDelete(categoryId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const User = require("./models/User");

app.post("/api/signup", async (req, res) => {
  try {
    const username = req.body.userData.username;
    const password = req.body.userData.password;
    const user = { username: username, password: password };
    const newUser = new User({
      username: username,
      password: password,
    });
    await newUser.save();
    res.json({ status: true, message: "Registered successfully.", data: user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ username: username, password: password });

    if (user === null)
    return res
        .status(401)
        .json({ status: false, message: "username or password is not valid." });
    console.log("user", user);
    const token = jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1000ms",
    });
    const refreshToken = jwt.sign(
      { ...user },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    console.log("token", token);
    console.log("refresh token", refreshToken);
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 1000,
        domain: "localhost",
      })
      .send({ user, token });
  } catch (error) {
    console.log("error", error.message);
    return res
      .status(401)
      .json({ status: true, message: "login fail", data: error });
  }
});
