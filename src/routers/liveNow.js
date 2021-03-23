const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const sharp = require("sharp");
const auth = require("../middlewares/auth");
const upload = require("../bucket-config/bucket");
const LiveNow = require("../models/livenow");

//create liveNow
router.post("/liveNows", async (req, res) => {
  const liveNow = new LiveNow({
    link: req.body.link,
  });
  try {
    await liveNow.save();
    res.status(201).send(liveNow);
  } catch (error) {
    res.status(400).send();
  }
});

//get liveNows e.g. /liveNows?limit=1&skip=1&sortBy=createdAt:desc
router.get("/liveNows", async (req, res) => {
  try {
    const liveNows = await LiveNow.find({}).sort({ createdAt: -1 });
    res.send(liveNows);
  } catch (error) {
    res.status(500).send();
  }
});

//get liveNow by id
router.get("/liveNows/:id", async (req, res) => {
  try {
    const liveNow = await LiveNow.findOne({
      _id: req.params.id,
    });
    res.send(liveNow);
  } catch (error) {
    res.status(404).send();
  }
});

//updatet liveNow by id
router.patch("/liveNows/:id", async (req, res) => {
  try {
    const liveNow = await LiveNow.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { link: req.body.link },
      { new: true }
    );
    if (!liveNow) {
      res.status(404).send();
    }

    await liveNow.save();
    res.send(liveNow);
  } catch (error) {
    res.status(400).send("Error uploading!!");
  }
});

//delete liveNow
router.delete("/liveNows/:id", async (req, res) => {
  try {
    const liveNow = await LiveNow.findByIdAndDelete(req.params.id);
    if (!liveNow) {
      res.status(404).send();
    }
    res.send(liveNow);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
