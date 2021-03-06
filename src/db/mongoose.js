const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/10n80", {
  useNewUrlParser: true,
  useCreateIndex: true,
});
