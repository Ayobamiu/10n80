const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const sharp = require("sharp");
const auth = require("../middlewares/auth");
const upload = require("../bucket-config/bucket");
const fixture = require("../models/fixture");
const Fixture = require("../models/fixture");

//create fixture
var cpUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "participantsImages" },
]);

router.post("/fixtures", cpUpload, async (req, res) => {
  const image = req.files["image"][0].location;
  const participantsImages = req.files["participantsImages"];
  if (participantsImages.length !== req.body.participantsName.length) {
    return res.status(400).send({
      error: "400 Bad request",
      message: "participantsImages and name should be same lenght",
    });
  }
  const participants = [];
  for (let index = 0; index < participantsImages.length; index++) {
    const image = participantsImages[index].location;
    const name = req.body.participantsName[index];
    participants.push({ image, name });
  }
  const fixture = new Fixture({
    title: req.body.title,
    image,
    time: req.body.time,
    participants,
    rules: req.body.rules,
  });
  try {
    await fixture.save();
    // await fixture.populate("owner").execPopulate();
    res.status(201).send(fixture);
  } catch (error) {
    res.status(400).send();
  }
});

//get fixtures e.g. /fixtures?limit=1&skip=1&sortBy=createdAt:desc
router.get("/fixtures", async (req, res) => {
  try {
    const fixtures = await Fixture.find({});
    res.send(fixtures);
  } catch (error) {
    res.status(500).send();
  }
});

//get fixture by id
router.get("/fixtures/:fixtureId", async (req, res) => {
  try {
    const fixture = await Fixture.findOne({
      _id: req.params.fixtureId,
    });
    res.send(fixture);
  } catch (error) {
    res.status(404).send();
  }
});

//updatet fixture by id
router.patch(
  "/fixtures/:id",
  async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "title",
      "teamAName",
      "teamAImage",
      "teamBName",
      "teamBImage",
      "time",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid Updates!" });
    }
    try {
      const fixture = await Fixture.findOne({
        _id: req.params.id,
      });
      if (!fixture) {
        res.status(404).send();
      }
      updates.forEach((update) => {
        fixture[update] = req.body[update];
      });

      await fixture.save();
      res.send(fixture);
    } catch (error) {
      res.status(400).send("Error uploading!!");
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//delete fixture
router.delete("/fixtures/:id", async (req, res) => {
  try {
    const fixture = await Fixture.findOneAndDelete({
      _id: req.params.id,
    });
    if (!fixture) {
      res.status(404).send();
    }
    res.send(fixture);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
