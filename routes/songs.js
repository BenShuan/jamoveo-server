const express = require("express");
const Song = require("../models/song");
const router = express.Router();



router.get("/ByQuery/:query", async (req, res) => {
  try {

    const param = req.params.query;
    const list =await Song.GetSongsByQuery(param)

    res.json(list);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {

    const param = req.params.id;
    const list =await Song.GetSongById(param)

    res.json(list);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
