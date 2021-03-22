const mongoose = require("mongoose");

const fixtureSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    images: {
      type: Array,
    },
    admins: {
      type: Array,
    },
    participants: [
      {
        image: {
          type: String,
        },
      },
    ],
    links: [
      {
        title: {
          type: String,
        },
        doc: {
          type: String,
        },
      },
    ],
    rules: {
      type: Array,
    },
    gameStart: {
      type: String,
    },
    gameEnd: {
      type: String,
    },
    finalGame: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  { timestamps: true }
);
const Fixture = mongoose.model("Fixture", fixtureSchema);

module.exports = Fixture;
