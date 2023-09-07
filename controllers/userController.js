const userModel = require("../models/userModel");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(400).send("user not found");
    }
    res.status(200).json({
      success: true,
      message: "user login successful",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "user createed successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
    error;
  }
};

module.exports = { loginController, registerController };
