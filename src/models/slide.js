const mongoose = require("mongoose");

const slideSchema = mongoose.Schema(
  {
    image: {
      type: String,
    },
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fixture",
    },
  },
  { timestamps: true }
);
const Slide = mongoose.model("Slide", slideSchema);

module.exports = Slide;
