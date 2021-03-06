const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const sharp = require("sharp");
const auth = require("../middlewares/auth");
const upload = require("../bucket-config/bucket");
const fixture = require("../models/fixture");
const Fixture = require("../models/fixture");
const slugify = require("slugify");

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
    slug: slugify(req.body.title),
    description: req.body.description,
    link: req.body.link,
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
router.get("/fixtures/:id", async (req, res) => {
  try {
    const fixture = await Fixture.findOne({
      _id: req.params.id,
    });
    res.send(fixture);
  } catch (error) {
    res.status(404).send();
  }
});

//get fixture by slug
router.get("/fixtures/:slug/by-slug", async (req, res) => {
  try {
    const fixture = await Fixture.findOne({
      slug: req.params.slug,
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

var singleImage = upload.single("image");
router.patch(
  "/fixtures/:id/add-photo",
  singleImage,
  async (req, res) => {
    const image = req.file.location;
    try {
      const fixture = await Fixture.findOne({
        _id: req.params.id,
      });
      if (!fixture) {
        res.status(404).send();
      }
      const existingImages = fixture.images;
      existingImages.push(image);
      fixture.images = existingImages;
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

var singleDoc = upload.single("doc");
router.patch(
  "/fixtures/:id/add-doc-link",
  singleDoc,
  async (req, res) => {
    const link = { doc: req.file.location, title: req.body.title };
    try {
      const fixture = await Fixture.findOne({
        _id: req.params.id,
      });
      if (!fixture) {
        res.status(404).send();
      }
      const existingLinks = fixture.links;
      existingLinks.push(link);
      fixture.links = existingLinks;
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

var participantImage = upload.single("image");
router.patch(
  "/fixtures/:id/add-participant",
  participantImage,
  async (req, res) => {
    const participant = { image: req.file.location };
    try {
      const fixture = await Fixture.findOne({
        _id: req.params.id,
      });
      if (!fixture) {
        res.status(404).send();
      }
      const existingparticipants = fixture.participants;
      existingparticipants.push(participant);
      fixture.participants = existingparticipants;
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

router.delete(
  "/fixtures/:id/:docId",
  async (req, res) => {
    try {
      const fixture = await Fixture.findOne({
        _id: req.params.id,
      });
      if (!fixture) {
        res.status(404).send();
      }
      const existingLinks = fixture.links;
      existingLinks.pop((link) => link._id === req.params.docId);
      // fixture.links = newLinks;
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

router.delete(
  "/fixtures/:id/:participantId/delete-participant",
  async (req, res) => {
    try {
      const fixture = await Fixture.findOne({
        _id: req.params.id,
      });
      if (!fixture) {
        res.status(404).send();
      }
      const existingparticipants = fixture.participants;
      existingparticipants.pop(
        (participant) => participant._id === req.params.participantId
      );
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

router.delete(
  "/fixtures/:id/delete-photo",
  async (req, res) => {
    const image = req.body.image;
    try {
      const fixture = await Fixture.findOne({
        _id: req.params.id,
      });
      if (!fixture) {
        res.status(404).send();
      }
      const existingImages = fixture.images;
      existingImages.pop(image);
      fixture.images = existingImages;
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
