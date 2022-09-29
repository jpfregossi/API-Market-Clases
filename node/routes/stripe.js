const router = require("express").Router();
// no pude hacer andar el env 
const KEY = "sk_test_51LkuD9BezGGmE7E1Yqr9X7cLS5tRKSfSbszQ1dhy8Zk5of6udbpbXQxLgAEvGoHhrJ75Lm0ILyHuhAUXaLH2WS5o00K4Y9Vu4f"
const stripe = require("stripe")(KEY);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
        console.log("exito");
      }
    }
  );
});

module.exports = router;