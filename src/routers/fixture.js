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
  { name: "images" },
  { name: "participantsImages" },
  { name: "document1", maxCount: 1 },
  { name: "document2", maxCount: 1 },
  { name: "document3", maxCount: 1 },
  { name: "document4", maxCount: 1 },
]);

router.post("/fixtures", cpUpload, async (req, res) => {
  const fixtureImages = req.files["images"];
  const document1 =
    req.files["document1"] && req.files["document1"][0].location;
  const document2 =
    req.files["document2"] && req.files["document2"][0].location;
  const document3 =
    req.files["document3"] && req.files["document3"][0].location;
  const document4 =
    req.files["document4"] && req.files["document4"][0].location;
  const participantsImages = req.files["participantsImages"];
  const participants = [];
  for (let index = 0; index < participantsImages.length; index++) {
    // const image = participantsImages[index].location;
    const image = participantsImages[index].location;
    participants.push({ image });
  }
  const images = [];
  for (let index = 0; index < fixtureImages.length; index++) {
    // const image = fixtureImages[index].location;
    const image = fixtureImages[index].location;
    images.push(image);
  }
  links = [
    { title: req.body.document1title, doc: document1 },
    { title: req.body.document2title, doc: document2 },
    { title: req.body.document3title, doc: document3 },
    { title: req.body.document4title, doc: document4 },
  ];
  const admins = [
    req.body.admin1,
    req.body.admin2,
    req.body.admin3,
    req.body.admin4,
  ];
  const rules = [
    req.body.rule1,
    req.body.rule2,
    req.body.rule3,
    req.body.rule4,
    req.body.rule5,
    req.body.rule6,
    req.body.rule7,
    req.body.rule8,
    req.body.rule9,
    req.body.rule10,
  ];
  const fixture = new Fixture({
    title: req.body.title,
    overview: req.body.overview,
    description: req.body.description, 
    images,
    time: req.body.time,
    participants,
    rules,
    admins,
    gameStart: req.body.startDate,
    gameEnd: req.body.roundGameEnd,
    finalGame: req.body.finalGame,
    links,
  });
  try {
    await fixture.save();
    await fixture.populate("owner").execPopulate();
    res.status(201).send(fixture);
  } catch (error) {
    res.status(400).send();
  }
});

//get fixtures e.g. /fixtures?limit=1&skip=1&sortBy=createdAt:desc
router.get("/fixtures", async (req, res) => {
  try {
    const fixtures = await Fixture.find({}).sort({ createdAt: -1 });
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
