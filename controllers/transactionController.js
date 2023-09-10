const transactionModel = require("../models/transactionModel");
const getAllTransaction = async (req, res) => {
  try {
    const transactions = await transactionModel.find({ userid: req.body.user });
    res.status(200).send({
      success: true,
      message: "transaction listed ",
      transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send({
      success: true,
      message: "transaction created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { getAllTransaction, addTransaction };
