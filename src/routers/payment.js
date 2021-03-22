const auth = require("../middlewares/auth");
const Payment = require("../models/payment");
const express = require("express");

const router = express.Router();

router.post("/payments/:productId", async (req, res) => {
  const product = req.params.productId;
  // const owner = req.user._id;
  const count = req.body.count;
  const owner = req.body.owner;
  const shippingFee = req.body.shippingFee;
  const amount = req.body.amount;
  const payment = new Payment({
    product,
    // owner,
    count,
    owner,
    shippingFee,
    amount,
  });

  try {
    await payment.save();
    // await payment.populate("product").execPopulate();
    // await payment.populate("owner").execPopulate();
    res.send(payment);
  } catch (error) {
    res.status(400).send();
  }
});

router.get("/payments", async (req, res) => {
  try {
    // await req.user.populate("payments").execPopulate();
    // for (let index = 0; index < req.user.payments.length; index++) {
    //   const payment = req.user.payments[index];
    //   await payment.populate("product").execPopulate();
    //   await payment.populate("owner").execPopulate();
    // }
    const payments = await Payment.find({});
    res.send(payments);
  } catch (error) {
    res.status(404).send();
  }
});

router.patch("/payments/:paymentID", auth, async (req, res) => {
  const paymentID = req.params.paymentID;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["count"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates." });
  }
  try {
    const payment = await payment.findOne({
      _id: paymentID,
      owner: req.user._id,
    });
    if (!payment) {
      res.status(404).send();
    }
    updates.forEach((update) => (payment[update] = req.body[update]));
    await payment.save();
    await payment.populate("product").execPopulate();
    await payment.populate("owner").execPopulate();
    res.send(payment);
  } catch (error) {
    res.status(400).send();
  }
});

router.delete("/payments/:paymentID", auth, async (req, res) => {
  const paymentID = req.params.paymentID;
  try {
    const payment = await payment.findOneAndDelete({
      _id: paymentID,
      owner: req.user._id,
    });
    if (!payment) {
      res.status(404).send();
    }
    res.send(payment);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
