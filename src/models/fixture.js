const mongoose = require("mongoose");

const fixtureSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },

    image: {
      type: String,
    },

    participants: [
      {
        name: {
          type: String,
        },
        image: {
          type: String,
        },
      },
    ],
    rules: {
      type: String,
    },
    time: {
      type: Date,
    },
  },
  { timestamps: true }
);
const Fixture = mongoose.model("Fixture", fixtureSchema);

module.exports = Fixture;
