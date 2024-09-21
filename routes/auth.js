const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let user = new User(req.body);

    let newUser = await user.InsertUser(req.body);

    res.status(newUser.code).json(newUser);

  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = new User(req.body);

    const currUser = await user.LoginUser();

    res.status(currUser.code).json(currUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;