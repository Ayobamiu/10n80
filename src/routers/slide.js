const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const sharp = require("sharp");
const auth = require("../middlewares/auth");
const upload = require("../bucket-config/bucket");
const slide = require("../models/slide");
const Slide = require("../models/slide");

//create slide
var cpUpload = upload.single("image");
router.post("/slides", cpUpload, async (req, res) => {
  const slide = new Slide({
    image: req.file.location,
    tournament: req.body.tournament,
  });
  try {
    await slide.save();
    res.status(201).send(slide);
  } catch (error) {
    res.status(400).send();
  }
});

//get slides e.g. /slides?limit=1&skip=1&sortBy=createdAt:desc
router.get("/slides", async (req, res) => {
  try {
    const slides = await Slide.find({})
      .sort({ createdAt: -1 })
      .populate({ path: "tournament", select: "title" });
    res.send(slides);
  } catch (error) {
    res.status(500).send();
  }
});

//get slide by id
router.get("/slides/:id", async (req, res) => {
  try {
    const slide = await Slide.findOne({
      _id: req.params.id,
    });
    res.send(slide);
  } catch (error) {
    res.status(404).send();
  }
});

//updatet slide by id

router.patch("/slides/:id", cpUpload, async (req, res) => {
  try {
    const update = {};
    if (req.file) {
      update.image = req.file.location;
    }
    if (req.body.tournament) {
      update.tournament = req.body.tournament;
    }
    const slide = await Slide.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      update,
      { new: true }
    );
    if (!slide) {
      res.status(404).send();
    }

    await slide.save();
    res.send(slide);
  } catch (error) {
    res.status(400).send("Error uploading!!");
  }
});

//delete slide
router.delete("/slides/:id", async (req, res) => {
  try {
    const slide = await Slide.findByIdAndDelete(req.params.id);
    if (!slide) {
      res.status(404).send();
    }
    res.send(slide);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
