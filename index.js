const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success !",
  });
});

//CODE REVISION REQUIRED!

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    // console.log("payment received", total);
    // res.send(total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      msg: "The total must be greater than 0",
    });
  }
});
const portNum = 7060;
app.listen(portNum, (err) => {
  if (err) throw err;
  console.log(
    `Amazon Server Running on PORT: ${portNum}, http://localhost:${portNum}`
  );
});
