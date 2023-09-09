const {
  addTransaction,
  getAllTransaction,
} = require("../controllers/transactionController");
const transactionModel = require("../models/transactionModel");
const router = require("express").Router();

router.post("/add-transaction", addTransaction);

router.post("/get-transaction", getAllTransaction);

module.exports = router;
