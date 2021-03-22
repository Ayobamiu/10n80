const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    owner: {
      type: Object,
    },
    count: {
      type: Number,
      default: 1,
    },
    amount: {
      type: Number,
    },
    shippingFee: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
