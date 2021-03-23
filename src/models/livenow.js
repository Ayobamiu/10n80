const mongoose = require("mongoose");

const liveNowSchema = mongoose.Schema(
  {
    link: {
      type: String,
    },
  },
  { timestamps: true }
);
const LiveNow = mongoose.model("LiveNow", liveNowSchema);

module.exports = LiveNow;
