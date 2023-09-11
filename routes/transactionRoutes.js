const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const router = require("express").Router();

router.post("/add-transaction", addTransaction);

router.post("/get-transaction", getAllTransaction);

router.post("/edit-transaction", editTransaction); //idk why its post and not put
router.post("/delete-transaction", deleteTransaction);
module.exports = router;
