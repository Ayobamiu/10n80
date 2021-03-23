const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const sharp = require("sharp");
const auth = require("../middlewares/auth");
const upload = require("../bucket-config/bucket");
const Result = require("../models/result");

//create result
var cpUpload = upload.single("image");
router.post("/results", cpUpload, async (req, res) => {
  const result = new Result({
    image: req.file.location,
  });
  try {
    await result.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send();
  }
});

//get results e.g. /results?limit=1&skip=1&sortBy=createdAt:desc
router.get("/results", async (req, res) => {
  try {
    const results = await Result.find({}).sort({ createdAt: -1 });
    res.send(results);
  } catch (error) {
    res.status(500).send();
  }
});

//get result by id
router.get("/results/:id", async (req, res) => {
  try {
    const result = await Result.findOne({
      _id: req.params.id,
    });
    res.send(result);
  } catch (error) {
    res.status(404).send();
  }
});

//updatet result by id

router.patch("/results/:id", cpUpload, async (req, res) => {
  try {
    const result = await Result.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { image: req.file.location },
      { new: true }
    );
    if (!result) {
      res.status(404).send();
    }

    await result.save();
    res.send(result);
  } catch (error) {
    res.status(400).send("Error uploading!!");
  }
});

//delete result
router.delete("/results/:id", async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).send();
    }
    res.send(result);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
