const cors = require("cors");
const express = require("express");
const productRouter = require("./routers/product");
const userRouter = require("./routers/user");
const cartRouter = require("./routers/cart");
const orderRouter = require("./routers/order");
const highlightRouter = require("./routers/highlight");
const fixtureRouter = require("./routers/fixture");
const paymentRouter = require("./routers/payment");
const liveNowRouter = require("./routers/liveNow");
const resultRouter = require("./routers/result");
const slideRouter = require("./routers/slide");
require("./db/mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.use(slideRouter);
app.use(resultRouter);
app.use(liveNowRouter);
app.use(paymentRouter);
app.use(fixtureRouter);
app.use(highlightRouter);
app.use(productRouter);
app.use(userRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use("/images", express.static("images"));

app.listen(process.env.PORT, () => {
  console.log("SERVER UP AT PORT " + process.env.PORT);
});
