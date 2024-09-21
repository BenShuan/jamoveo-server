const express = require("express");
const User = require("../models/user");
const router = express.Router();



router.get("/", async (req, res) => {
  try {
    const user = new User(req.body);

    const list =await user.GetUsers();

    res.json(list);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



module.exports = router;
