const mongoose = require("mongoose");

const highlightSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);
const Highlight = mongoose.model("Highlight", highlightSchema);

module.exports = Highlight;
