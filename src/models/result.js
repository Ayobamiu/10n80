const mongoose = require("mongoose");

const resultSchema = mongoose.Schema(
  {
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
