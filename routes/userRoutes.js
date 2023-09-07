const {
  loginController,
  registerController,
} = require("../controllers/userController");
const userModel = require("../models/userModel");
const router = require("express").Router();

router.post("/login", loginController);

router.post("/register", registerController);

module.exports = router;
