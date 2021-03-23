const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const sharp = require("sharp");
const auth = require("../middlewares/auth");
const upload = require("../bucket-config/bucket");
const Highlight = require("../models/higlight");

//create highlight
router.post("/highlights", async (req, res) => {
  const higlight = new Highlight({
    title: req.body.title,
    link: req.body.link,
  });
  try {
    await higlight.save();
    res.status(201).send(higlight);
  } catch (error) {
    res.status(400).send();
  }
});

//get highlights e.g. /highlights?limit=1&skip=1&sortBy=createdAt:desc
router.get("/highlights", async (req, res) => {
  try {
    const highlights = await Highlight.find({}).sort({ createdAt: -1 });
    res.send(highlights);
  } catch (error) {
    res.status(500).send();
  }
});

//get highlight by id
router.get("/highlights/:productId", async (req, res) => {
  try {
    const highlight = await Highlight.findOne({
      _id: req.params.productId,
    });
    res.send(highlight);
  } catch (error) {
    res.status(404).send();
  }
});

//updatet highlight by id
router.patch(
  "/highlights/:id",
  async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "link"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid Updates!" });
    }
    try {
      const highlight = await Highlight.findOne({
        _id: req.params.id,
      });
      if (!highlight) {
        res.status(404).send();
      }
      updates.forEach((update) => {
        highlight[update] = req.body[update];
      });

      await highlight.save();
      res.send(highlight);
    } catch (error) {
      res.status(400).send("Error uploading!!");
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//delete highlight
router.delete("/highlights/:id", async (req, res) => {
  try {
    const highlight = await Highlight.findByIdAndDelete(req.params.id);
    if (!highlight) {
      res.status(404).send();
    }
    res.send(highlight);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
