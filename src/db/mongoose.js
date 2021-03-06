const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://taskapp:tpt4nYro75w8Myjh@cluster0.bpapr.mongodb.net/app10n80?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);
